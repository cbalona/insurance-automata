use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum ObjectName {
    Earth,
    Floor,
    Wall,
    Door,
    Window,
}

impl ToString for ObjectName {
    fn to_string(&self) -> String {
        match self {
            ObjectName::Earth => "Earth".to_string(),
            ObjectName::Floor => "Floor".to_string(),
            ObjectName::Wall => "Wall".to_string(),
            ObjectName::Door => "Door".to_string(),
            ObjectName::Window => "Window".to_string(),
        }
    }
}

// below we do everything relative to a 1x1x3 cell
// base volume is 3: 1x1x3:
// /____\ <- top
// |    | <- middle
// |____| <- bottom

// roof is always the same volume and material for all cells
// roof is not modelled directly, if the cell is burning, 
// it's assumed that the roof is burning too

// floor cells burn based on the roof
// cost is calculated using a constant roof value
// we also assume some volume for contents made of wood
// like furniture, etc.

// eg tile floor would have 0.15 * 500 = 75 volume of wood
// for the "contents" and then 0.25 * 500 = 125 voume of 
// wood for the roof structure