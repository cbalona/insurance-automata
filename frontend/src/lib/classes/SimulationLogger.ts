import { simLogStore } from '$lib/store/simulationStore';
import { get } from 'svelte/store';

export interface SimulationLog {
	id: number;
	date: string;
	time: string;
	totalLoss: number;
	totalSteps: number;
	causeOfFire: string;
}

export function startNewLog(causeOfFire: string): void {
	const id = get(simLogStore).length + 1;
	const datetime = new Date();
	const date = datetime.toLocaleDateString();
	const time = datetime.toLocaleTimeString();
	const log: SimulationLog = { id, date, time, causeOfFire, totalLoss: 0, totalSteps: 0 };
	simLogStore.update((logs) => [...logs, log]);
}

export function updateLog(totalLoss: number, totalSteps: number): void {
	// Get the current log
	const logs = get(simLogStore);
	const currentLog = logs[logs.length - 1];

	// If there's no log to update, return
	if (!currentLog) {
		console.error("No simulation log started. Call startNewLog before updating.");
		return;
	}

	// Update the current log
	const updatedLog = { ...currentLog, totalLoss, totalSteps };

	// Replace the last log with the updated log
	simLogStore.set([...logs.slice(0, -1), updatedLog]);
}

export function clearSimulationLogs(): void {
	simLogStore.set([]);
}