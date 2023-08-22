<script>
	import Icon from '@iconify/svelte';

	export let tip;
	export let texture;
</script>

<div class="shadow-md mb-4 bg-slate-50 rounded-lg flex flex-row pl-2 h-20 items-center">
	<img src={texture} class="w-16 h-16 rounded-lg" />
	<p class="ml-4 text-sm flex-grow pr-4">
		{@html tip}
	</p>
	<div class="w-16 h-full rounded-r-lg">
		<Icon icon="twemoji:light-bulb" class="mx-auto mt-4 w-12 h-12 text-white" />
	</div>
</div>