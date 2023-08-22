<script lang="ts">
	import { Heading, Label, Input, Card, Button } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	import { MaterialParamsStoreMap } from '$lib/store';
	import type { MaterialName } from '$lib/classes/Material';
	import { get } from 'svelte/store';

	let materialKeys = Object.keys(MaterialParamsStoreMap) as MaterialName[];
</script>

<Heading tag="h5" class="mb-4">Materials</Heading>
<div class="grid grid-cols-1 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
	{#each materialKeys as materialKey (materialKey)}
		<Card>
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{materialKey}
			</h5>
			{#each Object.entries(get(MaterialParamsStoreMap[materialKey])) as [key, value] (key)}
				{#if key === 'name'}
					<!-- Nothing -->
				{:else}
					<div class="mb-6">
						<Label for="small-input" class="block mb-2">{key}</Label>
						<div class="flex flex-row gap-2">
							<Input id="small-input" size="sm" placeholder={key} bind:value disabled />
							<!-- <button class="hover:text-red-600 rounded border border-gray-300 w-10 h-8 flex items-center justify-center"
								on:click={() => {
									MaterialParamsStoreMap[materialKey].set(get(MaterialParamsStoreMap[materialKey]));
								}}><Icon icon="pixelarticons:save" width="20" /></button
							> -->
						</div>
					</div>
				{/if}
			{/each}
		</Card>
	{/each}
</div>
