<script>
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

	import Icon from '@iconify/svelte';
	import { statusStore } from '$lib/store';
	import { onDestroy } from 'svelte';

	// Reset the store every 5 seconds (5000 milliseconds)
	const intervalId = setInterval(() => statusStore.set(''), 2000);
	let showStatus = false;

	$: {
		if ($statusStore === '') {
			showStatus = false;
		}
	}

	// Clear the interval when the component is destroyed
	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<Sidebar asideClass="w-64 shadow-md bg-gray-50 flex flex-col">
	<SidebarWrapper class="flex flex-col">
		<SidebarGroup>
			<SidebarItem label="Simulator" href="/" spanClass="ml-3 font-semibold">
				<svelte:fragment slot="icon">
					<Icon icon="mingcute:fire-fill" class="w-8 h-8 text-red-600" />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Fire Insurance" href="/guide" spanClass="ml-3 font-semibold">
				<svelte:fragment slot="icon">
					<Icon icon="ic:round-help" class="w-8 h-8 text-red-600" />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Technology" href="/technology" spanClass="ml-3 font-semibold">
				<svelte:fragment slot="icon">
					<Icon icon="ph:code-bold" class="w-8 h-8 text-red-600" />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Engine" href="/engine" spanClass="ml-3 font-semibold">
				<svelte:fragment slot="icon">
					<Icon icon="mdi:engine" class="w-8 h-8 text-red-600" />
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
	<div class="mx-2 px-2 py-4 mt-4 text-center font-semibold text-red-600">
		{$statusStore}
	</div>
</Sidebar>
