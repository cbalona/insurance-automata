use std::collections::HashSet;

use crate::item::ItemName;
use crate::material::MaterialName;
use crate::object::ObjectName;
use crate::utils::{AMBIENT_TEMP, GRID_HEIGHT, GRID_WIDTH, HEAT_TRANSFER_RATE, MAX_TEMP};
use crate::{defence::DefenceParams, material::MaterialParams};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Cell {
    pub x: i32,
    pub y: i32,
    pub object: ObjectName,
    pub material: MaterialName,
    pub temperature: f64,
    pub initial_fuel: f64,
    pub fuel: f64,
    pub is_burning: bool,
    pub proportion_burned: f64,
    pub value: f64,
    pub item: Option<ItemName>,
    pub defence: Option<DefenceParams>,
}

fn fuel_consumption(fuel_consumption_rate: f64, temperature: f64) -> f64 {
    if fuel_consumption_rate <= 0.0 {
        return 0.0;
    }
    fuel_consumption_rate * temperature
}

fn heat_production(fuel_consumed: f64, heat_value: f64, specific_heat: f64) -> f64 {
    if fuel_consumed <= 0.0 {
        return 0.0;
    }
    (fuel_consumed * heat_value) / specific_heat
}

fn calculate_new_temp(current_temp: f64, delta_temp: f64, heat_resistance: f64) -> f64 {
    let proportion_to_max: f64 = current_temp / MAX_TEMP;
    let adjusted_delta_temp: f64 = delta_temp * (1.0 - proportion_to_max);
    let temperature_change: f64 = adjusted_delta_temp * (1.0 - heat_resistance);
    let new_temp: f64 = current_temp + temperature_change;

    match new_temp {
        _ if new_temp > MAX_TEMP => MAX_TEMP,
        _ => new_temp,
    }
}

impl Cell {
    pub fn burn(&mut self) {
        let material_params: MaterialParams = self.material.get_params();
        let fuel_consumption_rate: f64 = material_params.fuel_consumption_rate;
        let heat_value: f64 = material_params.heat_value;
        let specific_heat: f64 = material_params.specific_heat;
        let heat_resistance: f64 = material_params.heat_resistance;

        let fuel_consumed: f64 = fuel_consumption(fuel_consumption_rate, self.temperature).min(self.fuel);
        let fuel: f64 = self.fuel - fuel_consumed;
        let heat_produced: f64 = heat_production(fuel_consumed, heat_value, specific_heat);

        self.fuel = fuel;
        self.temperature = calculate_new_temp(self.temperature, heat_produced, heat_resistance);
        self.proportion_burned += fuel_consumed / self.initial_fuel;
    }

    pub fn extinguish(&mut self) {
        if !self.is_burning {
            return;
        }
        self.is_burning = false;
        let combustion_point = self.material.get_params().combustion_point;
        self.temperature = self.temperature.min(combustion_point) * 0.95;
    }

    pub fn cool(&mut self) {
        let material_params: MaterialParams = self.material.get_params();

        self.extinguish();
        let temperature = self.temperature * (1.0 - material_params.heat_decrease_rate);
        self.temperature = if temperature < AMBIENT_TEMP {
            AMBIENT_TEMP
        } else {
            temperature
        };
    }

    pub fn ignite(&mut self) {
        if self.fuel <= 0.0 {
            return;
        }
        let combustion_point = self.material.get_params().combustion_point;
        self.temperature = self.temperature.max(combustion_point);
        self.is_burning = true;
    }

    pub fn self_interaction(&mut self) -> &mut Self {
        let material_params: MaterialParams = self.material.get_params();
        if self.fuel <= 0.0 {
            self.cool();
        }

        if (self.temperature >= material_params.combustion_point) && (self.is_burning == false) {
            self.ignite();
        }

        if self.is_burning && self.fuel > 0.0 {
            self.burn();
        }

        return self;
    }

    pub fn cell_neighbor_interaction(&mut self, neighbor: &Cell) {
        if self.is_burning {
            return;
        }

        let material_params: MaterialParams = self.material.get_params();
        let heat_resistance: f64 = material_params.heat_resistance;

        let temp_diff = neighbor.temperature - self.temperature;

        if temp_diff > 0.0 {
            let heat_transfer = HEAT_TRANSFER_RATE * temp_diff * 0.5; // (distance ** -2)
            self.temperature = calculate_new_temp(self.temperature, heat_transfer, heat_resistance);
        }
    }

    pub fn are_cells_equal(&self, other: &Cell) -> bool {
        (self.fuel - other.fuel).abs() < f64::EPSILON
            && (self.temperature - other.temperature).abs() < f64::EPSILON
            && self.is_burning == other.is_burning
    }
}

pub fn get_cell_neighbors(x: &i32, y: &i32, radius: i32, include_self: bool) -> HashSet<GridLoc> {
    let mut neighbors: HashSet<GridLoc> = HashSet::new();

    for i in -radius..=radius {
        for j in -radius..=radius {
            if i == 0 && j == 0 {
                continue;
            }

            let x = x + i;
            let y = y + j;

            if x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT {
                continue;
            }

            neighbors.insert(GridLoc { x, y });
        }
    }

    if include_self {
        neighbors.insert(GridLoc { x: *x, y: *y });
    }
    neighbors
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Grid {
    pub cells: Vec<Vec<Cell>>,
}

impl Grid {
    pub fn from_json(json_grid: JsValue) -> Self {
        Self {
            cells: serde_wasm_bindgen::from_value(json_grid).unwrap(),
        }
    }

    pub fn get_cell(&self, x: i32, y: i32) -> &Cell {
        &self.cells[y as usize][x as usize]
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AlteredLocs {
    pub cells: Vec<GridLoc>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq, Hash, Copy)]
pub struct GridLoc {
    pub x: i32,
    pub y: i32,
}

impl AlteredLocs {
    pub fn from_json(string_coords: Vec<String>) -> Self {
        let cells = string_coords
            .into_iter()
            .map(|string_coord: String| {
                let coords: Vec<&str> = string_coord.split(",").collect();
                let x: i32 = coords[0].parse::<i32>().unwrap();
                let y: i32 = coords[1].parse::<i32>().unwrap();
                GridLoc { x, y }
            })
            .collect();

        AlteredLocs { cells }
    }
}
