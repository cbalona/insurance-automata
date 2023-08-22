<script>
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col rounded-md border-2 shadow-md mx-4">
	<div class="flex flex-row items-center bg-slate-700 rounded-t-md">
		<Icon icon="dashicons:welcome-learn-more" class="w-16 h-16 mr-36 ml-4 mt-1 mb-2 text-red-500" />
		<div class="font-semibold text-xl text-white">What we've learned so far</div>
	</div>

	<div class="mr-8"><slot /></div>
</div>
