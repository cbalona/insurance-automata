use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum ItemName {
    Stove,
    Heater,
    Candle,
    Fireplace,
    Barbecue,
}

impl ToString for ItemName {
    fn to_string(&self) -> String {
        match self {
            ItemName::Stove => "Stove".to_string(),
            ItemName::Heater => "Heater".to_string(),
            ItemName::Candle => "Candle".to_string(),
            ItemName::Fireplace => "Fireplace".to_string(),
            ItemName::Barbecue => "Barbecue".to_string(),
        }
    }
}

impl ItemName {
    pub fn fire_probability(&self) -> f64 {
        match *self {
            ItemName::Stove => 0.63,
            ItemName::Heater => 0.12,
            ItemName::Candle => 0.08,
            ItemName::Fireplace => 0.08,
            ItemName::Barbecue => 0.08,
        }
    }
}
