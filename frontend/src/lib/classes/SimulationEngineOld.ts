// import { produce } from 'immer';
// import {
// 	cellSelfInteraction,
// 	cellNeighborInteraction,
// 	getCellNeighbors,
// 	type Cell,
// 	areCellsEqual,
// 	ignite
// } from '$lib/classes/Cell';
// import {
// 	alteredCellsStore,
// 	gridStore,
// 	simulationRunningStore
// } from '$lib/store';
// import { get } from 'svelte/store';
// import { startNewLog, updateLog } from './SimulationLogger';
// import { maxSteps, nCostCheckSteps } from '$lib/constants';
// import { ItemParamsMap } from './Item';
// import { DefenceParamsMap } from './Defence';
// import { deepCopy } from '$lib/utils/io';

// export interface FireSource {
// 	x: number;
// 	y: number;
// 	probability: number;
// 	item: string;
// }

// export default class SimulationEngine {
// 	designState: Cell[][] = get(designStateStore);
// 	designAlteredCells: Set<string> = get(designAlteredCellsStore);
// 	gridSimulation: Cell[][][] = [];
// 	alteredCells: Set<string>[] = [];
// 	cost: number[] = [0];
// 	steps = 0;
// 	pauseSteps = 10;
// 	ignitionSource: { x: number; y: number; cause: string } | null = null;

// 	async simulate() {
// 		// if it's the first step of the simulation
// 		simulationRunningStore.set(true);
// 		if (this.steps == 0) {
// 			this.resetSimulation();

// 			const designState = this.startFire({
// 				grid: this.designState,
// 				alteredCells: this.designAlteredCells
// 			});
// 			this.gridSimulation.push(designState.grid);
// 			this.alteredCells.push(designState.alteredCells);
// 			const fireCause = `${this.ignitionSource!.cause} at (${this.ignitionSource!.x}, ${
// 				this.ignitionSource!.y
// 			})`;
// 			startNewLog(fireCause);
// 		}

// 		let currentSimStep = 0;

// 		while (this.steps < maxSteps) {
// 			if (currentSimStep == this.pauseSteps) {
// 				break;
// 			}
// 			currentSimStep++;

// 			const nextState = this.runNextStep({
// 				grid: this.gridSimulation[this.gridSimulation.length - 1],
// 				alteredCells: this.alteredCells[this.alteredCells.length - 1]
// 			});
// 			this.gridSimulation.push(nextState.grid);
// 			this.alteredCells.push(nextState.alteredCells);
// 			this.steps++;

// 			// check if cost hasn't changed in the last n steps
// 			// if (this.steps < nCostCheckSteps) {
// 			// 	continue;
// 			// }
// 			// const lastNCostEqual = this.cost
// 			// 	.slice(-nCostCheckSteps)
// 			// 	.every((cost, i, arr) => cost === arr[0]);
// 			// if (lastNCostEqual) {
// 			// 	break;
// 			// }
// 			updateLog(this.cost[this.cost.length - 1], this.steps);
// 			simulationRunningStore.set(false);
// 		}

// 		// if (this.steps >= maxSteps) {
// 		// 	simulationRunningStore.set(false);
// 		// 	const fireCause = `${this.ignitionSource!.cause} at (${this.ignitionSource!.x}, ${
// 		// 		this.ignitionSource!.y
// 		// 	})`;
// 		// 	logSimulation(this.cost[this.cost.length - 1], this.steps, fireCause);
// 		// }
// 	}

// 	calculateCosts(cell: Cell): number {
// 		return cell.value * cell.proportionBurned;
// 	}

// 	runNextStep = produce((draftState: { grid: Cell[][]; alteredCells: Set<string> }) => {
// 		let cost = this.cost[this.cost.length - 1];
// 		let defenceTouch = 0;

// 		const draftGrid = draftState.grid;
// 		const draftAlteredCells = draftState.alteredCells;
// 		// We first run through design with no alterations
// 		for (const xy_coord of Array.from(draftAlteredCells)) {
// 			const [x, y] = xy_coord.split(',').map(Number);
// 			const cell = draftGrid[y][x];

// 			// first handle fire spread
// 			let newCell = cellSelfInteraction(cell);
// 			const neighbors = getCellNeighbors(draftGrid, x, y, 1);
// 			neighbors.forEach((ncoords) => {
// 				const [nx, ny] = ncoords.split(',').map(Number);
// 				const neighborCell = draftGrid[ny][nx];
// 				newCell = cellNeighborInteraction(newCell, neighborCell);
// 			});

// 			cost += this.calculateCosts(newCell);
// 			draftGrid[y][x] = newCell;
// 			draftAlteredCells.add(xy_coord);

// 			// Consider the cell's neighbors as potentially altered
// 			neighbors.forEach((ncoords) => {
// 				const [nx, ny] = ncoords.split(',').map(Number);
// 				const neighborCell = draftGrid[ny][nx];
// 				// const newNeighborCell = cellSelfInteraction(neighborCell);
// 				const finalNeighborCell = cellNeighborInteraction(neighborCell, cell);
// 				if (!areCellsEqual(neighborCell, finalNeighborCell)) {
// 					draftGrid[ny][nx] = finalNeighborCell;
// 					draftAlteredCells.add(ncoords);
// 				}
// 			});

