<script lang="ts">
	import { clearSimulationLogs } from '$lib/classes/SimulationLogger';
	import { simLogStore, riskPremiumKatexStore } from '$lib/store';
	import { Button } from 'flowbite-svelte';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { histogramData } from '$lib/utils/math';
	import { get } from 'svelte/store';
	import Katex from './Katex.svelte';
	import init, { fire_frequency } from '$lib/simulation-engine/simulation_engine';
	import { FIRE_LAMBDA } from '$lib/constants';

	let histData: number[] = [];
	let bins: string[] = [];

	simLogStore.subscribe((logs) => {
		const result = histogramData(logs.map((log) => log.totalLoss));
		histData = result.binData;
		bins = result.binLabels;
	});

	let ctx: CanvasRenderingContext2D;
	let canvas: HTMLCanvasElement;
	let chart: Chart;

	function createChart(bins: string[], data: number[]): Chart {
		let chart: Chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: bins,
				datasets: [
					{
						label: 'Frequency of Losses',
						data: data
					}
				]
			}
		});

		return chart;
	}

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		}
		chart = createChart(bins, histData);
	});

	const riskPremiumTitle = `\\text{Indicative Risk Premium}`;
	$: {
		if (get(simLogStore).length > 0 && chart) {
			const result = histogramData(get(simLogStore).map((log) => log.totalLoss));
			histData = result.binData;
			bins = result.binLabels;

			// Clear old data
			chart.data.labels!.length = 0;
			chart.data.datasets[0].data.length = 0;

			// Add new data
			chart.data.labels!.push(...bins);
			chart.data.datasets[0].data.push(...histData);

			// Update the chart
			chart.update();

			// generate frequency
			let numFires = get(simLogStore).length;
			let lambda = FIRE_LAMBDA; // Replace with your desired lambda value
			let fireFrequency = fire_frequency(lambda, numFires);

			// update mathjax
			if (get(simLogStore).length > 0) {
				const totalLosses = get(simLogStore).map((log) => log.totalLoss);
				const totalLoss = totalLosses.reduce((a, b) => a + b, 0);
				const meanLoss = totalLoss / totalLosses.length;
				const riskPremiumValue = fireFrequency * meanLoss;
				const riskPremiumKatex =
					`\\begin{aligned}` +
					`&= \\text{Fire Frequency} * \\text{Mean Loss} \\\\` +
					`&= ${fireFrequency.toFixed(5)} * ${meanLoss.toFixed(2)} \\\\` +
					`&= ${riskPremiumValue.toFixed(2)}` +
					`\\end{aligned}`;
				riskPremiumKatexStore.set(riskPremiumKatex);
			}
		} else {
			if (chart) {
				chart.data.labels!.length = 0;
				chart.data.datasets[0].data.length = 0;
				chart.update();
			}
		}
	}
</script>

<div
	class="shadow-md border rounded-md min-w-[78rem] max-w-[78rem] h-[250px] grid grid-cols-3 content-center gap-2"
>
	<div class="flex flex-col justify-center mx-4 p-2 w-full h-full">
		<Katex math={riskPremiumTitle} />
		<br class="mb-2" />
		<Katex math={$riskPremiumKatexStore} />
	</div>
	<div class="text-sm p-2 w-full h-[220px]">
		<canvas bind:this={canvas} />
	</div>
	<div class="flex flex-col text-xs p-2 w-full max-h-[220px]">
		<div class="font-bold pb-1">
			<div class="flex flex-row">
				<span class="flex-grow">Simulation Log</span>
				<span
					><Button color="alternative" size="xs" on:click={clearSimulationLogs}>Clear</Button></span
				>
			</div>
		</div>
		<div class="grid grid-cols-12 gap-2 mb-2">
			<u class="col-span-1">ID</u>
			<u class="col-span-2 text-right">Time</u>
			<u class="col-span-4 text-right">Cause of Fire</u>
			<u class="col-span-3 text-right">Total Loss</u>
			<u class="col-span-2 text-right">Steps</u>
		</div>
		<div class="grid grid-cols-12 gap-2 overflow-y-scroll">
			{#each $simLogStore as log}
				<div class="font-bold col-span-1">{log.id}</div>
				<div class="col-span-2 text-right">{log.time}</div>
				<div class="col-span-4 text-right">{log.causeOfFire}</div>
				<div class="col-span-3 text-right">{log.totalLoss.toFixed(2)}</div>
				<div class="col-span-2 text-right">{log.totalSteps}</div>
			{/each}
		</div>
	</div>
</div>
