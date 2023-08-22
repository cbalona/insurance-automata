import type { Cell } from '../classes/Cell';
import type { Writable } from 'svelte/store';
import { get, writable } from 'svelte/store';
import { emptyGrid } from '../constants';

export const gridStore: Writable<Cell[][]> = writable(emptyGrid());
export const alteredCellsStore: Writable<Set<string>> = writable(new Set());
export const costStore: Writable<number> = writable(0);

export const designingInitialStateStore: Writable<boolean> = writable(true);

export function saveDesignState(): void {
	const designState = {
		grid: get(gridStore),
		alteredCells: Array.from(get(alteredCellsStore))
	};
	localStorage.setItem('designStateStore', JSON.stringify(designState));
	designingInitialStateStore.set(false);
}

export function loadDesignState(): void {
	const designState = JSON.parse(
		localStorage.getItem('designStateStore') ||
			JSON.stringify({
				grid: emptyGrid(),
				alteredCells: new Set()
			})
	);
	gridStore.set(designState.grid);
	alteredCellsStore.set(new Set(designState.alteredCells));
}
