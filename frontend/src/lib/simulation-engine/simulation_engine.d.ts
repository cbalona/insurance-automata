/* tslint:disable */
/* eslint-disable */
/**
* @param {any} json_grid
* @param {any} json_altered_locs
* @returns {any}
*/
export function get_fire_source(json_grid: any, json_altered_locs: any): any;
/**
* @param {any} json_grid
* @param {any} json_altered_locs
* @returns {any}
*/
export function simulate(json_grid: any, json_altered_locs: any): any;
/**
* @param {number} lambda
* @param {number} num_fires
* @returns {number}
*/
export function fire_frequency(lambda: number, num_fires: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly get_fire_source: (a: number, b: number) => number;
  readonly simulate: (a: number, b: number) => number;
  readonly fire_frequency: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
