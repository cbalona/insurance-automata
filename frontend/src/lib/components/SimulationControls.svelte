<script lang="ts">
	import { Button, Spinner, Range, Label } from 'flowbite-svelte';
	import {
		alteredCellsStore,
		gridStore,
		costStore,
		designingInitialStateStore,
		saveDesignState,
		stepStore,
		simulationPendingStore
	} from '$lib/store';
	import { simulationEngine } from '$lib/classes/SimulationEngine';
	import { emptyGrid } from '$lib/constants';
	import { loadDesignState } from '$lib/store/gridStore';

	let simulatedSteps: number = 0;
	let simulationRunning: boolean = false;
	let queuedSimNumber: number = 0;

	async function runSimulation(n: number = 1): Promise<void> {
		if ($designingInitialStateStore) return;
		designingInitialStateStore.set(false);
		simulationPendingStore.set(false);
		simulationRunning = true;
		queuedSimNumber = 0;

		for (let i = 0; i < n; i++) {
			queuedSimNumber++;
			await simulationEngine.resetSimulation();
			await simulationEngine.callSimulation();
		}

		simulatedSteps = simulationEngine.steps - 2;
		simulationRunning = false;

		gridStore.set(simulationEngine.getGridAtStep(0));
		alteredCellsStore.set(simulationEngine.getAlteredCellsAtStep(0));
	}

	$: {
		const currentStep = $stepStore;
		const newGridData = simulationEngine.getGridAtStep(currentStep);
		const newAlteredCells = simulationEngine.getAlteredCellsAtStep(currentStep);
		const cost = simulationEngine.cost;

		gridStore.set(newGridData);
		alteredCellsStore.set(newAlteredCells);
		costStore.set(cost[currentStep]);
	}

	function resetSimulation(): void {
		if ($designingInitialStateStore) return;
		simulationPendingStore.set(true);
		simulationEngine.resetSimulation();
		stepStore.set(0);
		loadDesignState();
		designingInitialStateStore.set(true);
	}

	function clearGrid(): void {
		simulationPendingStore.set(true);
		gridStore.set(emptyGrid());
		alteredCellsStore.set(new Set());
		saveDesignState();
		resetSimulation();
	}
</script>

<div class="flex flex-row max-w-full mt-4 mr-4">
	{#if $designingInitialStateStore}
		<Button on:click={saveDesignState} color="red" class="mr-2 w-24">Save</Button>
	{:else}
		<Button
			on:click={() => runSimulation(1)}
			disabled={simulationRunning}
			color="red"
			class="mr-2 w-24"
		>
			{#if simulationRunning}
				<Spinner color="white" key={Math.random()} />
			{:else}
				Run x1
			{/if}
		</Button>
		<Button
			on:click={() => runSimulation(10)}
			disabled={simulationRunning}
			color="red"
			class="mr-2 w-24"
		>
			{#if simulationRunning}
				{queuedSimNumber}
			{:else}
				Run x10
			{/if}
		</Button>
	{/if}
	<div class="flex-grow">
		<Label class="my-2 text-center">Simulation Step: {$stepStore}</Label>
		<Range
			id="range-minmax"
			min="0"
			max={simulatedSteps}
			bind:value={$stepStore}
			disabled={$simulationPendingStore}
		/>
	</div>
	<Button
		on:click={resetSimulation}
		color="red"
		class="mx-2 w-24"
		disabled={$designingInitialStateStore || $simulationPendingStore || simulationRunning}
		>Reset</Button
	>
	<Button on:click={clearGrid} disabled={simulationRunning} color="red" class="w-24">Clear</Button>
</div>
