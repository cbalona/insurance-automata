use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Copy)]
pub enum DefenceName {
    Extinguisher,
    Sprinkler,
    Blanket,
    Detector,
}

#[derive(Serialize, Deserialize, Debug, Clone, Copy)]
#[serde(rename_all = "camelCase")]
pub struct DefenceParams {
    pub name: DefenceName,
    pub fuel_reduction_rate: f64,
    pub max_temperature: f64,
    pub alerted: bool,
    pub radius_of_effect: i32,
    pub response_time: i32,
    pub remaining_uses: i32,
    pub chance_of_failure: f64,
}
