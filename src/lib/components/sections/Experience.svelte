<script lang="ts">
	import type { Colors } from '$lib/types';

	import GlassCard from '../common/GlassCard.svelte';
	import Building from '../icons/Building.svelte';
	import Calendar from '../icons/Calendar.svelte';
	import Location from '../icons/Location.svelte';
	import ShoppingBag from '../icons/ShoppingBag.svelte';

	type Experience = {
		title: string;
		company: string;
		type: string;
		typeColor: Colors;
		location: string;
		startDate: string;
		endDate: string;
		color?: Colors;
		responsibilities: string[];
		testid?: string;
	};

	const experiences: Experience[] = [
		{
			title: 'Full Stack Developer',
			company: 'Cisco Systems',
			testid: 'cisco',
			type: 'Full-time',
			typeColor: 'blue',
			location: 'San Jose, CA',
			startDate: 'Aug 2022',
			endDate: 'Present',
			color: 'blue',
			responsibilities: [
				'Architected AI-powered platform using LangChain and OpenAI that serves 1,000+ engineers daily, earning U.S. Patent No. 12,395,410',
				'Built full-stack solutions with SvelteKit frontends and FastAPI backends, reducing development time by 40%',
				'Developed RAG-based documentation search system with vector databases, improving query accuracy by 85%',
				'Led migration of legacy applications to modern TypeScript stack, improving performance by 60%'
			]
		},
		{
			title: 'Front-End Developer',
			company: 'AccruePartners',
			testid: 'accrue-partners',
			type: 'Contract',
			typeColor: 'purple',
			location: 'Remote',
			startDate: 'Dec 2020',
			endDate: 'Mar 2022',
			color: 'purple',
			responsibilities: [
				'Developed responsive React applications for Fortune 500 clients with 99.9% uptime',
				'Implemented reusable component libraries using TypeScript and Tailwind CSS',
				'Collaborated with design teams to create pixel-perfect, accessible UI components',
				'Optimized frontend performance, reducing initial load times by 50%'
			]
		},
		{
			title: 'Data Analyst',
			company: 'U.S. Marine Corps',
			testid: 'marine-corps',
			type: 'Active Duty',
			typeColor: 'green',
			location: 'San Diego, CA',
			startDate: 'Apr 2011',
			endDate: 'Mar 2018',
			color: 'green',
			responsibilities: [
				'Served as F-18 Automated Maintenance Environment (FAME) Supervisor, overseeing engine lifecycle tracking and post-flight wear analysis systems',
				'Taught technical training courses to Marines on FAME software and aircraft maintenance data management',
				'Maintained comprehensive aircraft maintenance records and managed NALCOMIS user base administration',
				'Built custom SQL queries to analyze maintenance data and generate operational reports for leadership',
				'Managed Special Maintenance Qualifications (SMQ) database and personnel certifications'
			]
		}
	];
</script>

<section id="experience" class="relative py-20">
	<!-- Background Orbs -->
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"
			style="transform: scale(1.2) rotate(90deg);"
		></div>
		<div
			class="absolute right-1/3 bottom-10 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl"
			style="transform: scale(1.1) rotate(270deg);"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<!-- Section Header -->
		<div class="mb-16 flex flex-col items-center justify-center space-y-6 text-center">
			<h2
				class="mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
			>
				Professional Experience
			</h2>
			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-white/40">
				From military leadership to Fortune 500 tech companies—a journey of building impactful
				solutions and leading high-performing teams.
			</p>
		</div>

		<!-- Timeline -->
		<div class="relative space-y-12">
			<!-- Vertical Timeline Line (desktop only) -->
			<div
				class="absolute top-0 left-6 hidden h-full w-0.5 bg-linear-to-b from-blue-500/50 via-purple-500/50 to-cyan-500/50 md:block"
			></div>

			{#each experiences as exp, i}
				<div class="relative">
					<!-- Timeline Dot (desktop only) -->
					<div
						class="absolute top-8 left-4.25 z-10 hidden h-4 w-4 rounded-full border-2 border-[#0a0118] bg-linear-to-r from-green-500 to-cyan-500 md:block"
					></div>

					<!-- Experience Card -->
					<div class="md:ml-16">
						<GlassCard hoverColor={exp.color}>
							<!-- Header Section -->
							<div class="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
								<div class="flex-1">
									<!-- Title and Badge -->
									<div class="mb-3 flex flex-wrap items-center gap-3">
										<ShoppingBag className={`h-5 w-5 text-${exp.color}-400`} />
										<h3 class="text-xl font-bold text-white">{exp.title}</h3>
										<span
											class="rounded-full border border-{exp.typeColor}-400/30 bg-{exp.typeColor}-500/20 px-3 py-1 text-xs font-medium text-muted-foreground"
										>
											{exp.type}
										</span>
									</div>

									<!-- Company -->
									<div class="mb-3 flex items-center gap-3">
										<Building className="h-4 w-4 text-gray-400" />
										<p data-testid={exp.testid} class="font-semibold text-{exp.color}-400">
											{exp.company}
										</p>
									</div>

									<!-- Date and Location -->
									<div
										class="flex flex-col gap-3 text-sm text-gray-400 sm:flex-row sm:items-center sm:gap-6"
									>
										<div class="flex items-center gap-3 text-muted-foreground">
											<Calendar className="h-4 w-4" />
											<span>{exp.startDate} – {exp.endDate}</span>
										</div>
										<div class="flex items-center gap-2 text-muted-foreground">
											<Location className="h-4 w-4" />
											<span>{exp.location}</span>
										</div>
									</div>
								</div>
							</div>

							<!-- Responsibilities -->
							<div class="space-y-3">
								{#each exp.responsibilities as responsibility}
									<div class="flex items-start gap-3">
										<div class="mt-2 h-2 w-2 shrink-0 rounded-full bg-{exp.color}-500/20"></div>
										<p class="leading-relaxed text-muted-foreground">{responsibility}</p>
									</div>
								{/each}
							</div>
						</GlassCard>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
