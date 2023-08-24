<script lang="ts">
	import type { Cell } from '$lib/classes/Cell';
	import { Label, Fileupload } from 'flowbite-svelte';
	import { designingInitialStateStore, gridStore, numSimsStore } from '$lib/store';
	import { importGridState, exportGridState } from '$lib/utils/io';

	const baseButton: string =
		'py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:focus:ring-gray-700 dark:hover:text-white dark:hover:bg-gray-700';
	const activeButton: string =
		'focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600';
	const disabledButton: string = 'cursor-not-allowed opacity-50';
	let alternativeButtonClass: string;
	$: alternativeButtonClass = $designingInitialStateStore
		? `${baseButton} ${disabledButton}`
		: `${baseButton} ${activeButton}`;

	function downloadJSON(): void {
		let gridState: { grid: Cell[][]; alteredCells: string[] } = exportGridState();
		let json: string = JSON.stringify(gridState);
		let blob: Blob = new Blob([json], { type: 'application/json' });
		let url: string = URL.createObjectURL(blob);

		// Create a link and programmatically click it
		let link: HTMLAnchorElement = document.createElement('a');
		link.href = url;
		link.download = 'designGridState.json';
		link.click();
	}

	// upload
	const fileuploadprops: {
		type: string;
		accept: string;
	} = {
		type: 'file',
		accept: '.json'
	};

	let file: File | null = null;
	let data: any;

	function onFileChange(event: Event): void {
		file = (event.target as HTMLInputElement).files?.[0] ?? null;
		if (file) {
			let reader: FileReader = new FileReader();

			reader.onload = (e) => {
				try {
					if (e.target?.result) {
						data = JSON.parse(e.target.result as string);
					}
					importGridState(data);
				} catch (error) {
					console.error('Error parsing JSON', error);
				}
			};

			reader.onerror = (error) => {
				console.error('Error reading file', error);
			};

			reader.readAsText(file);
		}
	}

	$: {
		gridStore.update((grid) => {
			grid[0][0] = grid[0][0];
			return grid;
		});
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-col my-2">
		<Label class="pb-2 mb-2 underline underline-offset-4">Download Floorplan</Label>
		<button
			class={alternativeButtonClass}
			on:click={() => downloadJSON()}
			disabled={$designingInitialStateStore}>Download Floorplan</button
		>
		<div class="h-4 w-full text-center">
			{#if $designingInitialStateStore}
				<div class="text-red-500 text-xs">You have not saved!</div>
			{/if}
		</div>
		<!-- {#if copySuccess}
		<Icon icon="pixelarticons:check-double" width="24" class="text-right" color="lightgreen" />
	{/if} -->
	</div>
	<div class="flex flex-col">
		<Label class="pb-2 mb-2 underline underline-offset-4">Upload Floorplan</Label>
		<Fileupload {...fileuploadprops} on:change={onFileChange} inputClass="border !p-0 text-xs" />
	</div>
	<div class="flex flex-col mt-6">
		<Label class="pb-2 mb-2 underline underline-offset-4">Bulk Simulations</Label>
		<input type="number" class="rounded" bind:value={$numSimsStore} min="0" />
	</div>
</div>
