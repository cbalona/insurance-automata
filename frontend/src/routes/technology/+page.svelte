<script>
	import Interesting from '$lib/components/prose/Interesting.svelte';
	import TableOfContents from '$lib/components/prose/TableOfContents.svelte';
	import Learned from '$lib/components/prose/Learned.svelte';
	import { APP_NAME } from '$lib/constants';
</script>

<svelte:head>
	<title>Technology Stack</title>
</svelte:head>

<article class="prose lg:prose-xl prose-slate mx-auto prose-img:m-0">
	<h1>Insurance Automata Technology Stack</h1>

	<TableOfContents />

	<h2>Introduction</h2>

	<h3>Brief overview of the project</h3>
	<p>
		This website simulates the spread of house fires and was created for the 2023 CAS Hacktuary
		competition. It is designed to provide a visual representation of how fires can spread in the
		home, taking into account various factors such as structures, material of objects, fire
		defences, and fire sources. The application is built using Svelte for the frontend and the
		simulation engine is written in Rust and compiled to WebAssembly (WASM).
	</p>

	<p>
		The motivation behind this project was to create an educational tool that could visually present
		the dangers of house fires in an fun, user-friendly, and interactive way. The idea for the
		project was inspired by the concept of cellular automata, which are mathematical models used to
		simulate complex systems using simple rules. In this project, cellular automata were applied to
		simulate the spread of fires.
	</p>

	<h3>Purpose of the technology stack section</h3>
	<p>
		The purpose of this section is to provide a detailed overview of the technology stack used in
		the development of the fire spread simulation application. This includes the tools, languages,
		and libraries used in both the frontend and backend of the application. By understanding the
		technology stack, readers can gain insights into the design and implementation choices made
		during the development of the application.
	</p>

	<p>
		You may think that this section is not relevant to you if you are not a developer, or if you are
		an actuary, or work in insurance, etc, but I would encourage you to read on. The technology
		stack section is written in a way that is accessible to all readers, regardless of their
		technical background.
	</p>
	<p>
		<b>I must stress this:</b> <br />
		This website was created as an entry for an actuarial competition. It is not intended to be a demonstration
		of the skills required for an actuarial career, nor is it a suggestion of the skills actuaries should
		acquire for future relevance.
	</p>

	<p>
		<b>
			Instead, the primary goal of this website is to illustrate the potential role actuaries can
			play in educating the public in a more accessible and engaging manner. While actuaries often
			possess highly technical and specialized skills, it is crucial to communicate risk in a way
			that is simple, intuitive, and easily understood by a broader audience. By doing so, we can
			more effectively educate and inform the public about important risk-related concepts.
		</b>
	</p>
	<p>
		<b
			>However, this endeavor should not be a solo effort. Actuaries should recognize the value of
			collaborating with professionals from other fields, such as software developers, to achieve
			this goal. This website serves as an example of what can be accomplished when actuaries
			leverage software development skills (either their own, or those of others) to create
			educational tools.
		</b>
	</p>

	<p>
		I encourage you to explore the tech stack below to gain an understanding of the skills that
		software developers bring to the table and how they can be applied to actuarial work. By doing
		so, you'll get a sense of the possibilities that arise when we collaborate across disciplines to
		educate and inform the public about risk.
	</p>

	<h2>Frontend Development</h2>
	<p>
		Frontend development focuses on creating the user interface (UI) of a website, which is what you
		see and interact with on your screen. It involves a wide range of tools and technologies to
		create an engaging and user-friendly experience.
	</p>
	<p>
		Today, most modern applications are built as web applications. These can be accessed through a
		web browser, mobile app, or even a desktop app. Web applications offer a significant advantage
		over traditional desktop applications, as they can be accessed from any device with a web
		browser, eliminating the need to create separate versions for different platforms like Windows,
		Mac, or even your phone!
	</p>
	<p>
		Web applications provide great flexibility in terms of design, appearance, and functionality.
		They can easily connect with other applications and services over the internet. Additionally,
		since web applications run in a browser, users don't need to install any software on their
		devices to use them.
	</p>

	<h3>Svelte</h3>

	<h4>What is Svelte?</h4>
	<p>
		Svelte is a tool used to build interactive websites. Unlike other tools that make websites
		interactive after they've been displayed, Svelte does much of its work before the website is
		even shown. This means that Svelte can make changes to the website more quickly and efficiently.
		As a result, websites built with Svelte are typically faster and more responsive than those
		built with other tools.
	</p>

	<h4>Why Svelte was chosen for this project</h4>
	<p>
		Svelte was chosen for this project for a few reasons. First, its ability to quickly and
		efficiently make changes to the website is crucial for a real-time simulation like the spread of
		house fires. Second, Svelte is easy to use and has a fantastic developer experience that allows
		for rapid development of the website's appearance and interactions. Finally, because Svelte is
		lightweight, the website loads quickly for users.
	</p>

	<Interesting
		note="There are several other popular tools for building interactive websites, known as JavaScript
		frameworks. Some of the most well-known ones include React, Angular, and Vue.js."
	/>
	<Interesting
		note="<b>JavaScript</b> is a programming language that is commonly used to create interactive and dynamic
		features on websites. It allows web developers to add elements like animations, interactive forms,
		and real-time updates to web pages. JavaScript is an essential part of modern web development."
	/>
	<Interesting
		note="Technically, this website was built using TypeScript, a superset of JavaScript.
		The differences are not important for the purposes of this guide."
	/>

	<h3>User Interface Design</h3>

	<h4>Tools and libraries used for UI/UX</h4>
	<p>
		The user interface (UI) and user experience (UX) of the fire spread simulation application were
		designed using a combination of tools and libraries. These tools helped create an intuitive and
		visually appealing interface that enhances the user's interaction with the simulation. The main
		ones to note are:
	</p>
	<ul>
		<li>
			<strong>Tailwind:</strong> Tailwind, a CSS framework, was used to style the user interface. It
			allowed for more organized and maintainable stylesheets, making it easier to implement the design.
		</li>
		<li>
			<strong>PixiJS:</strong> PixiJS, a JavaScript library, was used for rendering the simulation graphics.
			It allowed for the creation of high-performance, visually appealing graphics for the fire spread
			simulation.
		</li>
	</ul>

	<Interesting
		note="<b>CSS</b> is a language used to control the appearance of web pages.
		It allows web developers to set colors, fonts, spacing, and other visual elements.
		A stylesheet is a file or section of code where the CSS rules are defined."
	/>

	<h4>Design principles followed</h4>
	<p>
		Several design principles were followed to ensure a user-friendly and visually appealing
		interface:
	</p>
	<ul>
		<li>
			<strong>Simplicity:</strong> The design was kept clean and uncluttered, with a focus on the essential
			elements of the simulation.
		</li>
		<li>
			<strong>Consistency:</strong> Consistent design elements, such as colors, fonts, and button styles,
			were used throughout the application to create a cohesive look and feel.
		</li>
		<li>
			<strong>Intuitiveness:</strong> The user interface was designed to be intuitive and easy to navigate,
			with clear labels and instructions.
		</li>
	</ul>

	<p>
		<b>What about responsiveness?</b> Responsive design is an important aspect of UI/UX. It ensures that
		the website looks good on all devices, from mobile phones to large desktop monitors. The fire spread
		simulation application is quite heavy in terms of graphics and animations, so it was not possible
		to make it fully responsive. It simply would not have worked well on smaller screens. So it was designed
		to work best on larger screens, such as laptops and desktops.
	</p>

	<Learned
		><ul class="list-none py-0">
			<li>
				<strong>Frontend Development:</strong>
				The creation of the visual and interactive parts of a website. Use this to surface actuarial
				tools to users.
			</li>

			<li>
				<strong>JavaScript:</strong> A programming language used for adding interactivity to websites.
				This will be necessary to make the website interactive.
			</li>

			<li>
				<strong>Svelte:</strong> A tool for building fast and efficient interactive websites. This makes
				developing the frontend easier. Other tools exist too, like React and Angular.
			</li>

			<li>
				<strong>CSS:</strong> A language for styling web pages. Use this for beautiful interfaces!
			</li>

			<li>
				<strong>Tailwind:</strong> A CSS framework for styling websites. Like Svelte, it is a tool to
				make the process easier. Other tools exists like Bootstrap and Material UI.
			</li>

			<li>
				<strong>PixiJS:</strong> A library for creating high-quality graphics for web applications. If
				you need to display complicated graphics, this helps!
			</li>
		</ul>
	</Learned>

	<h2>Simulation Engine</h2>

	<p>
		Behind the scenes, the fire spread simulation is powered by a simulation engine that calculates
		the spread of fire across the house using cellular automata. The design space where the floor
		plan and fire spread are simulated is represented as a grid of cells. There are 2,304 cells in
		total, each of which hold information about the state of the cell. There is also complex logic
		that determines how the fire spreads from cell to cell. This necessitates a high-performance
		simulation engine that can quickly and efficiently calculate the spread of fire over possibily
		hundreds of steps.
	</p>

	<Interesting
		note="<b>Cellular automata</b> is a mathematical model used to simulate complex systems with simple rules.
		It consists of a grid of cells that can be in different states, and the state
		of each cell changes over time based on the states of its neighboring cells."
	/>

	<h3>Rust</h3>

	<h4>What is Rust?</h4>
	<p>
		Rust is a programming language known for its performance and safety. It is often used for
		systems programming. Systems programming is the development of software that manages and
		controls computer hardware. It includes tasks like operating system development and creating
		software for embedded systems.
	</p>

	<p>
		Rust is different from languages like Python and R. While Python and R are great for data
		analysis and scripting, Rust is designed for performance-intensive tasks. Because it is compiled
		and close to the hardware, it is well-suited for creating a high-performance simulation engine
		such as the one used in this project.
	</p>

	<Interesting
		note="<b>Compiling</b> code is the process of converting code written in a
	programming language into a format that can be directly executed by a computer.
	This makes the code run faster and more efficiently."
	/>

	<p>
		Other languages considered for the simulation engine included C and C++. While they offer
		similar performance benefits, Rust was chosen for its enhanced safety features.
	</p>

	<h3>WebAssembly (WASM)</h3>
	<p>
		Rust, while powerful and efficient, cannot run natively in web browsers. This limitation means
		that, on its own, Rust cannot be used for web-based applications like the fire spread
		simulation.
	</p>

	<h4>What is WebAssembly?</h4>
	<p>
		WebAssembly (WASM) is a format that allows code written in languages like Rust to run in web
		browsers. It provides near-native performance and enables high-speed web applications.
	</p>

	<p>
		Rust code can be compiled into WebAssembly, which is then loaded into the web browser. This
		allows the simulation engine to run in the browser, where it can be used to power the fire
		spread simulation.
	</p>

	<p>
		One of the drawbacks of web applications is that they are often slower than native applications.
		However, WebAssembly allows web applications to run at near-native speeds. This makes it
		possible to create high-performance web applications, such as the fire spread simulation.
	</p>

	<p>
		This can extend to complicated actuarial models. These can be written in Rust and compiled into
		WebAssembly, which can then be loaded into the web browser. This allows actuaries to create
		complex models that run at near-native speeds in the browser.
	</p>

	<Interesting
		note="For more detail on the simulation logic itself, see the <a href='/engine'>engine page</a>."
	/>

	<Learned
		><ul class="list-none py-0">
			<li>
				<strong>Compiled Languages:</strong> Languages that are converted into a format that can be directly
				executed by a computer. This makes the code run faster and more efficiently. These are great
				for performance-intensive tasks like valuing millions of insurance policies, or simulating thousands
				of assets and liabilities. Examples are Rust, C, C++ and Go.
			</li>

			<li>
				<strong>WebAssembly:</strong> A format that allows code written in languages like Rust to run
				in web browsers. It provides near-native performance and enables high-speed web applications.
				If you need to run a high-performance simulation in the browser, this is the way to go!
			</li>
		</ul>
	</Learned>

	<h2>Actuarial Tech Stack</h2>

	<p>
		Yes, there is a tech stack for actuaries! But, these are not software tools. Instead, they are
		techniques and methods that actuaries use to quantify risk and value insurance policies.
	</p>

	<h3>Probability and Statistics of House Fires</h3>
	<p>
		Actuaries use probability and statistics to model the occurrence of house fires. This involves
		analyzing historical data on house fires, including their frequency and severity, and using
		statistical methods to estimate the likelihood of future fires. These are normally based on
		complex models that look at factors such as the size of the house, the materials used in its
		construction, and the presence of fire safety measures. Insurers use their own data to build
		these models, which are then used to calculate the expected cost of future fires.
	</p>

	<p>
		In the case of this project, we are directly simulating a house fire. This means we do not need
		to use statistical methods to estimate the probability of future fires. Instead, we can directly
		simulate the occurrence of fires and calculate the expected cost of the fire. If we simulate
		enough fires, we can get a good estimate of the expected cost of a fire given the
		characteristics of the house.
	</p>

	<p />

	<h3>Severity of House Fires</h3>
	<p>
		The severity of house fires is modeled based on factors that influence the extent of damage
		caused by a fire, such as the size of the house, the materials used in its construction, and the
		presence of fire safety measures. Actuaries use statistical methods to estimate the distribution
		of fire severity, which is used to calculate the potential cost of future fires. These are
		normally derived from historic data on house fires.
	</p>

	<p>
		In the fire simulator, we directly simulate the severity of the fire. Each cell in the
		simulation grid has a value which is based on its contents. This value is used to determine the
		severity of the fire in that cell. The severity of the fire is then used to calculate the
		expected loss from the fire.
	</p>

	<p>
		Statistics work best when there is a large amount of something. So, we need many simulations.
		The simulater takes the average of the total loss from all the simulations to get an estimate of
		the expected loss from a fire.
	</p>

	<h3>Frequency of House Fires</h3>
	<p>
		The frequency of house fires is the number of house fires that occur in a given area over a
		specific time period. This is used to estimate the probability of future fires. Insurers would
		typically look at historical data on house fires to estimate the frequency of fires. This data
		would be used to build a model that estimates the probability of future fires. In advanced
		models, they may account for the age of the house, the materials used in its construction, the
		location of the house, and the presence of fire safety measures.
	</p>
	<p>
		In the fire simulator, because we are directly simulating house fires, we assume we always have
		a fire. It would be pretty boring to view a simulation where there are no fires! However, we
		allow for the frequency of fires after the fact in the risk premium calculation. This is done by
		multiplying the mean expected loss from the simulated fires by a simulated frequency of fires.
	</p>

	<h3>Risk Premium</h3>
	<p>
		The risk premium is the amount that an insurer charges to cover the cost of future claims. It is
		closely linked to the expected losses. This won't be the same as the premium that the insurer
		charges, as the insurer will also need to cover their expenses and make a profit. The risk
		premium is calculated by multiplying the expected loss by the frequency of fires.
	</p>

	<p>
		As you run the simulation, you will see the risk premium change. This is because the expected
		loss is calculated from the simulation results, and the frequency of fires is randomly
		generated. So, the risk premium will change each time you run the simulation. But over many
		simulations, the average risk premium will eventually converge to a stable value.
	</p>

	<Interesting
		note="Play around with the simulator by changing the materials and fire defense systems
		of the house. You will see that the risk premium changes based on these factors. <b>Tip</b>:
		save your configurations and compare them to see which one has the lowest risk premium."
	/>

	<h3>Simulation of House Fires</h3>
	<p>
		Ideally, every insurer would want to be able to directly simulate how a fire would occur and
		spread in a house it would like to insure. This would allow them to calculate the expected cost
		of a fire, and the risk premium, for any house, to a high degree of accuracy. However, this has
		not been possible for many reasons.
	</p>

	<p>
		Firstly, you'd need the layout of the house, and it is not practical to get this for every
		house. Secondly, you'd need to know the materials used in the construction of the house, and
		again, this is not practical to get for every house. Thirdly, you'd need to be able to quickly
		and accurately simulate the spread of a fire in a house. This requires a lot of computing power
		and complex models.
	</p>

	<p>
		But, my belief is that this is now possible. With the advent of artificial intelligence, it is
		likely that it is now possible to get the layout of a house and the materials used in its
		construction from a video recorded on your phone. Not too dissimilar to how some insurers
		already use photos for motor insurance. And with the advent of cloud computing, it is now
		possible to simulate the spread of a fire in a house in a reasonable amount of time.
	</p>

	<p>
		We simply need the systems and software to do this to be built. This simulator, albeit an
		extremely simplified version, is a first step towards this. And all great journeys start with a
		few small steps.
	</p>

	<Learned
		><ul class="list-none py-0">
			<li>
				<strong>Risk Premium:</strong> Insurers use statistical methods to estimate the probability of
				future events, such as house fires. This is used to calculate the risk premium, which is the
				amount that an insurer charges to cover the cost of future claims.
			</li>

			<li>
				<strong>Simulation:</strong> Direct simulation of house fires is an alternative to estimating
				the probability of future fires. It is more accurate, but requires a lot of computing power.
				However, this is closer to becoming a reality with the advent of cloud computing and artificial
				intelligence.
			</li>
		</ul>
	</Learned>

	<h2>How These All Fit Together</h2>

	<h3>Integration of the Simulation Engine and Actuarial Models</h3>
	<p>
		The simulation engine and actuarial models work together to estimate the cost of house fires.
		The simulation engine simulates the spread of fires based on various input parameters, while the
		actuarial models use the simulation results to estimate the risk premium.
	</p>

	<h4>Input Data</h4>
	<p>
		The input data for the simulation engine and actuarial models includes information on the size
		and layout of the house, the materials used in its construction, the location of fire sources,
		any fire defences, and historical data on house fires.
	</p>

	<h4>Simulation Process</h4>
	<p>
		The simulation engine uses the input data to simulate the spread of house fires. It applies the
		rules of cellular automata to model the spread of fire across a grid of cells, which represent
		the design space of the house. The simulation engine calculates the state of each cell over time
		based on the states of its neighboring cells and the input parameters. The simulation results
		include information on the extent of the fire, the areas affected, and the duration of the fire.
	</p>

	<h4>Actuarial Analysis</h4>
	<p>
		The actuarial models use the simulation results to estimate the frequency, severity, and
		expected cost of house fires. The frequency of fires is derived from randomly simulating if a
		fire occurs or not based on a fixed historical frequency of house fires, which is derived from
		historical data. The severity of fires is estimated based on the distribution of fire severity,
		which is calculated from the simulation results. The expected cost of house fires is calculated
		as the product of the frequency of fires and the mean cost of multiple simulations.
	</p>

	<h4>Output and Visualization</h4>
	<p>
		The simulation results and actuarial analysis are presented to the user through a user-friendly
		interface. The interface includes visualization tools that display the spread of the last
		simulated fire across the design space, as well as charts and graphs that show the distribution
		of fire severity and the expected cost of house fires. The user interface is designed to be
		intuitive and easy to navigate, with clear labels and instructions. The output is presented in a
		way that is accessible to users with varying levels of technical knowledge.
	</p>

	<Learned
		><ul class="list-none py-0">
			<li>
				Multiple technologies from various domains act together to bring this project to life!
			</li>
		</ul>
	</Learned>

	<h2>Conclusion</h2>

	<h3>Summary of the Technology Stack</h3>
	<p>
		The fire spread simulation application was built using a combination of frontend development
		tools, user interface design tools, a simulation engine, and actuarial models. The frontend was
		developed using Svelte, a tool for building interactive websites, and the user interface was
		designed using Tailwind, a CSS framework, and PixiJS, a library for creating high-quality
		graphics. The simulation engine was written in Rust, a high-performance programming language,
		and compiled to WebAssembly (WASM) to run in web browsers. The actuarial pricing converts the
		simulations results into an expected cost of house fires and hence a risk premium.
	</p>

	<h3>Closing Thoughts</h3>
	<p>
		In conclusion, I hope that this fire spread simulation application has demonstrated the power of
		combining different disciplines together to educate and inform. By integrating frontend
		development, user interface design, simulation modeling, and actuarial analysis, we have created
		a tool that visually presents the dangers of house fires in an interactive and engaging way.
		This project serves as an example of what can be achieved when we collaborate across disciplines
		and leverage the skills and expertise of professionals from various fields. I hope that it
		inspires others to explore new ways of communicating complex concepts and educating the public
		about important risk-related topics.
	</p>

	<hr class="my-16" />
	<strong>Future Improvements and Potential Extensions of the Project</strong>
	<p>
		There are several potential improvements and extensions of the project that could enhance its
		functionality and user experience. These include:
	</p>
	<ul>
		<li>
			Enhancements to the simulation engine, such as incorporating more detailed fire spread models
			and adding features like wind and oxygen effects. More objects could be added, more materials,
			and more complex fire spread models.
		</li>
		<li>
			Updates to the actuarial models, including the use of more sophisticated statistical methods
			and the incorporation of additional data sources. A more robust frequency model could be
			developed, and the severity model could be improved by incorporating more detailed information
			on the distribution of fire severity.
		</li>
		<li>
			New features for the user interface, such as interactive tools for exploring the simulation
			results and customizing the input parameters.
		</li>
		<li>
			Extensions of the project to other applications, such as floods, or even wildfires on a larger
			scale.
		</li>
	</ul>
	<p>
		These improvements and extensions would further enhance the educational value of the fire spread
		simulation application and provide users with a more comprehensive and interactive experience.
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
