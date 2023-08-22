<script>
	import Interesting from '$lib/components/prose/Interesting.svelte';
	import TableOfContents from '$lib/components/prose/TableOfContents.svelte';
	import Learned from '$lib/components/prose/Learned.svelte';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import Katex from '$lib/components/Katex.svelte';

	onMount(() => {
		const ctx = document.getElementById('fire-sources');
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Stove', 'Heater', 'Barbecue', 'Fireplace', 'Candle'],
				datasets: [
					{
						label: 'Derived Probability',
						data: [63, 12, 8, 8, 8],
						backgroundColor: ['rgba(255, 0, 0, 1)'],
						borderWidth: 1
					}
				]
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				scales: {
					x: {
						beginAtZero: true,
						ticks: {
							callback: function (value, index, values) {
								return value + '%';
							}
						}
					}
				},
				plugins: {
					tooltip: {
						enabled: true,
						callbacks: {
							label: function (context) {
								var label = context.dataset.label || '';

								if (label) {
									label += ': ';
								}
								if (context.parsed.y !== null) {
									label += context.parsed.x + '%';
								}
								return label;
							}
						}
					}
				}
			}
		});
	});
</script>

<svelte:head>
	<title>Engine</title>
</svelte:head>

<article class="prose lg:prose-xl prose-slate mx-auto prose-img:m-0">
	<h1>Insurance Automata Engine</h1>

	<TableOfContents />

	<h2>Introduction</h2>

	<h3>Overview of the App</h3>
	<p>
		Insurance Automata uses a cellular automata model to simulate the spread of fire across a house.
		The app allows users to place objects within a virtual house and observe how a fire might spread
		under various conditions. This guide provides an explanation of the parameterization process
		used in the underlying logic. It covers the data sources and methods used to determine the
		frequency of fires, the probability of different fire sources, and the simulation of fire
		spread. Additionally, the guide explains how the values of objects and the parameters for fire
		spread were determined.
	</p>
	<p>
		By providing a detailed overview of the parameterization process, this guide helps users
		understand the underlying mechanics of the simulation and the factors that influence the
		simulation results. It also serves as a valuable resource for those interested in developing
		similar simulation tools or forking and altering this tool.
	</p>

	<h2>Data Collection</h2>

	<h3>Data Sources for Fire Frequency</h3>
	<p>
		The frequency of fires in the simulation is based on data provided by the National Fire
		Protection Association (NFPA). The NFPA is a reputable organization that conducts extensive
		research on fire safety and provides valuable data on fire incidents, including their frequency
		and causes. By utilizing this data, the simulator can accurately reflect real-world fire
		occurrence patterns.
	</p>
	<p>
		To calculate the frequency of house fires, the simulator uses data from the NFPA and the U.S.
		Census Bureau. The NFPA reports that there were an average of 343,100 house fires annually
		between 2016 and 2020. The U.S. Census Bureau provides data on the number of housing units in
		the United States for each year. By dividing the mean annual number of fires by the average
		number of housing units between 2016 and 2020, the simulator calculates the fire frequency.
	</p>

	<Katex
		math={`
		\\begin{aligned}
			\\text{Fire Frequency} &= \\frac{\\text{Mean Annual Number of Fires}}{\\text{Average Number of Housing Units}} \\\\
			&= \\frac{343,100}{137,903,501} \\\\
			&= 0.00249 \\\\
			&\\approx 0.0025\\
		\\end{aligned}
		`}
	/>

	<h3>Data Sources for Fire Source Probability</h3>
	<p>
		The probability of different fire sources in the simulation is also derived from data provided
		by the NFPA. This data includes information on the likelihood of fires starting from various
		sources, such as stoves, heaters, candles, barbecues, fireplaces, and lightning strikes. By
		incorporating this data, the simulator can realistically model the chances of fires originating
		from different sources.
	</p>
	<p>
		The simulator uses the FEMA U.S. Fire Administration National Fire Incident Reporting System
		(NFIRS) dataset to determine the probability of different fire sources. The dataset categorizes
		fire causes into codes, which are then mapped to specific sources in the simulator. For example,
		the "Cooking" cause code is mapped to the "Stove" source, the "Heating" cause code is mapped to
		the "Heater" source, and the "Open Flame" cause code is mapped to the "Barbecue", "Fireplace",
		and "Candle" sources.
	</p>

	<canvas id="fire-sources" />
	<figcaption class="mb-8">
		Probability of fire originating from different fire sources based on data from the NFPA.
	</figcaption>

	<p>
		In addition, there is a 1% chance of a lightning strike causing a fire. This probability is not
		based on data from the NFPA.
	</p>

	<Interesting
		note="Refer to the <em>fire_params.ipynb</em> notebook in the <em>assets</em> directory of the source
		code for the full (albeit short) analysis of the fire frequency and fire source probability."
	/>

	<h3>Amount of Data and Analysis</h3>
	<p>
		One may be surprised by the small amount of data used to determine the fire frequency and fire
		source probability, as well as the basic nature of the analysis. However, the data is sufficient
		for the purposes of the simulator. It simply needs to simulate the occurence of a fire and the
		ignition source. Of course, this could be based on a much more complicated model, accounting for
		weather, time of day, usage, age of appliances, and other factors. However, such a model would
		be overkill for the purposes of this simulator. The goal is to provide a simple demonstration of
		how a fire might spread in a house, not to create a complex model that accounts for every
		possible factor.
	</p>
	<p>
		With the advent of big data and advanced machine learning, it is easy to forget that simple
		statistical analysis can still be useful and not every problem requires a massive dataset and
		advanced algorithms.
	</p>

	<h2>Fire Frequency Simulation</h2>

	<h3>Overview of the Poisson Process</h3>
	<p>
		The Poisson process is a mathematical model used to describe events that occur randomly and
		independently over time. It is characterized by a single parameter, λ (lambda), which represents
		the average rate of events per unit of time. In the context of the simulator, the Poisson
		process is used to model the occurrence of fires, where λ represents the average fire frequency
		derived above.
	</p>

	<h3>Calculating Fire Frequency</h3>
	<p>
		The simulator calculates the fire frequency by generating Poisson random variables based on the
		average fire frequency parameter, λ. It continues generating these random variables until their
		sum reaches the specified number of fires to simulate. This approach is used because the
		simulator only simulates when a fire occurs. For example, if the simulator is set to run 10
		simulations, it will generate Poisson random variables until it accumulates a total of 10 fires.
		The simulator then calculates the mean of the sum of the random variables divided by the number
		of random variables generated. This mean represents the simulated fire frequency, providing an
		estimate of the average number of fires that occur in a given time period.
	</p>

	<Interesting
		note="The code for calculating the fire frequency is located in the <em>lib.rs</em> file in
		the <em>wasm/simulation-engine/src</em> directory of the source code."
	/>

	<h2>Cellular Automata Basics</h2>
	<p>
		Cellular automata are mathematical models used to simulate complex systems by dividing them into
		a grid of cells. Each cell can be in one of a finite number of states, and the state of each
		cell at a given time step is determined by the states of its neighboring cells and a set of
		rules. Cellular automata are particularly well-suited for simulating phenomena that evolve over
		time and space, such as the spread of fire.
	</p>
	<p>
		In the context of the fire spread simulation, the cellular automata model divides the virtual
		house into a grid of cells. Each cell represents a small area of the house. The state of each
		cell at each time step is determined by the states of its neighboring cells and a set of rules
		that govern how fire spreads from one cell to another.
	</p>
	<p>
		The cellular automata model allows the simulator to capture the spatial and temporal dynamics of
		fire spread. It provides a simple yet powerful framework for modeling the complex interactions
		between different parts of the house as the fire spreads.
	</p>
	<h2>The Grid</h2>

	<p>
		The grid represents the house and is the basis of the cellular automata model used to simulate
		the spread of fire. It is a two-dimensional array of cells, where each cell represents a small
		area of the house.
	</p>

	<h3>What is a Cell</h3>

	<h4>Contents of Cell</h4>
	<p>
		Each cell in the simulation represents a 1x1x3 volume within the virtual house. The cell is
		divided into three sections: top, middle, and bottom. The top section represents the roof, while
		the middle and bottom sections represent the contents of the cell. The roof is always the same
		volume and material for all cells and is not modeled directly. If the cell is burning and is
		part of the structure, it is assumed that the roof is burning too. The floor cells burn based on
		the roof, and the cost is calculated using a constant roof value. The contents of the cell are
		assumed to have some volume made of wood, representing furniture and other items.
	</p>
	<p>Each cell holds the following information:</p>
	<ul>
		<li>
			<strong>Coordinates:</strong> The cell's position in the simulation grid, represented by the
			<code>x</code>
			and <code>y</code> coordinates.
		</li>
		<li><strong>Object:</strong> The structural component of the cell, such as a wall or floor.</li>
		<li><strong>Material:</strong> The material of the object, such as wood or tile.</li>
		<li><strong>Temperature:</strong> The current temperature of the cell in Kelvin.</li>
		<li>
			<strong>Initial Fuel:</strong> The initial amount of fuel in the cell, calculated based on the
			object's volume and the material's density.
		</li>
		<li><strong>Fuel:</strong> The current amount of fuel in the cell.</li>
		<li>
			<strong>Is Burning:</strong> A boolean value indicating whether the cell is currently burning.
		</li>
		<li><strong>Proportion Burned:</strong> The proportion of the cell that has been burned.</li>
		<li>
			<strong>Value:</strong> The value of the cell, calculated based on the object's and material's
			parameters, the roof value, and the contents value.
		</li>
		<li><strong>Item:</strong> An optional item within the cell, such as a stove or heater.</li>
		<li>
			<strong>Defence:</strong> An optional defence within the cell, representing a fire protection measure.
		</li>
	</ul>

	<h4>Object</h4>
	<p>
		The object in a cell represents the structural component of the cell, such as a wall or floor.
		Each object has a set of parameters that define its characteristics, including its volume, heat
		resistance, whether it contributes to the cost of the cell, and its base value. The object's
		parameters are defined in the <code>ObjectParamsMap</code>.
	</p>
	<p>The following objects are available in the simulation:</p>
	<ul>
		<li>Earth</li>
		<li>Floor</li>
		<li>Wall</li>
		<li>Door</li>
		<li>Window</li>
	</ul>
	<p>
		Each object can be made of different materials, which are defined in the <code
			>AllowedMaterialsMap</code
		>. For example, a wall can be made of brick or wood, while a floor can be made of wood, tiles,
		or carpet.
	</p>

	<h4>Material</h4>
	<p>
		The material in a cell represents the material of the object, such as wood or tile. Each
		material has a set of parameters that define its characteristics, including its density, fuel
		consumption rate, heat value, specific heat, combustion point, heat decrease rate, and base
		value multiplier. These parameters affect the behavior of the cell during the simulation,
		including how quickly the fire spreads and how much heat is generated.
	</p>
	<p>The following materials are available in the simulation:</p>
	<ul>
		<li><strong>Dirt:</strong> Represents the ground.</li>
		<li><strong>Grass:</strong> Represents the grass on the ground.</li>
		<li><strong>Wood:</strong> Represents wooden objects, such as walls and floors.</li>
		<li><strong>Brick:</strong> Represents brick walls.</li>
		<li>
			<strong>Tiles:</strong> Represents tiled floors. Tiles and carpet are considered under roof floor
			materials, so they are given wood's values as it is assumed the roof is burning and made of wood.
		</li>
		<li><strong>Carpet:</strong> Represents carpeted floors.</li>
		<li><strong>Metal:</strong> Represents metal objects, such as doors.</li>
		<li><strong>Glass:</strong> Represents glass windows.</li>
	</ul>
	<p>
		Each material's parameters affect the cell's behavior during the simulation. For example, the
		density of the material affects the initial fuel in the cell, while the fuel consumption rate
		affects how quickly the fuel is consumed. The heat value and specific heat determine how much
		heat is generated and absorbed by the material, while the combustion point determines the
		temperature at which the material ignites. The heat decrease rate affects how quickly the
		temperature decreases, and the base value multiplier affects the value of the cell.
	</p>

	<h4>Item</h4>
	<p>
		An item in a cell represents a specific object within the cell, such as a stove or heater. Items
		can be added to a cell and have their own parameters, which can affect the cell's behavior
		during the simulation. Items are optional and can be added or removed from a cell as needed.
	</p>

	<h4>Defence</h4>
	<p>
		A defence in a cell represents a fire protection measure, such as a sprinkler system or
		fire-resistant material. Defences can be added to a cell and have their own parameters, which
		can affect the cell's behavior during the simulation. Defences are optional and can be added or
		removed from a cell as needed.
	</p>

	<h4>Item</h4>
	<p>
		An item in a cell represents a specific object within the cell that can potentially ignite and
		start a fire. Each item has a set of parameters that define its characteristics, including its
		name, fire probability, and value. The item's parameters affect the behavior of the cell during
		the simulation, including the likelihood of the item igniting and starting a fire.
	</p>
	<p>The following items are available in the simulation:</p>
	<ul>
		<li>Stove</li>
		<li>Heater</li>
		<li>Candle</li>
		<li>Fireplace</li>
		<li>Barbecue</li>
	</ul>

	<h4>Defence</h4>
	<p>
		A defence in a cell represents a fire protection measure that can help prevent or mitigate the
		spread of fire. Each defence has a set of parameters that define its characteristics, including
		its name, fuel reduction rate, max temperature, alerted status, radius of effect, response time,
		remaining uses, and chance of failure. The defence's parameters affect the behavior of the cell
		during the simulation, including how effectively the defence can prevent or mitigate the spread
		of fire.
	</p>
	<p>The following defences are available in the simulation:</p>
	<ul>
		<li>Extinguisher</li>
		<li>Sprinkler</li>
		<li>Blanket</li>
		<li>Detector</li>
	</ul>
	<p>
		Each defence's parameters affect the cell's behavior during the simulation. The fuel reduction
		rate of the defence determines how effectively the defence can reduce the fuel in the cell. The
		max temperature of the defence determines the maximum temperature at which the defence can
		operate effectively. The alerted status of the defence indicates whether the defence has been
		alerted to the presence of fire. The radius of effect of the defence determines the area around
		the defence that is affected by its actions. The response time of the defence determines how
		quickly the defence can respond to the presence of fire. The remaining uses of the defence
		indicate how many times the defence can be used before it is depleted. The chance of failure of
		the defence determines the likelihood of the defence failing to operate effectively.
	</p>

	<h2>Fire Simulation Process</h2>
	<p>This section describes the process used by the simulator to simulate a fire.</p>
	<h3>Determining the Initial Fire Source</h3>
	<p>
		The simulator determines the initial fire source by randomizing the ignition point among a set
		of predefined ignition sources. Each ignition source has an associated probability of ignition,
		which represents the likelihood of that source being the initial point of the fire. This is what
		the fire source probability data from the NFPA is used for.
	</p>
	<p>
		First, the simulator adds a random chance of a lightning strike as an ignition source. It
		generates random coordinates within the simulation grid to represent the location of the
		lightning strike. The probability of a lightning strike is set to 0.01, or 1%.
	</p>
	<p>
		The simulator then shuffles the ignition sources, including the lightning strike, to randomize
		the order in which they are considered. It loops through the shuffled ignition sources and
		generates a random number between 0 and 1 for each source. If the random number is less than the
		ignition probability of the source, that source is selected as the initial fire source, and the
		loop is terminated.
	</p>
	<p>
		This process ensures that the initial fire source is determined randomly based on the
		probabilities of the different ignition sources. It allows the simulator to model the
		unpredictability of real-world fire ignition scenarios.
	</p>

	<h3>Fire Spread Rules</h3>
	<p>
		The simulation progresses in discrete steps, and during each step, the state of each cell is
		updated based on its current state and the states of its neighboring cells.
	</p>
	<p>The simulation follows these steps:</p>
	<ol>
		<li>
			For each cell that has been altered in the previous step, the cell undergoes self-interaction,
			which updates its state based on its current properties.
		</li>
		<li>
			The cell's neighbors are identified, and the impact of the neighbors on the cell is
			calculated. The cell's state is updated based on the states of its neighbors.
		</li>
		<li>
			The impact of the cell on its neighbors is calculated. The states of the neighboring cells are
			updated based on the state of the cell.
		</li>
		<li>
			If the cell has a defence, such as a sprinkler or fire extinguisher, the defence is checked
			for its alert status, readiness, and remaining uses. If the defence is ready and has remaining
			uses, it responds to the fire in the neighboring cells by reducing their fuel based on the
			defence's fuel reduction rate.
		</li>
		<li>The cost of the fire is calculated based on the states of the cells.</li>
	</ol>
	<p>
		The simulation continues in this manner, updating the states of the cells and calculating the
		cost of the fire at each step. The simulation ends when the loss of value has not changed for 10
		steps, or at 1,000 steps.
	</p>

	<h4>Self Interaction</h4>
	<p>
		The self interaction of a cell is a crucial part of the simulation process. It determines how a
		cell behaves based on its current state, including its temperature, fuel, and whether it is
		burning. The self interaction process follows these steps:
	</p>
	<ol>
		<li>
			First, the cell checks its remaining fuel. If the fuel is depleted (fuel &lt;= 0), the cell
			cools down.
		</li>
		<li>
			Next, the cell checks its temperature and whether it is already burning. If the temperature is
			greater than or equal to the combustion point of the material and the cell is not already
			burning, the cell ignites.
		</li>
		<li>
			If the cell is burning and still has fuel, it continues to burn. The burning process updates
			the cell's temperature and fuel based on the material's properties.
		</li>
	</ol>
	<p>
		The self interaction process is repeated for each cell in the simulation at every step. It
		ensures that the cells behave realistically based on their current states and the properties of
		the materials they are made of.
	</p>

	<h4>Neighbor Interaction</h4>
	<p>
		The interaction between neighboring cells is another essential aspect of the simulation process.
		It determines how a cell is affected by its neighbors and how it affects them in return. The
		neighbor interaction process follows these steps:
	</p>
	<ol>
		<li>
			First, the cell checks if it is already burning. If it is, the interaction process is skipped
			for this cell.
		</li>
		<li>
			Next, the cell retrieves the parameters of the object it represents, including its heat
			resistance.
		</li>
		<li>The cell calculates the temperature difference between itself and its neighbor.</li>
		<li>
			If the temperature difference is positive (the neighbor is hotter than the cell), the cell
			calculates the heat transfer based on the temperature difference, a constant heat transfer
			rate, and the inverse square of the distance between the cells.
		</li>
		<li>
			The cell updates its temperature based on the calculated heat transfer and its heat
			resistance.
		</li>
	</ol>
	<p>
		The neighbor interaction process is repeated for each cell and its neighbors in the simulation
		at every step. It ensures that the cells interact with each other and spread heat realistically
		based on their current states and the properties of the objects they represent.
	</p>

	<h4>Defence</h4>
	<p>
		The defense mechanism in the simulation is responsible for mitigating the spread of fire. It is
		implemented in the form of defense parameters associated with each cell. The defense process
		follows these steps:
	</p>
	<ol>
		<li>
			First, the cell checks if the defense is out of uses. If it is, the defense process is skipped
			for this cell.
		</li>
		<li>
			Next, the cell checks if the defense has an unlimited radius. If it does, the defense is
			immediately alerted.
		</li>
		<li>
			The cell retrieves the neighbors within the defense's radius of effect. It checks if any of
			these neighbors are burning. If any are, the defense is alerted.
		</li>
		<li>
			If the defense is not alerted, the cell updates its state and continues to the next step in
			the simulation.
		</li>
		<li>
			If the defense is alerted, it checks if it is ready to respond. If the defense has a response
			time greater than zero, it decrements the response time and updates the cell's state.
		</li>
		<li>
			Once the defense is ready to respond, it iterates over each neighbor within its radius of
			effect. If the neighbor is burning and its temperature is below the defense's maximum
			temperature, the defense checks if it fails based on a random number and its chance of
			failure. If it fails, the defense's remaining uses are decremented. If it succeeds, the
			neighbor's fuel is reduced based on the defense's fuel reduction rate.
		</li>
	</ol>
	<p>
		The defense process is repeated for each cell with defense parameters in the simulation at every
		step. It ensures that the cells interact with each other and mitigate the spread of fire based
		on their current states and the properties of the defense mechanisms they have.
	</p>

	<h4>Termination</h4>
	<p>
		The simulation continues to run until a termination condition is met. The termination condition
		is based on the cost values calculated at each step of the simulation. The simulation checks the
		last 10 cost values and determines if they have converged, meaning that the difference between
		consecutive cost values is less than 0.1. If the cost values have converged, the simulation
		terminates. However, this check is only performed after a minimum number of steps have been
		completed to ensure that the simulation runs for a sufficient amount of time.
	</p>
	<p>
		The termination condition ensures that the simulation stops once the fire has reached a steady
		state, and further simulation steps would not provide any additional insights. By checking the
		convergence of the cost values, the simulation can efficiently determine when to stop running
		and provide the final results.
	</p>

	<h2>Determining Fire Spread Parameters and Object Values</h2>
	<p>
		Fire spread parameters are crucial for accurately simulating the behavior of a fire. These
		parameters influence factors such as the rate of fire spread and the intensity of the fire. I
		determined the intensity of the fire through research and online searches to populate reasonable
		estimates of the parameters. However, fire simulation is a complex topic, and there is no
		one-size-fits-all solution. The parameters I chose are based on my research and are not
		guaranteed to be accurate for all situations.
	</p>

	<p>
		Above we saw that the each cell defines properties for objects, including volume and heat
		resistance. Properties for materials include density, fuel consumption rate, heat value,
		specific heat, combustion point, and heat decrease rate.
	</p>

	<p>
		For example, the <code>Wood</code> material has a density of 500.0 kg/m³, a fuel consumption rate
		of 1%/step, a heat value of 15,000 J/kg, a specific heat of 2,000 J/kg·K, a combustion point of 573.0
		K (300.0°C) and a heat decrease rate of 5%/step.
	</p>

	<p>
		These parameters are used to simulate the behavior of a fire as it spreads through a space,
		taking into account the properties of the objects and materials involved. However, it is
		important to note that the simulation is a simplified representation of fire spread, and the
		parameters used are only indicative.
	</p>

	<p>
		Object values represent the estimated monetary value of objects within the simulation, such as
		furniture, appliances, and structural elements. These values are used to calculate the total
		loss incurred in the event of a fire.
	</p>

	<p>
		To determine object values, I used online searches to find the average cost per square foot of
		various objects and structural elements. I then converted these values to cost per square meter
		for consistency within the simulation. It is important to note that these values are only
		indicative and should not be relied upon for actual financial assessments. In a more realistic
		simulation, object values would be provided by the user based on their specific circumstances
		and property.
	</p>

	<p>
		It is essential to emphasize that the object values used in this simulation are only for
		illustrative purposes. In a real-world scenario, object values would be determined based on a
		variety of factors, including the specific materials used, the age and condition of the objects,
		and their location within the property.
	</p>

	<p>
		Ultimately, the object values used in this simulation serve as a starting point for
		understanding the potential financial consequences of a fire. However, they should not be used
		as a substitute for a comprehensive assessment of property value and potential loss in the event
		of a fire. <strong
			>Their primary purpose is to show the impact of including fire defense mechanisms in the
			simulation.</strong
		>
	</p>

	<h2>Conclusion</h2>
	<h3>Summary of the Guide</h3>
	<p>
		Insurance Automata is an app that uses a cellular automata model to simulate the spread of fire
		across a house. This guide has provided a comprehensive overview of the parameterization process
		used in the app's underlying logic. It has covered the data sources and methods used to
		determine the frequency of fires, the probability of different fire sources, and the simulation
		of fire spread. Additionally, the guide has explained how the values of objects and the
		parameters for fire spread were determined.
	</p>

	<p>
		By utilizing data from reputable sources such as the NFPA and the U.S. Census Bureau, the
		simulator accurately reflects real-world fire occurrence patterns. The app allows users to place
		objects within a virtual house and observe how a fire might spread under various conditions. The
		simulation process involves determining the initial fire source, spreading the fire using
		cellular automata, and calculating the cost of the fire based on the states of the cells.
	</p>

	<p>
		The guide has also discussed the properties of cells in the simulation, including their
		coordinates, object, material, temperature, fuel, burning status, proportion burned, value,
		item, and defence. The parameters associated with objects, materials, items, and defences have
		been explained, and their impact on the simulation has been discussed.
	</p>

	<p>
		It is important to note that the simulation is a simplified representation of fire spread, and
		the parameters used are only indicative. The object values used in the simulation are also for
		illustrative purposes and should not be relied upon for actual financial assessments.
	</p>

	<h3>Future Work and Improvements</h3>
	<p>
		While the current version of Insurance Automata provides a valuable tool for simulating the
		spread of fire in a house, there are several areas where future work and improvements could
		enhance the app's functionality and realism. These include:
	</p>

	<ul>
		<li>
			<strong>Expanding the Data Sources:</strong> Incorporating additional data sources and more detailed
			fire statistics could improve the accuracy of the fire frequency and fire source probability calculations.
		</li>
		<li>
			<strong>Enhancing the Simulation Model:</strong> Incorporating more complex fire spread models,
			such as those that account for weather, time of day, usage, age of appliances, and other factors,
			could provide a more realistic simulation of fire spread.
		</li>
		<li>
			<strong>Improving the User Interface:</strong> Enhancing the user interface to allow for more customization
			of the simulation parameters, object placement, and fire defence mechanisms could provide a more
			interactive and user-friendly experience.
		</li>
		<li>
			<strong>Adding More Objects and Materials:</strong> Expanding the list of available objects, materials,
			items, and defences could provide a more comprehensive simulation of a house and its contents.
		</li>
		<li>
			<strong>Conducting Validation Studies:</strong> Comparing the simulation results with real-world
			fire incidents could help validate the accuracy of the simulation model and identify areas for
			improvement.
		</li>
	</ul>

	<p>
		By addressing these areas, future versions of Insurance Automata could provide an even more
		powerful and realistic tool for simulating the spread of fire in a house and understanding the
		potential consequences of a fire.
	</p>
</article>

<style>
	body {
		counter-reset: section subsection;
	}

	h2::before {
		content: counter(section) '. ';
	}

	h2 {
		counter-increment: section;
		counter-reset: subsection subsubsection;
	}

	h3::before {
		content: counter(section) '.' counter(subsection) ' ';
	}

	h3 {
		counter-increment: subsection;
		counter-reset: subsubsection;
	}

	h4::before {
		content: counter(section) '.' counter(subsection) '.' counter(subsubsection) ' ';
	}

	h4 {
		counter-increment: subsubsection;
	}

	figcaption {
		font-size: 0.75rem;
		text-align: center;
	}

	figcaption::before {
		counter-increment: figure;
		content: 'Figure ' counter(figure) ': ';
	}
</style>
