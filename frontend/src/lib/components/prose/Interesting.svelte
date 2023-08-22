<script>
	import Icon from '@iconify/svelte';

	export let note;
</script>

<div class="shadow-md my-4 bg-slate-50 rounded-lg flex flex-row pl-2 h-20 items-center">
	<div class="w-16 h-full rounded-r-lg">
		<Icon icon="twemoji:thinking-face" class="mx-auto mt-4 w-12 h-12 text-white" />
	</div>
	<p class="ml-4 text-sm flex-grow pr-4">
		{@html note}
	</p>
</div>