<script>
	import SimTip from '$lib/components/prose/SimTip.svelte';
	import Interesting from '$lib/components/prose/Interesting.svelte';
	import ToolTip from '$lib/components/prose/ToolTip.svelte';
	import TableOfContents from '$lib/components/prose/TableOfContents.svelte';

	import Item_Stove from '$lib/assets/textures/Item_Stove.png';
	import Item_Barbecue from '$lib/assets/textures/Item_Barbecue.png';
	import Item_Candle from '$lib/assets/textures/Item_Candle.png';
	import Item_Heater from '$lib/assets/textures/Item_Heater.png';
	import Item_Fireplace from '$lib/assets/textures/Item_Fireplace.png';

	import Defence_Blanket from '$lib/assets/textures/Defence_Blanket.png';
	import Defence_Extinguisher from '$lib/assets/textures/Defence_Extinguisher.png';
	import Defence_Sprinkler from '$lib/assets/textures/Defence_Sprinkler.png';
	import Defence_Detector from '$lib/assets/textures/Defence_Detector.png';

	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';

	const coverageDef =
		"This is the maximum amount of money your insurance company will pay for a particular loss or event. Once this limit is reached, you'll be responsible for any additional costs.";
	const deductibleDef =
		"This is the amount of money you agree to pay out-of-pocket before your insurance company starts to pay. For example, if you have a $1,000 deductible and $5,000 in damages, you'll pay the first $1,000, and your insurance will cover the remaining $4,000.";
	const premiumDef =
		'This is the amount you pay for your insurance policy. You can think of it like a subscription fee. You usually pay this amount monthly, quarterly, or annually to keep your insurance active.';

	onMount(() => {
		const ctx = document.getElementById('nfpa-fire-causes');
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Kitchen / Cooking', 'Bedroom', 'Outside', 'Chimney', 'Living Room'],
				datasets: [
					{
						label: 'Percentage of Fires',
						data: [44, 6, 5, 4, 3],
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
	<title>Guide to Fire Insurance</title>
</svelte:head>

<article class="prose lg:prose-xl prose-slate mx-auto prose-img:m-0">
	<h1>House Fires: Causes, Insurance, and Prevention</h1>

	<TableOfContents />

	<h2>Introduction</h2>

	<p>
		This guide serves to aid the user in understanding and managing their risk. Every year,
		countless families are affected by the devastating impact of house fires. These events can lead
		to the loss of homes, possessions, and even lives. While the idea of a house fire may seem
		distant or unlikely, it remains an ever-present danger in our daily lives. This guide is
		designed to provide you with valuable information on the primary causes of house fires, the
		importance and benefits of insurance, and actionable strategies to prevent or reduce the risk of
		fires in your home.
	</p>
	<p>
		House fires remain one of the leading causes of domestic tragedies globally. Despite advances in
		technology and increased awareness, the frequency of house fires remains alarmingly high.
		Several factors contribute to these incidents, from everyday activities such as cooking and
		heating to less frequent causes like electrical malfunctions or flammable liquids.
	</p>
	<p>
		Understanding the root causes of these fires and being proactive in taking preventative measures
		can significantly reduce the risk. Moreover, ensuring that one has adequate insurance coverage
		can offer solace in the unfortunate event of a fire, allowing families to rebuild and recover.
	</p>
	<p>
		In the following sections, we will delve deeper into these topics, offering insights and
		guidance to protect your home and loved ones. The knowledge you gain will not only empower you
		to make informed decisions but also pave the way for a safer living environment.
	</p>

	<h2>House Fires and Their Main Causes</h2>

	<h3>What is a House Fire?</h3>
	<p>
		A house fire refers to an uncontrolled fire that occurs in a residential setting. These fires
		can start in any part of the home, from the kitchen to the living room, garage, or even the
		attic. House fires can be triggered by various factors, including electrical malfunctions,
		cooking accidents, heating equipment, or careless smoking. Regardless of the cause, house fires
		can spread quickly, causing extensive damage to the property and posing a significant risk to
		the safety and well-being of the occupants. Rapid response and early firefighting efforts are
		crucial in limiting the damage and preventing injuries or fatalities.
	</p>

	<h3>Statistics on House Fires</h3>
	<p>
		House fires are a major concern worldwide. According to data from the <a
			href="https://www.nfpa.org/News-and-Research/Data-research-and-tools/Building-and-Life-Safety/Home-Structure-Fires"
			>National Fire Protection Association (NFPA)</a
		>, U.S. fire departments respond to an average of nearly 343,100 home fires each year, which
		result in thousands of injuries and fatalities. In addition, house fires cause billions of
		dollars in property damage annually. During the five year period from 2016 to 2020, more than
		one quarter of all fires reported in the U.S. were house fires., however, three-quarters of all
		fire-related deaths and injuries occurred in home fires.
	</p>
	<p>
		It's essential to note that cooking is the leading cause of house fires, followed by heating
		equipment, electrical and lighting equipment, and smoking. These statistics highlight the
		importance of being vigilant and taking precautions to prevent house fires and minimize the risk
		to our homes and families.
	</p>
	<canvas id="nfpa-fire-causes" />
	<figcaption class="mb-8">
		Leading areas of origin for home fires in the U.S. from 2016 to 2020 (<a
			href="https://www.nfpa.org/News-and-Research/Data-research-and-tools/Building-and-Life-Safety/Home-Structure-Fires"
			>NFPA</a
		>)
	</figcaption>

	<Interesting
		note="The simulator determines where it starts a fire based on data provided by the NFPA.
		Refer to the <a href='/engine'>engine page</a> for more information."
	/>

	<h3>Common Causes of House Fires</h3>

	<h4>Cooking Mishaps</h4>
	<p>
		Cooking is one of the leading causes of house fires. Unattended cooking or mishandling of
		kitchen appliances often leads to fires. Common scenarios include food left on the stove or in
		the oven for too long, flammable materials placed near the cooking area, or overheated cooking
		oil leading to grease fires. Always stay attentive while cooking and follow proper safety
		precautions in the kitchen.
	</p>

	<SimTip
		tip="Place the stove item to include the possibility of cooking fires in your simulation"
		texture={Item_Stove}
	/>
	<SimTip
		tip="Place the barbecue item to include the possibility of cooking fires in your simulation"
		texture={Item_Barbecue}
	/>

	<h4>Electrical Issues</h4>
	<p>
		Electrical malfunctions are another major cause of house fires. These can occur due to faulty
		wiring, overloaded electrical outlets, or the use of damaged appliances. To prevent electrical
		fires, ensure your home's wiring is up-to-date and avoid overloading circuits. Regularly inspect
		appliances for signs of wear or damage and replace any faulty equipment.
	</p>

	<h4>Heating Equipment</h4>
	<p>
		Heating equipment, such as space heaters, furnaces, and fireplaces, can pose a fire risk if not
		properly maintained or used safely. Keep flammable materials, like curtains or bedding, away
		from heating sources, and never leave heating equipment unattended. Regularly clean and inspect
		your heating devices to prevent malfunctions and potential fires.
	</p>

	<SimTip
		tip="Place the heater item to include the possibility of fires from heaters in your simulation"
		texture={Item_Heater}
	/>
	<SimTip
		tip="Place the fireplace item to include the possibility of fires from fireplaces in your simulation"
		texture={Item_Fireplace}
	/>

	<h4>Smoking Materials</h4>
	<p>
		Cigarettes, cigars, and other smoking materials can easily ignite fires when not properly
		extinguished. Avoid smoking indoors, especially near flammable materials or in areas with
		limited ventilation. Ensure that smoking materials are fully extinguished before disposing of
		them, preferably in a metal container with water.
	</p>

	<h4>Candles</h4>
	<p>
		Candles can add ambiance to a room, but they can also be a fire hazard. Never leave candles
		burning unattended, and keep them away from flammable items such as curtains, bedding, or paper.
		Always place candles on a stable, non-flammable surface and extinguish them before leaving the
		room or going to sleep.
	</p>

	<SimTip
		tip="Place the candle item to include the possibility of fires from candles in your simulation"
		texture={Item_Candle}
	/>

	<h4>Flammable Liquids</h4>
	<p>
		Flammable liquids, such as gasoline, oil, and other volatile substances, can ignite easily when
		exposed to an ignition source. Proper storage and handling of these substances are essential to
		prevent accidental fires. Avoid using or storing flammable liquids near open flames or heat
		sources. Use appropriate containers with tightly sealed lids, and store them away from living
		areas in a well-ventilated and cool place.
	</p>

	<h4>Other Causes</h4>
	<p>
		House fires can also be caused by a variety of less common factors, including natural disasters,
		faulty appliances, and intentional arson. While it's impossible to predict or prevent every
		potential fire hazard, it's essential to stay vigilant and take precautions to minimize the
		risk. This includes installing and maintaining smoke detectors, practicing fire escape plans,
		and being mindful of potential hazards in and around the home.
	</p>

	<Interesting
		note="There is always a small chance of a lightning strike starting a fire anywhere in your simulation!"
	/>

	<h2>The Benefits of Insurance</h2>
	<p>
		Home insurance provides protection against financial losses that may occur due to unforeseen
		events, such as house fires. Having insurance can provide you with peace of mind, knowing that
		you are covered in case of a fire or other disaster. In addition to covering property damage,
		insurance can also offer liability coverage, additional living expenses, and more.
	</p>

	<h3>Understanding Home Insurance</h3>
	<p>
		Home insurance is a type of insurance policy that covers a private residence. It provides
		financial protection against disasters and covers the home itself, personal belongings, and
		liability protection for accidents that may occur on the property. Understanding the ins and
		outs of home insurance can help you make informed decisions and ensure that you have adequate
		coverage for your needs.
	</p>

	<h4>What Does It Cover?</h4>
	<p>Home insurance typically covers the following:</p>
	<ul>
		<li>The structure of your home</li>
		<li>Your personal belongings</li>
		<li>Liability protection</li>
		<li>Additional living expenses</li>
	</ul>
	<p>
		The specifics of what is covered can vary depending on the policy and the insurance company.
		It's essential to read the policy documents carefully and ask your insurance agent if you have
		any questions.
	</p>

	<h4>Limitations and Exclusions</h4>
	<p>
		It's crucial to be aware that home insurance policies have limitations and exclusions. Certain
		perils or events may not be covered, or there may be limits on the amount of coverage provided.
		For example, most home insurance policies do not cover damage caused by floods or earthquakes,
		and additional coverage may be required for these events. It's essential to understand the
		limitations and exclusions in your policy and consider purchasing additional coverage if needed.
	</p>

	<h3>Benefits of Home Fire Insurance</h3>

	There are several benefits to having home fire insurance, including:

	<ul>
		<li>
			<b>Financial Protection</b>: Home fire insurance provides financial protection for your
			property and personal belongings in the event of a fire. This insurance can cover the cost of
			replacing or repairing damaged or destroyed items, as well as any additional living expenses
			incurred while your home is being repaired.
		</li>

		<li>
			<b>Peace of Mind</b>: Knowing that you have financial protection in place can give you peace
			of mind. You can rest easy knowing that you and your family will have the resources you need
			to recover and rebuild after a fire.
		</li>

		<li>
			<b>Temporary Housing Assistance</b>: Many home fire insurance policies offer temporary housing
			assistance. If your home is uninhabitable after a fire, your insurance provider may cover the
			cost of a hotel or temporary rental while your home is being repaired.
		</li>

		<li>
			<b>Recovery and Restoration Services</b>: Home fire insurance can also cover the cost of
			professional services to help you recover and restore your home and belongings. This may
			include cleaning and restoration services, as well as debris removal.
		</li>
	</ul>

	<h3>Choosing the Right Fire Insurance Policy</h3>

	<h4>Tips for Shopping Around</h4>
	<p>
		When shopping for a fire insurance policy, it is essential to compare different options and
		providers. Consider factors such as the <ToolTip text={coverageDef}>
			<span class="underline cursor-help">coverage limits</span>
		</ToolTip>, <ToolTip text={deductibleDef}>
			<span class="underline cursor-help">deductibles</span>
		</ToolTip>, and <ToolTip text={premiumDef}>
			<span class="underline cursor-help">premiums</span>
		</ToolTip>. You can also check customer reviews and ratings of insurance companies. Consult with
		insurance agents or brokers to get a better understanding of the options available to you.
		Remember to review your policy periodically to ensure it still meets your needs as your
		circumstances change.
	</p>

	<h4>Understanding Policy Terms</h4>
	<p>
		It is crucial to understand the terms of your fire insurance policy. Familiarize yourself with
		the types of coverage included, the exclusions, and any limitations. Take note of the policy's
		effective dates, how to file a claim, and the documentation required. If you have any questions
		or concerns about your policy, don't hesitate to reach out to your insurance provider for
		clarification.
	</p>

	<h2>How to Reduce or Prevent House Fires</h2>

	<h3>Fire Safety Equipment</h3>

	<h4>Smoke Alarms</h4>
	<p>
		Smoke alarms are crucial for detecting the early signs of a fire in your home. They can alert
		you to the presence of smoke, giving you valuable time to escape and call for help. It's
		essential to install smoke alarms in every room and hallway and test them regularly to ensure
		they are working correctly.
	</p>

	<SimTip
		tip="You can place a smoke alarm in your simulation to test it out. It has a limited range, so you may need to place multiple alarms in larger homes."
		texture={Defence_Detector}
	/>

	<h4>Fire Extinguishers</h4>
	<p>
		Having a fire extinguisher readily available can make a significant difference in containing a
		small fire before it becomes unmanageable. It's essential to have a fire extinguisher in areas
		with a higher risk of fire, such as kitchens, garages, and workshops. Make sure you know how to
		use it properly and check it regularly to ensure it's in good working condition.
	</p>

	<SimTip
		tip="You can place a fire extinguisher in your simulation to test it out. It has a limited range and limited uses so you may need to place multiple extinguishers. Try to place them in areas with a higher risk of fire, such near the stove in kitchens, or by the fireplace."
		texture={Defence_Extinguisher}
	/>

	<h4>Fire Blankets</h4>
	<p>
		Fire blankets are another useful tool for smothering small fires, particularly those caused by
		cooking oils or fats. They work by cutting off the oxygen supply to the fire, suffocating it
		quickly. Keep a fire blanket within easy reach in your kitchen and know how to use it in case of
		a fire emergency.
	</p>

	<SimTip
		tip="You can place a fire blanket in your simulation. It has a limited range and only one use, with a random chance of success. Try to place them in areas with a higher risk of a small fire. They won't work on very hot fires, so keep them close!"
		texture={Defence_Blanket}
	/>

	<h4>Sprinkler Systems</h4>
	<p>
		Sprinkler systems can be installed in your home to automatically release water when they detect
		heat or smoke. These systems can help prevent the spread of fire and reduce the damage to your
		property. While they can be more expensive to install, they offer valuable protection against
		the risk of a house fire.
	</p>

	<SimTip
		tip="You can place a sprinkler system in your simulation. They have a large range and unlimited uses, but are quite weak against hotter fires."
		texture={Defence_Sprinkler}
	/>

	<h3>Prevention Practices</h3>

	<h4>Cooking Safety</h4>
	<p>
		Practice safe cooking habits to prevent kitchen fires. Never leave your cooking unattended, and
		keep flammable materials away from the stove. If a grease fire occurs, cover the pan with a lid
		or use a fire blanket to smother it. Avoid using water to put out grease fires, as it can make
		the flames spread.
	</p>

	<h4>Electrical Safety</h4>
	<p>
		Ensure electrical safety by not overloading outlets and using extension cords properly. Replace
		damaged cords and avoid running them under carpets or rugs. Unplug appliances when not in use
		and hire a qualified electrician to handle any electrical repairs or installations in your home.
	</p>

	<h4>Heating Safety</h4>
	<p>
		Exercise caution with heating equipment, especially space heaters and fireplaces. Keep flammable
		items away from heaters and fireplaces and never leave them unattended. Clean your chimney and
		heating equipment regularly to remove built-up debris that could cause a fire. When using a
		space heater, follow the manufacturer's instructions and safety guidelines.
	</p>

	<h4>Safe Storage of Flammable Materials</h4>
	<p>
		Store flammable materials like gasoline, paint, and cleaning products in a safe and secure
		place, away from heat sources and children's reach. Properly dispose of oily rags and other
		materials that could ignite spontaneously. Take care when handling flammable liquids and follow
		safety precautions to prevent fires.
	</p>

	<h4>Regular Home Maintenance and Inspection</h4>
	<p>
		Regularly inspect and maintain your home to identify and address potential fire hazards. Check
		for faulty wiring, repair any leaks, and clean dryer vents to prevent lint buildup. Schedule an
		annual inspection of your heating and electrical systems to ensure they are functioning safely
		and efficiently.
	</p>

	<h3>Emergency Preparedness</h3>

	<h4>Creating a Fire Evacuation Plan</h4>
	<p>
		Develop a fire evacuation plan for your household that includes multiple escape routes from each
		room and a designated meeting place outside. Make sure everyone in your household is familiar
		with the plan and knows how to exit safely in case of a fire. Consider special needs for
		children, elderly family members, and pets when creating your plan.
	</p>

	<h4>Practicing Fire Drills</h4>
	<p>
		Practice fire drills regularly with your household to ensure everyone knows how to escape
		quickly and safely in the event of a fire. Review the evacuation plan, practice using different
		escape routes, and make sure everyone knows how to call 911 or your local emergency number.
		Regular drills will help reinforce safe behaviors and improve response time during an actual
		emergency.
	</p>

	<h4>Having an Emergency Kit</h4>
	<p>
		Prepare an emergency kit with essential items like a flashlight, batteries, water,
		non-perishable food, and important documents. Store the kit in an easily accessible location, so
		you can grab it quickly during an evacuation. Having an emergency kit will help you and your
		family stay safe and comfortable while waiting for assistance or finding temporary shelter.
	</p>

	<h2>Conclusion</h2>

	<h3>Recap of Key Takeaways</h3>
	<p>
		This guide has provided insights into the causes of house fires, the benefits of fire insurance,
		and various strategies to reduce or prevent fires in your home. It is important to recognize the
		primary causes of house fires, including cooking mishaps, electrical issues, heating equipment,
		and improper storage of flammable materials. Taking proactive measures, such as installing fire
		safety equipment and practicing safe habits, can help protect your home and loved ones from the
		devastating effects of house fires.
	</p>

	<h3>Encouragement for Proactive Measures</h3>
	<p>
		By following the advice in this guide, you can significantly reduce the risk of house fires and
		create a safer living environment for your family. We encourage you to take the time to educate
		yourself about fire prevention practices, regularly inspect your home for potential hazards, and
		practice fire drills with your family. Remember, the best defense against house fires is a
		combination of awareness, preparation, and preventive actions.
	</p>

	<h2>Additional Resources</h2>

	<h3>Local Fire Departments and Community Resources</h3>
	<p>
		Local fire departments and community organizations often offer resources and support for fire
		prevention and safety. Reach out to your local fire department for information on community
		events, educational materials, and home safety inspections. These resources can help you stay
		informed about the latest fire safety recommendations and build connections with local safety
		professionals.
	</p>

	<h3>Online Fire Safety Courses and Tutorials</h3>
	<p>
		There are many online resources available for fire safety education, including courses,
		tutorials, and interactive simulations. These resources can help you gain a deeper understanding
		of fire prevention practices, learn how to respond effectively in emergencies, and improve your
		overall fire safety knowledge. Take advantage of these resources to further enhance your fire
		prevention efforts.
	</p>

	<h3>Recommended Fire Safety Products</h3>
	<p>
		Investing in quality fire safety products, such as smoke alarms, fire extinguishers, and fire
		blankets, is essential for protecting your home and family. When selecting these products, look
		for trusted brands and certifications from recognized safety organizations. Remember to
		regularly check and maintain your fire safety equipment to ensure it remains effective in case
		of an emergency.
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
