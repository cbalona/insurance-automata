<script lang="ts">
	import { Card, Tabs, TabItem } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	import StructurePalette from '$lib/components/sim-sidebar/StructurePalette.svelte';
	import ContentPalette from '$lib/components/sim-sidebar/ContentPalette.svelte';
	import OptionsTab from '$lib/components/sim-sidebar/Options.svelte';
	import Templates from './Templates.svelte';

	let tabDefaultClass = 'inline-block text-sm font-medium text-center disabled:cursor-not-allowed';
</script>

<div
	class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex flex-col p-4 sm:p-6 max-h-[38.5rem] overflow-y-auto min-w-[17rem] max-w-[17rem]"
>
	<Tabs defaultClass="flex flex-wrap">
		<TabItem open defaultClass={tabDefaultClass}>
			<div slot="title">
				<Icon icon="bi:house-fill" width="20" />
			</div>
			<StructurePalette />
		</TabItem>
		<TabItem defaultClass={tabDefaultClass}>
			<div slot="title">
				<Icon icon="solar:chair-bold" width="20" />
			</div>
			<ContentPalette />
		</TabItem>
		<TabItem defaultClass={tabDefaultClass}>
			<div slot="title">
				<Icon icon="mdi:floor-plan" width="20" />
			</div>
			<Templates />
		</TabItem>
		<TabItem defaultClass={tabDefaultClass}
			><div slot="title">
				<Icon icon="material-symbols:save" width="20" />
			</div>
			<OptionsTab />
		</TabItem>
	</Tabs>
</div>
