use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum MaterialName {
    Dirt,
    Grass,
    Wood,
    Brick,
    Tiles,
    Carpet,
    Metal,
    Glass,
}

impl ToString for MaterialName {
    fn to_string(&self) -> String {
        match self {
            MaterialName::Dirt => "Dirt".to_string(),
            MaterialName::Grass => "Grass".to_string(),
            MaterialName::Wood => "Wood".to_string(),
            MaterialName::Brick => "Brick".to_string(),
            MaterialName::Tiles => "Tiles".to_string(),
            MaterialName::Carpet => "Carpet".to_string(),
            MaterialName::Metal => "Metal".to_string(),
            MaterialName::Glass => "Glass".to_string(),
        }
    }
}

// tiles and carpet are considered under roof floor materials
// so we give them wood's values as we assume the roof is burning
// and made of wood

pub struct MaterialParams {
    pub density: f64,
    pub fuel_consumption_rate: f64,
    pub heat_value: f64,
    pub specific_heat: f64,
    pub combustion_point: f64,
    pub heat_decrease_rate: f64,
    pub base_value_multiplier: f64,
    pub heat_resistance: f64,
}

impl MaterialParams {
    pub const DIRT: Self = Self {
        density: 1000.0,
        fuel_consumption_rate: 0.0,
        heat_value: 0.0,
        specific_heat: 1.5,
        combustion_point: 2000.0 + 273.0,
        heat_decrease_rate: 0.05,
        base_value_multiplier: 0.0,
        heat_resistance: 0.25,
    };

    pub const WOOD: Self = Self {
        density: 500.0,
        fuel_consumption_rate: 0.01,
        heat_value: 15000.0,
        specific_heat: 2000.0,
        combustion_point: 400.0 + 273.0,
        heat_decrease_rate: 0.1,
        base_value_multiplier: 0.9,
        heat_resistance: 0.1,
    };

    pub const GRASS: Self = Self {
        density: 100.0,
        fuel_consumption_rate: 0.1,
        heat_value: 10000.0,
        specific_heat: 1000.0,
        combustion_point: 200.0 + 273.0,
        heat_decrease_rate: 0.2,
        base_value_multiplier: 0.0,
        heat_resistance: 0.0,
    };

    pub const BRICK: Self = Self {
        density: 2000.0,
        fuel_consumption_rate: 0.0,
        heat_value: 0.0,
        specific_heat: 3.0,
        combustion_point: 2000.0 + 273.0,
        heat_decrease_rate: 0.05,
        base_value_multiplier: 1.0,
        heat_resistance: 1.0,
    };

    pub const TILES: Self = Self {
        // assume same as wood
        density: 500.0,
        fuel_consumption_rate: 0.01,
        heat_value: 15000.0,
        specific_heat: 2000.0,
        combustion_point: 400.0 + 273.0,
        heat_decrease_rate: 0.1,
        base_value_multiplier: 0.9,
        heat_resistance: 0.25,
    };

    pub const CARPET: Self = Self {
        // assume same as wood
        density: 500.0,
        fuel_consumption_rate: 0.01,
        heat_value: 15000.0,
        specific_heat: 2000.0,
        combustion_point: 400.0 + 273.0,
        heat_decrease_rate: 0.1,
        base_value_multiplier: 0.9,
        heat_resistance: 0.25,
    };

    pub const METAL: Self = Self {
        density: 8000.0,
        fuel_consumption_rate: 0.0,
        heat_value: 0.0,
        specific_heat: 3.0,
        combustion_point: 2000.0 + 273.0,
        heat_decrease_rate: 0.2,
        base_value_multiplier: 1.0,
        heat_resistance: 0.99,
    };

    pub const GLASS: Self = Self {
        density: 2500.0,
        fuel_consumption_rate: 0.0,
        heat_value: 0.0,
        specific_heat: 3.0,
        combustion_point: 2000.0 + 273.0,
        heat_decrease_rate: 0.05,
        base_value_multiplier: 0.5,
        heat_resistance: 0.5,
    };
}

impl MaterialName {
    pub fn get_params(&self) -> MaterialParams {
        match self {
            MaterialName::Dirt => MaterialParams::DIRT,
            MaterialName::Grass => MaterialParams::GRASS,
            MaterialName::Wood => MaterialParams::WOOD,
            MaterialName::Brick => MaterialParams::BRICK,
            MaterialName::Tiles => MaterialParams::TILES,
            MaterialName::Carpet => MaterialParams::CARPET,
            MaterialName::Metal => MaterialParams::METAL,
            MaterialName::Glass => MaterialParams::GLASS,
        }
    }
}
