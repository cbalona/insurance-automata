mod cell;
mod defence;
mod item;
mod material;
mod object;
mod utils;

use std::collections::HashSet;

use cell::{get_cell_neighbors, AlteredLocs, Cell, Grid};
use object::ObjectName;
use rand::rngs::ThreadRng;
use rand::seq::SliceRandom;
use rand::Rng;
use serde::{Deserialize, Serialize};
use utils::{log, CONTENTS_VALUE, MAX_STEPS, MIN_STEPS, N_COST_CHECK_STEPS, ROOF_VALUE};
use utils::{GRID_HEIGHT, GRID_WIDTH};

use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct IgnitionPoint {
    x: i32,
    y: i32,
    cause: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct IgnitionSource {
    ignition_point: IgnitionPoint,
    probability: f64,
}

impl IgnitionPoint {
    pub fn from_json(json_fire_source: JsValue) -> Self {
        serde_wasm_bindgen::from_value(json_fire_source).unwrap()
    }

    pub fn to_json(&self) -> JsValue {
        serde_wasm_bindgen::to_value(self).unwrap()
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SimulationResult {
    grid_steps: Vec<Grid>,
    altered_loc_steps: Vec<AlteredLocs>,
    cost: Vec<f64>,
}

impl SimulationResult {
    pub fn to_json(&self) -> JsValue {
        serde_wasm_bindgen::to_value(self).unwrap()
    }
}

#[wasm_bindgen]
pub fn get_fire_source(json_grid: JsValue, json_altered_locs: JsValue) -> JsValue {
    utils::set_panic_hook();
    let grid: Grid = Grid::from_json(json_grid);
    let altered_locs: AlteredLocs =
        AlteredLocs::from_json(serde_wasm_bindgen::from_value(json_altered_locs).unwrap());

    let mut ignition: bool = false;
    let mut ignition_sources: Vec<IgnitionSource> = Vec::new();

    // Find a design ignition source
    for altered_loc in altered_locs.cells {
        let cell: &Cell = grid.get_cell(altered_loc.x, altered_loc.y);
        ignition = ignition || cell.is_burning;

        if let Some(item_name) = cell.item {
            ignition_sources.push(IgnitionSource {
                ignition_point: IgnitionPoint {
                    x: altered_loc.x,
                    y: altered_loc.y,
                    cause: item_name.to_string(),
                },
                probability: item_name.fire_probability(),
            });
        }

        if ignition {
            ignition_sources = Vec::new();
            ignition_sources.push(IgnitionSource {
                ignition_point: IgnitionPoint {
                    x: altered_loc.x,
                    y: altered_loc.y,
                    cause: "Design Ignition".to_string(),
                },
                probability: 1.0,
            });
            break;
        }
    }

    let ignition_point: IgnitionPoint = randomise_ignition_point(ignition_sources);
    ignition_point.to_json()
}

fn randomise_ignition_point(mut ignition_sources: Vec<IgnitionSource>) -> IgnitionPoint {
    // first add random chance of lightning strike
    let mut rng: ThreadRng = rand::thread_rng();
    let lx: i32 = rng.gen_range(0..GRID_WIDTH);
    let ly: i32 = rng.gen_range(0..GRID_HEIGHT);
    ignition_sources.push(IgnitionSource {
        ignition_point: IgnitionPoint {
            x: lx,
            y: ly,
            cause: "Lightning".to_string(),
        },
        probability: 0.01,
    });

    // Shuffle the ignition sources
    ignition_sources.shuffle(&mut rng);

    // now loop through until one of the fire sources ignites
    loop {
        for ignition_source in &ignition_sources {
            let mut rng: ThreadRng = rand::thread_rng();
            let random_number: f64 = rng.gen();
            if random_number < ignition_source.probability {
                return ignition_source.ignition_point.clone();
            }
        }
    }
}

#[wasm_bindgen]
pub fn simulate(json_grid: JsValue, json_altered_locs: JsValue) -> JsValue {
    log("Starting simulation");
    utils::set_panic_hook();
    let grid: Grid = Grid::from_json(json_grid);
    let altered_locs: AlteredLocs =
        AlteredLocs::from_json(serde_wasm_bindgen::from_value(json_altered_locs).unwrap());

    let mut grid_steps: Vec<Grid> = Vec::new();
    let mut altered_loc_steps: Vec<AlteredLocs> = Vec::new();

    let mut cost: Vec<f64> = Vec::new();
    let mut steps: i32 = 0;

    grid_steps.push(grid.clone());
    altered_loc_steps.push(altered_locs.clone());

    loop {
        if steps >= MAX_STEPS {
            break;
        }

        let (new_grid, new_altered_locs, new_cost) = simulate_step(
            grid_steps[steps as usize].clone(),
            altered_loc_steps[steps as usize].clone(),
        );

        grid_steps.push(new_grid);
        altered_loc_steps.push(new_altered_locs);
        cost.push(new_cost);

        steps += 1;

        // check if cost hasn't changed in the last n steps
        // if it hasn't, then the simulation has converged
        if steps > MIN_STEPS {
            let mut converged: bool = true;
            // log last 10 cost values
            let mut _total_cost: f64 = 0.0;
            for i in 0..N_COST_CHECK_STEPS {
                _total_cost += cost[cost.len() - i - 1];
                if (cost[cost.len() - i - 2] - cost[cost.len() - i - 1]).abs() > 0.1 {
                    converged = false;
                    break;
                }
            }
            // log(&format!(
            //     "Step: {}, Cost: {}, Converged: {}",
            //     steps, _total_cost, converged
            // ));

            if converged {
                break;
            }
        }
    }
    log("Simulation complete");

    let simulation_result = SimulationResult {
        grid_steps,
        altered_loc_steps,
        cost,
    };

    simulation_result.to_json()
}

fn calculate_cost(cell: &Cell) -> f64 {
    match cell.object {
        ObjectName::Earth => {
            return 0.0;
        }
        _ => {
            return (cell.value + CONTENTS_VALUE + ROOF_VALUE) * cell.proportion_burned;
        }
    }
}

fn simulate_step(grid: Grid, altered_locs: AlteredLocs) -> (Grid, AlteredLocs, f64) {
    let mut new_grid: Grid = grid.clone();
    let mut new_altered_locs: AlteredLocs = altered_locs.clone();
    let mut new_cost: f64 = 0.0;

    for altered_loc in new_altered_locs.clone().cells {
        let cell: Cell = new_grid.get_cell(altered_loc.x, altered_loc.y).clone();
        let mut new_cell: Cell = cell.clone();
        new_cell.self_interaction();

        // impact of neighbors on this cell
        let neighbours: HashSet<cell::GridLoc> =
            get_cell_neighbors(&altered_loc.x, &altered_loc.y, 1, false);
        for neighbour in neighbours.clone() {
            let neighbour: Cell = new_grid.get_cell(neighbour.x, neighbour.y).clone();
            new_cell.cell_neighbor_interaction(&neighbour);
        }

        // impact of this cell on neighbors
        for neighbour in neighbours.clone() {
            let mut new_neighbour: Cell = new_grid.get_cell(neighbour.x, neighbour.y).clone();
            new_neighbour.cell_neighbor_interaction(&new_cell);
            if !new_cell.are_cells_equal(&new_neighbour) {
                // update neighbour
                new_grid.cells[neighbour.y as usize][neighbour.x as usize] = new_neighbour.clone();
                new_altered_locs.cells.push(neighbour);
                new_cost += calculate_cost(&new_neighbour);
            }
        }

        // update
        new_grid.cells[altered_loc.y as usize][altered_loc.x as usize] = new_cell.clone();
        new_altered_locs.cells.push(altered_loc);
        new_cost += calculate_cost(&new_cell);

        if let Some(defence_params) = &mut new_cell.defence {
            // check if defence is out of uses
            if defence_params.remaining_uses == 0 {
                continue;
            }

            // check if defence has unlimited radius
            if defence_params.radius_of_effect < 0 {
                defence_params.alerted = true;
            }

            // get neighbours of defence and check if they are burning to alert defence
            let defence_neighbours: HashSet<cell::GridLoc> = get_cell_neighbors(
                &new_cell.x,
                &new_cell.y,
                defence_params.radius_of_effect,
                true,
            );
            for defence_neighbour in &defence_neighbours {
                let neighbour: Cell = new_grid
                    .get_cell(defence_neighbour.x, defence_neighbour.y)
                    .clone();
                if neighbour.is_burning {
                    defence_params.alerted = true;
                }
            }

            // check if defence is alerted
            if !defence_params.alerted {
                // update
                new_grid.cells[altered_loc.y as usize][altered_loc.x as usize] = new_cell.clone();
                new_altered_locs.cells.push(altered_loc);
                continue;
            }

            // defence is alerted
            // check if defence is ready
            if defence_params.response_time > 0 {
                defence_params.response_time -= 1;

                new_grid.cells[altered_loc.y as usize][altered_loc.x as usize] = new_cell.clone();
                new_altered_locs.cells.push(altered_loc);
                continue;
            }

            // defence is able to respond to each neighbor
            for defence_neighbour in &defence_neighbours {
                let mut neighbour: Cell = new_grid
                    .get_cell(defence_neighbour.x, defence_neighbour.y)
                    .clone();
                if neighbour.is_burning {
                    if neighbour.temperature < defence_params.max_temperature
                        && defence_params.remaining_uses != 0
                    {
                        // check if defence fails
                        let mut rng: ThreadRng = rand::thread_rng();
                        let random_number: f64 = rng.gen();
                        if random_number < defence_params.chance_of_failure {
                            log(&format!(
                                "Defence at {}, {} failed!",
                                new_cell.x, new_cell.y
                            ));
                            defence_params.remaining_uses -= 1;
                        } else {
                            neighbour.fuel =
                                neighbour.fuel * (1.0 - defence_params.fuel_reduction_rate);
                        }

                        new_grid.cells[defence_neighbour.y as usize]
                            [defence_neighbour.x as usize] = neighbour.clone();
                        new_altered_locs.cells.push(defence_neighbour.clone());
                    }
                }
            }

            new_cell.defence = Some(defence_params.clone());
        }

        new_grid.cells[altered_loc.y as usize][altered_loc.x as usize] = new_cell.clone();
        new_altered_locs.cells.push(altered_loc);
    }

    let unique_locs: HashSet<_> = new_altered_locs.cells.into_iter().collect();
    new_altered_locs.cells = unique_locs.into_iter().collect();

    return (new_grid, new_altered_locs, new_cost);
}

fn poisson_random(lambda: f64) -> u32 {
    let l = (-lambda).exp();
    let mut k = 0;
    let mut p = 1.0;
    let mut rng = rand::thread_rng();

    while p > l {
        let u: f64 = rng.gen();
        p *= u;
        k += 1;
    }

    k - 1
}

#[wasm_bindgen]
pub fn fire_frequency(lambda: f64, num_fires: u32) -> f64 {
    let mut len = 0;
    let mut sum = 0;

    while sum < num_fires {
        let value = poisson_random(lambda);
        len += 1;
        sum += value;
    }

    let mean = sum as f64 / len as f64;
    mean
}
