use wasm_bindgen::prelude::*;

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}

static CELL_SIZE: i32 = 20;
pub static GRID_HEIGHT: i32 = 540 / CELL_SIZE;
pub static GRID_WIDTH: i32 = 960 / CELL_SIZE;
pub static MIN_STEPS: i32 = 10;
pub static MAX_STEPS: i32 = 1000;
pub static AMBIENT_TEMP: f64 = 21.0 + 273.0;
pub static MAX_TEMP: f64 = 1000.0 + 273.0;
pub static HEAT_TRANSFER_RATE: f64 = 0.1;
pub static ROOF_VALUE: f64 = 80.0;
pub static CONTENTS_VALUE: f64 = 25.0;
pub static N_COST_CHECK_STEPS: usize = 10;
