<script>
	import { enableMapSet } from 'immer';
	enableMapSet();

	import '../app.css';

	import { Header, Sidebar, Footer } from '$lib';
</script>

<div class="flex flex-col h-full">
	<Header />
	<div class="flex flex-grow min-w-[60rem]">
		<Sidebar />
		<main class="w-full p-4 overflow-y-scroll max-h-[calc(100vh-8rem)]"><slot /></main>
	</div>
	<Footer />
</div>
