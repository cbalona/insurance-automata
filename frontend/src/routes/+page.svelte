<script lang="ts">
	// import { exportGridToJson } from '$lib/utils/export';
	import { SimulationControls, Grid } from '$lib';
	import DebugPanel from '$lib/components/DebugPanel.svelte';
	import SimulationLog from '$lib/components/SimulationLog.svelte';
	import SimSidebar from '$lib/components/sim-sidebar/SimSidebar.svelte';
	import { APP_NAME } from '$lib/constants';
</script>

<svelte:head>
	<title>Simulator</title>
</svelte:head>

<div id="simulationContainer" class="flex flex-col">
	<div class="flex flex-row h-full mb-4">
		<div class="flex flex-col">
			<Grid />
			<SimulationControls />
		</div>
		<SimSidebar />
	</div>
	<div class="w-full ax-w-[80em]">
		<SimulationLog />
	</div>
</div>
<!-- <DebugPanel /> -->
