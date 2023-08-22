<script>
	import { APP_NAME } from '$lib/constants';
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';

	let navClass = 'bg-slate-800 border-gray-200 px-4 lg:px-6 py-2.5';
	let navDivClass = 'flex flex-wrap justify-between items-center mx-auto max-w-screen-xl';
	let nonActiveClass =
		'text-gray-200 hover:text-white hover:underline hover:decoration-red-500 hover:underline-offset-4 hover:decoration-dotted';
</script>

<header class="border-b border-b-slate-800 max-h-[4rem] min-h-[4rem] lg:pt-2 bg-slate-800">
	<Navbar let:hidden let:toggle fluid={false} color="transparent" {navClass} {navDivClass}>
		<NavBrand href="/">
			<!-- <img
        src="/images/logo.svg"
        class="mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      /> -->
			<span class="self-center whitespace-nowrap text-xl font-semibold text-white">
				{APP_NAME} Insurance Automata
			</span>
		</NavBrand>
		<div class="flex items-center lg:order-2">
			<NavHamburger
				on:click={toggle}
				btnClass="text-white inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			/>
		</div>
		<NavUl
			{hidden}
			divClass="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
			ulClass="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
			{nonActiveClass}
		>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>