// 			// now all defences
// 			if (!newCell.defence) {
// 				continue;
// 			}
// 			defenceTouch += 1;

// 			// check if defence is alerted or can be alerted
// 			const defendedCell = produce(newCell, (draftCell) => {
// 				const defenceParams = draftCell.defence!;
// 				const neighbours = getCellNeighbors(draftGrid, x, y, defenceParams.radiusOfEffect);
// 				if (defenceParams.radiusOfEffect === -1) {
// 					defenceParams.alerted = true;
// 				} else {
// 					neighbours.forEach((ncoords) => {
// 						const [nx, ny] = ncoords.split(',').map(Number);
// 						const neighbourCell = draftGrid[ny][nx];
// 						if (neighbourCell.isBurning) {
// 							defenceParams.alerted = true;
// 						}
// 					});
// 				}

// 				if (!draftCell.defence!.alerted) {
// 					return draftCell;
// 				}

// 				// defence is alerted
// 				// check if defence is ready
// 				if (draftCell.defence!.responseTime > 0) {
// 					draftCell.defence!.responseTime -= 1;
// 					draftGrid[y][x].defence = draftCell.defence!;
// 					draftAlteredCells.add(xy_coord);
// 					return draftCell;
// 				}

// 				// defence is able to respond to each neighbor
// 				neighbours.forEach((ncoords) => {
// 					const [nx, ny] = ncoords.split(',').map(Number);
// 					const defendedNeighbourCell = draftGrid[ny][nx];
// 					if (defendedNeighbourCell.isBurning) {
// 						if (
// 							defendedNeighbourCell.temperature < defenceParams.maxTemperature &&
// 							defenceParams.remainingUses > 0
// 						) {
// 							defendedNeighbourCell.fuel =
// 								defendedNeighbourCell.fuel * (1 - defenceParams.fuelReductionRate);
// 							defenceParams.remainingUses -= 1;
// 							draftGrid[ny][nx] = defendedNeighbourCell;
// 							draftAlteredCells.add(ncoords);
// 						}
// 					}
// 				});
// 				return draftCell;
// 			});

// 			draftGrid[y][x] = defendedCell;
// 			draftAlteredCells.add(xy_coord);
// 		}

// 		this.cost.push(cost);
// 		draftState.grid = draftGrid;
// 		draftState.alteredCells = draftAlteredCells;

// 		return draftState;
// 	});

// 	getGridAtStep(step: number): Cell[][] {
// 		if (this.gridSimulation.length > 0) {
// 			return this.gridSimulation[step];
// 		}
// 		return this.designState;
// 	}

// 	getAlteredCellsAtStep(step: number): Set<string> {
// 		if (this.alteredCells.length > 0) {
// 			return this.alteredCells[step];
// 		}
// 		return this.designAlteredCells;
// 	}

// 	getCostAtStep(step: number): number {
// 		return this.cost[step];
// 	}

// 	resetSimulation(): void {
// 		this.designState = get(designStateStore);
// 		this.designAlteredCells = get(designAlteredCellsStore);
// 		this.gridSimulation = [];
// 		this.alteredCells = [];
// 		this.steps = 0;
// 		this.cost = [0];
// 		this.ignitionSource = null;
// 	}

// 	startFire = produce((draftState: { grid: Cell[][]; alteredCells: Set<string> }) => {
// 		let ignition = false;
// 		const fireSources: FireSource[] = [];
// 		// Find ignition source
// 		// if no ignition has been detected, generate a random ignition
// 		// we assume a fire will always start, question is where
// 		// here we bundle checking for ignition with finding
// 		// all the fire sources for performance reasons
// 		for (const xy_coord of Array.from(draftState.alteredCells)) {
// 			const [x, y] = xy_coord.split(',').map(Number);
// 			const cell = draftState.grid[y][x];
// 			ignition = ignition || cell.isBurning;
// 			if (!this.ignitionSource && ignition) {
// 				this.ignitionSource = { x, y, cause: 'Design' };
// 				continue;
// 			}
// 			if (cell.item) {
// 				fireSources.push({
// 					x,
// 					y,
// 					probability: ItemParamsMap[cell.item].fireProbability,
// 					item: cell.item
// 				});
// 			}
// 		}

// 		if (ignition) {
// 			return draftState;
// 		}

// 		// also add a random chance of fire from lightning
// 		// random x,y
// 		const lx = Math.floor(Math.random() * draftState.grid[0].length);
// 		const ly = Math.floor(Math.random() * draftState.grid.length);
// 		fireSources.push({
// 			x: lx,
// 			y: ly,
// 			probability: 0.01,
// 			item: 'Lightning'
// 		});

// 		// now loop through until one of the fire sources ignites
// 		while (!ignition) {
// 			for (const { x, y, probability, item } of fireSources) {
// 				const random = Math.random();
// 				if (random < probability) {
// 					const cell = draftState.grid[y][x];
// 					draftState.grid[y][x] = ignite(cell);
// 					draftState.alteredCells.add(`${x},${y}`);
// 					ignition = true;
// 					this.ignitionSource = { x, y, cause: item };
// 					break;
// 				}
// 			}
// 		}
// 		return draftState;
// 	});
// }

// export const simulationEngine: SimulationEngine = new SimulationEngine();
