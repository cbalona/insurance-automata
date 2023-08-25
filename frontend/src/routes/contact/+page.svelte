<script>
	import cb from '$lib/assets/cb.jpg';

	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<div class="flex flex-col items-center">
	<article class="prose lg:prose-xl prose-slate mx-auto prose-img:m-0 mb-6">
		<p>
			Insurance Automata was built by <a href="https://www.linkedin.com/in/cbalona/"
				>Caesar Balona</a
			>
			for the
			<a href="https://www.casact.org/article/2023-cas-hacktuary-challenge-hack-back"
				>2023 CAS Hacktuary.</a
			>
		</p>
	</article>

	<div
		class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 w-1/2"
	>
		<a href="https://www.linkedin.com/in/cbalona/">
			<img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={cb} alt="Caesar Avatar" />
		</a>
		<div class="p-5">
			<h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				<a href="https://modernactuary.co.za">Caesar Balona</a>
			</h3>
			<span class="text-gray-500 dark:text-gray-400">Modern Actuary</span>
			<p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
				Caesar is an actuary with a passion for using programming and data science to modernise the
				actuarial toolkit. He is a Fellow of the Actuarial Society of South Africa.
			</p>
			<ul class="flex space-x-4 sm:mt-0">
				<li>
					<a
						href="https://www.linkedin.com/in/cbalona/"
						class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
					>
						<Icon icon="mdi:linkedin" class="w-5 h-5" />
					</a>
				</li>
				<li>
					<a
						href="https://github.com/cbalona"
						class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"
							><path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/></svg
						>
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>
