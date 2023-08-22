import type { SimulationLog } from '$lib/classes/SimulationLogger';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const stepStore: Writable<number> = writable(0);
export const simulationPendingStore: Writable<boolean> = writable(true);
export const simulationRunningStore: Writable<boolean> = writable(false);

export const simLogStore: Writable<SimulationLog[]> = writable([]);
