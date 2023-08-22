<script lang="ts">
	import { gridStore, stepStore, costStore } from '$lib/store';
	import type { Cell } from '$lib/classes/Cell';
	import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from '$lib/constants';
	import { simLogStore } from '$lib/store/simulationStore';

	let x: number = 0;
	let y: number = 0;
	let debugCell: Cell;

	gridStore.subscribe((grid: Cell[][]) => {
		debugCell = grid[y][x];
	});

	$: {
		gridStore.update((grid) => {
			debugCell = grid[y][x];
			return grid;
		});
	}
</script>

<div class="mt-6 p-2 border w-[1280px]">
	<div id="log" />
	<div class="font-bold border-b-2 pb-2">
		<span class="mr-4">Debug Cell: </span>
		<label>
			x
			<input type="number" class="h-8 w-16 mr-4" bind:value={x} min="0" max={GRID_WIDTH} />
		</label>
		<label>
			y
			<input type="number" class="h-8 w-16 mr-4" bind:value={y} min="0" max={GRID_HEIGHT} />
		</label>
		<label>
			step
			<input
				type="number"
				class="h-8 w-16 mr-4"
				bind:value={$stepStore}
				min="0"
				max={$simLogStore[$simLogStore.length - 1]?.totalSteps}
			/>
		</label>
	</div>
	<div class="grid grid-cols-6 text-sm">
		<div class="col-span-6 font-bold my-2 pb-1"><u>Fire Props</u></div>
		<div>temperature={debugCell.temperature.toFixed(0)}</div>
		<div>isBurning={debugCell.isBurning}</div>
		<div>proportionBurned={debugCell.proportionBurned.toFixed(2)}</div>
		<div>fuel={debugCell.fuel.toFixed(0)}</div>
		<div>object={debugCell.object}</div>
		<div>material={debugCell.material}</div>
		<div>value={debugCell.value}</div>
		<div>item={debugCell.item}</div>
		<div class="col-span-6 font-bold my-2 pb-1"><u>Defence</u></div>
		<div>name={debugCell.defence?.name}</div>
		<div>fuelReductionRate={debugCell.defence?.fuelReductionRate}</div>
		<div>maxTemperature={debugCell.defence?.maxTemperature}</div>
		<div>alerted={debugCell.defence?.alerted}</div>
		<div>radiusOfEffect={debugCell.defence?.radiusOfEffect}</div>
		<div>responseTime={debugCell.defence?.responseTime}</div>
		<div>remainingUses={debugCell.defence?.remainingUses}</div>
		<div class="col-span-6 font-bold my-2 pb-1"><u>Cost</u></div>
		<div>cost={$costStore}</div>
	</div>
</div>
