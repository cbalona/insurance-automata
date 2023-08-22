import { produce } from 'immer';
import { type Cell, ignite } from '$lib/classes/Cell';
import { alteredCellsStore, gridStore } from '$lib/store';
import { get } from 'svelte/store';
import { startNewLog, updateLog } from './SimulationLogger';
import init, { get_fire_source, simulate } from '$lib/simulation-engine/simulation_engine';
import { loadDesignState } from '$lib/store/gridStore';

export interface FireSource {
	x: number;
	y: number;
	cause: string;
}

function asyncSimulate(json_grid: Cell[][], json_altered_locs: Set<string>): Promise<any> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const result = simulate(json_grid, json_altered_locs);
			resolve(result);
		}, 0);
	});
}

export default class SimulationEngineAPI {
	designState: Cell[][] = get(gridStore);
	designAlteredCells: Set<string> = get(alteredCellsStore);
	gridSimulation: Cell[][][] = [];
	alteredCells: Set<string>[] = [];
	cost: number[] = [];
	steps = 0;
	pauseSteps = 10;
	ignitionSource: { x: number; y: number; cause: string } | null = null;

	async callSimulation(): Promise<boolean> {
		await init();

		if (this.steps == 0) {
			this.resetSimulation();
			this.getOrSetFireSource();
		}

		const result = await asyncSimulate(this.designState, this.designAlteredCells);

		// push each grid to the simulation
		for (const grid of result.grid_steps) {
			this.gridSimulation.push(grid.cells);
		}

		// push each altered cell set to the simulation
		for (const alteredCells of result.altered_loc_steps) {
			// convert to string
			this.alteredCells.push(
				new Set(alteredCells.cells.map((cell: { x: any; y: any }) => `${cell.x},${cell.y}`))
			);
		}

		this.cost = result.cost;
		this.steps = this.gridSimulation.length;
		updateLog(this.cost[this.cost.length - 1], this.steps);

		return true;
	}

	private getOrSetFireSource() {
		const fire_source = get_fire_source(this.designState, this.designAlteredCells);
		const designState = produce(this.designState, (draftState) => {
			draftState[fire_source.y][fire_source.x] = ignite(draftState[fire_source.y][fire_source.x]);
		});
		this.ignitionSource = {
			...fire_source
		};

		const fireCause = `${this.ignitionSource!.cause} at (${this.ignitionSource!.x}, ${
			this.ignitionSource!.y
		})`;
		startNewLog(fireCause);

		this.designState = designState;
		this.designAlteredCells.add(`${fire_source.x},${fire_source.y}`);
	}

	getGridAtStep(step: number): Cell[][] {
		if (this.gridSimulation.length > 0) {
			return this.gridSimulation[step];
		}
		return this.designState;
	}

	getAlteredCellsAtStep(step: number): Set<string> {
		if (this.alteredCells.length > 0) {
			return this.alteredCells[step];
		}
		return this.designAlteredCells;
	}

	getCostAtStep(step: number): number {
		if (this.cost.length > 0) {
			return this.cost[step];
		}
		return 0;
	}

	async resetSimulation(): Promise<void> {
		loadDesignState();
		this.designState = get(gridStore);
		this.designAlteredCells = get(alteredCellsStore);
		this.gridSimulation = [];
		this.alteredCells = [];
		this.steps = 0;
		this.cost = [];
		this.ignitionSource = null;
	}
}

export const simulationEngine: SimulationEngineAPI = new SimulationEngineAPI();
