<script lang="ts">
	import { gridStore } from '$lib/store';

	import { loadTemplate } from '$lib/utils/io';

	import BrickWalls_FireDefenses from '$lib/assets/templates/BrickWalls_FireDefenses.png';
	import BrickWalls_FireDefenses_AltPlan from '$lib/assets/templates/BrickWalls_FireDefenses_AltPlan.png';
	import BrickWalls_NoDefenses from '$lib/assets/templates/BrickWalls_NoDefenses.png';
	import BrickWalls_NoDefenses_AltPlan from '$lib/assets/templates/BrickWalls_NoDefenses_AltPlan.png';
	import WoodenWalls_NoDefenses from '$lib/assets/templates/WoodenWalls_NoDefenses.png';

	const baseButton: string =
		'py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:focus:ring-gray-700 dark:hover:text-white dark:hover:bg-gray-700';
	const activeButton: string =
		'focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600';
	let alternativeButtonClass: string;
	$: alternativeButtonClass = `${baseButton} ${activeButton}`;

	$: {
		gridStore.update((grid) => {
			grid[0][0] = grid[0][0];
			return grid;
		});
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-col my-2">
		<button
			on:click={() => loadTemplate('BrickWalls-NoDefenses')}
			class="{alternativeButtonClass} !p-0"
		>
			<img src={BrickWalls_NoDefenses} class="rounded-lg" />
		</button>
		<button
			on:click={() => loadTemplate('BrickWalls-FireDefenses')}
			class="{alternativeButtonClass} !p-0"
		>
			<img src={BrickWalls_FireDefenses} class="rounded-lg" />
		</button>
		<button
			on:click={() => loadTemplate('BrickWalls-NoDefenses-AltPlan')}
			class="{alternativeButtonClass} !p-0"
		>
			<img src={BrickWalls_NoDefenses_AltPlan} class="rounded-lg" />
		</button>
		<button
			on:click={() => loadTemplate('BrickWalls-FireDefenses-AltPlan')}
			class="{alternativeButtonClass} !p-0"
		>
			<img src={BrickWalls_FireDefenses_AltPlan} class="rounded-lg" />
		</button>
		<button
			on:click={() => loadTemplate('WoodenWalls-NoDefenses')}
			class="{alternativeButtonClass} !p-0"
		>
			<img src={WoodenWalls_NoDefenses} class="rounded-lg" />
		</button>
	</div>
</div>
