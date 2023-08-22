<script lang="ts">
	import { selectedItemStore, selectedDefenceStore, textureImageStore, selectedObjectStore } from '$lib/store';
	import { DefenceEnum, type DefenceName } from '$lib/classes/Defence';
	import { ItemEnum, type ItemName } from '$lib/classes/Item';

	let ulClass: string =
		'w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white';
	let liClass: string = 'w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600';
	let labelClass: string =
		'w-full py-3 pl-3 text-sm font-medium text-gray-900 dark:text-gray-300 flex flex-row';
	let labelCheckedClass: string =
		'dark:peer-checked:text-blue-500 peer-checked:shadow-lg peer-checked:font-bold cursor-pointer';

	$: if ($selectedItemStore) {
		selectedDefenceStore.set(null);
		selectedObjectStore.set(null);
	}
	$: if ($selectedDefenceStore) {
		selectedObjectStore.set(null);
		selectedItemStore.set(null);
	}
</script>

<div id="item_palette">
	<div class="text-sm font-bold pb-3 pl-1">Select Item</div>
	<ul class={ulClass}>
		{#each Object.values(ItemEnum) as item}
			<li class={liClass}>
				<div class="flex items-center">
					<input
						id="item-{item}"
						type="radio"
						class="hidden peer"
						bind:group={$selectedItemStore}
						name="items"
						value={item}
					/>
					<label for="item-{item}" class="{labelClass} {labelCheckedClass}">
						<img class="w-6 h-6 mr-3" src={$textureImageStore[`Item_${item}`]} alt={item} />
						{item}
					</label>
				</div>
			</li>
		{/each}
	</ul>
</div>
<div id="defence_palette" class="mt-3">
	<div class="text-sm font-bold pb-3 pl-1">Select Defence</div>
	<ul class={ulClass}>
		{#each Object.values(DefenceEnum) as defence}
			<li class={liClass}>
				<div class="flex defences-center">
					<input
						id="defence-{defence}"
						type="radio"
						class="hidden peer"
						bind:group={$selectedDefenceStore}
						name="defences"
						value={defence}
					/>
					<label for="defence-{defence}" class="{labelClass} {labelCheckedClass}">
						<img
							class="w-6 h-6 mr-3"
							src={$textureImageStore[`Defence_${defence}`]}
							alt={defence}
						/>
						{defence}
					</label>
				</div>
			</li>
		{/each}
	</ul>
</div>
