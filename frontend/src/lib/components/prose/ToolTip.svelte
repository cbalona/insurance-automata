<script>
	export let text = '';
</script>

<span class="relative group">
	<slot />
	<div
		class="pointer-events-none absolute -top-7 -left-10 hidden -mt-20 w-[300px] p-2 text-sm bg-gray-800 text-white rounded-md group-hover:block"
	>
		{text}
	</div>
</span>

<style>
	span:hover div {
		display: block;
	}
</style>
