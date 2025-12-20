<script lang="ts">
	import GlassCard from '../common/GlassCard.svelte';
	import PaintBrush from '../icons/PaintBrush.svelte';
	import Code from '../icons/Code.svelte';
	import ChatBot from '../icons/ChatBot.svelte';
	import DevOps from '../icons/DevOps.svelte';
	import CheckMarkFilled from '../icons/CheckMarkFilled.svelte';
	import Theatre from '../icons/Theatre.svelte';

	const skillCategories = [
		{
			title: 'Frontend Development',
			icon: PaintBrush,
			color: 'from-purple-400 to-pink-400',
			skills: [
				'React',
				'Svelte',
				'SvelteKit',
				'TypeScript',
				'JavaScript',
				'Tailwind CSS',
				'HTML/CSS',
				'Vue.js',
				'Next.js'
			]
		},
		{
			title: 'Backend Development',
			icon: Code,
			color: 'from-blue-400 to-cyan-400',
			skills: [
				'Node.js',
				'Python',
				'FastAPI',
				'Express',
				'REST APIs',
				'GraphQL',
				'PostgreSQL',
				'MongoDB'
			]
		},
		{
			title: 'AI & Machine Learning',
			icon: ChatBot,
			color: 'from-cyan-400 to-teal-400',
			skills: ['LangChain', 'OpenAI', 'RAG', 'Prompt Engineering', 'Vector Databases', 'Pinecone']
		},
		{
			title: 'DevOps & Tools',
			icon: DevOps,
			color: 'from-orange-400 to-red-400',
			skills: ['Git', 'Docker', 'CI/CD', 'AWS', 'Vercel', 'Linux', 'Bash', 'Vite']
		},
		{
			title: 'Testing & Quality',
			icon: CheckMarkFilled,
			color: 'from-green-400 to-emerald-400',
			skills: ['Vitest', 'Playwright', 'Jest', 'Testing Library', 'Unit Testing', 'E2E Testing']
		},
		{
			title: 'Design & UX',
			icon: Theatre,
			color: 'from-pink-400 to-purple-400',
			skills: ['Figma', 'UI/UX Design', 'Responsive Design', 'Accessibility', 'Design Systems']
		}
	];
</script>

<section id="skills" class="relative py-20">
	<!-- Background Orbs -->
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="absolute top-10 right-1/3 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl"
			style="transform: scale(1.1) rotate(60deg);"
		></div>
		<div
			class="absolute bottom-20 left-1/4 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl"
			style="transform: scale(1.2) rotate(180deg);"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<!-- Section Header -->
		<div class="mb-16 flex flex-col items-center justify-center space-y-6 text-center">
			<h2
				class="mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
			>
				Skills & Expertise
			</h2>
			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-white/40">
				A comprehensive toolkit built over 7+ years of crafting modern web applications, from
				pixel-perfect frontends to scalable backends and cutting-edge AI integrations.
			</p>
		</div>

		<!-- Skills Grid -->
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each skillCategories as category}
				<GlassCard hoverColor="blue">
					<!-- Card Header -->
					<div class="mb-6 flex items-center gap-3">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br {category.color} text-2xl"
						>
							<svelte:component this={category.icon} className="h-6 w-6 text-white" />
						</div>
						<h3 class="text-xl font-bold text-white">{category.title}</h3>
					</div>

					<!-- Skill Pills -->
					<div class="flex flex-wrap gap-2">
						{#each category.skills as skill}
							<span
								class="rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-white/10 hover:text-white"
							>
								{skill}
							</span>
						{/each}
					</div>
				</GlassCard>
			{/each}
		</div>
	</div>
</section>
