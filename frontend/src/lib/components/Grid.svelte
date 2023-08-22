<script lang="ts">
	import { onMount } from 'svelte';
	import PixiGrid from '$lib/classes/graphics/PixiGrid';
	import { gridStore } from '$lib/store';
	import { loadTemplate } from '$lib/utils/io';

	let divElement: HTMLCanvasElement;

	// let pixiGrid = null;
	onMount(() => {
		// Create PIXI application
		let pixiGrid = new PixiGrid(divElement);
		loadTemplate('BrickWalls-NoDefenses');

		gridStore.subscribe(() => {
			pixiGrid.updateGrid();
		});
	});

	// function take_pic() {
	// 	const snapshotCanvas = pixiGrid.renderer.extract.canvas(pixiGrid.gridContainer);
	// 	const dataURL = snapshotCanvas.toDataURL('image/png');

	// 	// Set the data URL as the src attribute of an img element
	// 	const img = document.createElement('img');
	// 	img.src = dataURL;
	// 	document.body.appendChild(img);

	// 	// Or use it to download the image
	// 	const a = document.createElement('a');
	// 	a.href = dataURL;
	// 	a.download = 'snapshot.png';
	// 	a.click();
	// }
</script>

<canvas id="gridBox" bind:this={divElement} class="mr-4 rounded shadow-md" />
<!-- <button on:click={take_pic}>TakePic</button> -->
