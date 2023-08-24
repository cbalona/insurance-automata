<!-- Modal toggle -->
<script>
	import { APP_NAME } from '$lib/constants';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let showModal = true; // Initially set to true to display modal on page load

	function close() {
		showModal = false;
		dispatch('close');
	}
</script>

<!-- Main modal -->
<div
	id="defaultModal"
	class:bundled={!showModal}
	class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 transition-opacity duration-300 {showModal
		? 'opacity-100'
		: 'opacity-0 pointer-events-none'}"
>
	<div class="relative w-full max-w-2xl max-h-full">
		<!-- Modal content -->
		<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
			<!-- Modal header -->
			<div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
					{APP_NAME} Welcome to Insurance Automata !
				</h3>
				<button
					type="button"
					class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
					data-modal-hide="defaultModal"
          on:click={close}
				>
					<svg
						class="w-3 h-3"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
						/>
					</svg>
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<!-- Modal body -->
			<div class="p-6 space-y-6 text-gray-500">
				<p class="text-base leading-relaxed dark:text-gray-400">
					<strong
						>Please note this website is best viewed on a desktop or laptop computer with a minimum
						resolution of 1920x1080.</strong
					>
				</p>
				<p class="text-base leading-relaxed dark:text-gray-400">
					Insurance Automata is an interactive application that simulates the spread of fire across
					a house using a cellular automata model. The app allows users to place objects within a
					virtual house and observe how a fire might spread under various conditions.
				</p>

				<p class="text-base leading-relaxed dark:text-gray-400">
					<strong>How to use:</strong>
				</p>

				<div class="grid grid-cols-2 !mt-2">
					<span
						><Icon icon="bi:house-fill" width="20" class="inline mr-2 text-gray-600" />Structural
						objects.</span
					>
					<span
						><Icon icon="solar:chair-bold" width="20" class="inline mr-2 text-gray-600" />Items and
						fire defense objects.</span
					>
					<span
						><Icon icon="mdi:floor-plan" width="20" class="inline mr-2 text-gray-600" />Pre-made
						floor plans.</span
					>
					<span
						><Icon icon="material-symbols:save" width="20" class="inline mr-2 text-gray-600" />Save
						and load floor plans.</span
					>
				</div>

				<p>
					Click within the floor plan to place objects. Click and drag to place multiple objects at
					once. Click run to start the simulation and watch the fire spread by dragging the slider.
					Click reset to reset the simulation. Click clear to clear the floor plan.
				</p>

				<p>For more information, see the side bar on the left.</p>

				<p>
					<strong>Disclaimer:</strong> This application is for educational purposes only. It is not intended
					to be used for any other purpose. The authors of this application are not responsible for any
					damages or losses that may occur as a result of using this application.
				</p>
			</div>
		</div>
	</div>
</div>
