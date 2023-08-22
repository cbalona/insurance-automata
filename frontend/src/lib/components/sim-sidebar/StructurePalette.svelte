<script lang="ts">
	import {
		selectedObjectStore,
		selectedMaterialStore,
		textureImageStore,
		selectedItemStore,
		selectedDefenceStore
	} from '$lib/store';
	import { ObjectEnum, AllowedMaterialsMap } from '$lib/classes/Object';
	import type { MaterialName } from '$lib/classes/Material';

	let ulClass: string =
		'w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white';
	let liClass: string = 'w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600';
	let labelClass: string =
		'w-full py-3 pl-3 text-sm font-medium text-gray-900 dark:text-gray-300 flex flex-row';
	let labelCheckedClass: string =
		'dark:peer-checked:text-blue-500 peer-checked:shadow-lg peer-checked:font-bold cursor-pointer';

	let allowedMaterials: MaterialName[] = [];
	selectedObjectStore.subscribe((object) => {
		if (object) {
			allowedMaterials = AllowedMaterialsMap[object];
		}
	});

	$: if ($selectedObjectStore) {
		selectedDefenceStore.set(null);
		selectedItemStore.set(null);
	}
</script>

<div id="object_palette">
	<div class="text-sm font-bold pb-3 pl-1">Select Structure</div>
	<ul class={ulClass}>
		{#each Object.values(ObjectEnum) as object}
			<li class={liClass}>
				<div class="flex items-center">
					<input
						id="object-{object}"
						type="radio"
						class="hidden peer"
						bind:group={$selectedObjectStore}
						name="objects"
						value={object}
					/>
					<label for="object-{object}" class="{labelClass} {labelCheckedClass}">
						{object}
					</label>
				</div>
			</li>
		{/each}
	</ul>
</div>
<div id="material_palette" class="mt-3">
	<div class="text-sm font-bold pb-3 pl-1">Select Material</div>
	<ul class={ulClass}>
		{#each allowedMaterials as material}
			<li class={liClass}>
				<div class="flex items-center">
					<input
						id="material-{material}"
						type="radio"
						class="hidden peer"
						bind:group={$selectedMaterialStore}
						name="materials"
						value={material}
					/>
					<label for="material-{material}" class="{labelClass} {labelCheckedClass}">
						<img
							class="w-6 h-6 mr-3"
							src={$textureImageStore[`${$selectedObjectStore}_${material}`]}
							alt={material}
						/>

						{material}
					</label>
				</div>
			</li>
		{/each}
	</ul>
</div>
