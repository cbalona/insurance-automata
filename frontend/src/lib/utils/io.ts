import type { Cell } from '$lib/classes/Cell';
import { alteredCellsStore, gridStore, riskPremiumKatexStore, saveDesignState, simulationPendingStore, stepStore } from '$lib/store';
import { simulationEngine } from '$lib/classes/SimulationEngine';
import { RISK_PREMIUM_KATEX, emptyGrid } from '$lib/constants';
import { clearSimulationLogs } from '$lib/classes/SimulationLogger';

export function deepCopy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

export function loadTemplate(template: string): void {
	let data: any;
	fetch(`${template}.json`)
		.then((response) => response.json())
		.then((jsonData) => {
			data = jsonData;
			importGridState(data);
		})
		.catch((error) => {
			console.error('Error fetching JSON:', error);
		});
}

export function importGridState(gridState: { grid: Cell[][]; alteredCells: string[] }): void {
	simulationPendingStore.set(true);
	clearSimulationLogs();
	riskPremiumKatexStore.set(RISK_PREMIUM_KATEX);
	gridStore.set(emptyGrid());
	alteredCellsStore.set(new Set());
	saveDesignState();

	const alteredCells = new Set(gridState.alteredCells);
	alteredCellsStore.set(alteredCells);
	gridStore.set(gridState.grid);
	stepStore.set(0);
	saveDesignState();

	simulationEngine.resetSimulation();
}

export function exportGridState(): { grid: Cell[][]; alteredCells: string[] } {
	const designState = JSON.parse(
		localStorage.getItem('designStateStore') ||
			JSON.stringify({
				grid: emptyGrid(),
				alteredCells: new Set()
			})
	);
	return designState;
}