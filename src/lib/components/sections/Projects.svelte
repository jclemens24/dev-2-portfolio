<script lang="ts">
	import type { Colors } from '$lib/types';
	import GlassCard from '$lib/components/common/GlassCard.svelte';
	import DirectLink from '$lib/components/icons/DirectLink.svelte';
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import Tooltip from '$lib/components/common/Tooltip.svelte';

	type Project = {
		title: string;
		description: string;
		longDescription?: string;
		technologies: string[];
		category: string;
		categoryColor?: Colors;
		image?: string;
		liveUrl?: string;
		githubUrl?: string;
		featured?: boolean;
	};

	const projects: Project[] = $state([
		{
			title: 'Spanning Content Tree',
			description:
				'AI-Driven Generation and Automation of Targeted Network Support Content for Enhanced Engineer Productivity.',
			longDescription:
				'Built on top OpenWebUI with LangChain, OpenAI, and RAG architecture. Earned U.S. Patent C/P/1042312/US/UTL/1',
			technologies: ['SvelteKit', 'FastAPI', 'LangChain', 'OpenAI', 'Pinecone', 'PostgreSQL'],
			category: 'AI/ML',
			categoryColor: 'cyan',
			featured: true,
			liveUrl: 'https://spanning-content-tree-v1.cisco.com'
		},
		{
			title: 'Portfolio Website',
			description: 'Modern portfolio with AI-powered chat assistant and interactive UI.',
			longDescription:
				'Full-stack portfolio featuring an AI assistant with resume context, glass morphism design, and smooth animations.',
			technologies: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
			category: 'Web Development',
			categoryColor: 'purple',
			githubUrl: 'https://github.com/jclemens24/dev-2-portfolio',
			featured: true
		},
		{
			title: 'Hardware Installation Guide',
			description: 'Comprehensive guide for installing and configuring hardware components.',
			longDescription:
				'Step-by-step instructions with diagrams and troubleshooting tips for hardware installation. Connects users with support resources.',
			technologies: ['SvelteKit', 'Node.js', 'MongoDB', 'Python', 'Socket.io', 'BeautifulSoup'],
			category: 'Web Development',
			categoryColor: 'blue',
			liveUrl: 'https://hig.cisco.com',
			featured: false
		},
		{
			title: 'DevOps Automation Suite',
			description: 'CI/CD pipeline automation and deployment monitoring tools.',
			longDescription:
				'Streamlined deployment processes with automated testing, monitoring, and rollback capabilities.',
			technologies: ['Docker', 'GitHub Actions', 'AWS', 'Terraform', 'Python'],
			category: 'DevOps',
			categoryColor: 'orange',
			featured: false
		},
		{
			title: 'Typeorm Fastify Plugin',
			description: 'A Fastify plugin that integrates TypeORM for seamless database management.',
			longDescription:
				'This plugin simplifies the setup and configuration of TypeORM within Fastify applications, providing decorators and utilities for efficient database operations.',
			technologies: ['Fastify', 'TypeORM', 'TypeScript', 'Node.js', 'TapJS'],
			category: 'Plugin',
			categoryColor: 'green',
			githubUrl: 'https://github.com/jclemens24/typeorm-fastify-plugin',
			featured: true
		}
	]);

	const featuredProjects = $derived.by(() => projects.filter((p) => p.featured));
	const otherProjects = $derived.by(() => projects.filter((p) => !p.featured));
</script>

<section id="projects" class="relative py-20">
	<!-- Background Orbs -->
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="absolute top-10 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"
			style="transform: scale(1.3) rotate(45deg);"
		></div>
		<div
			class="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl"
			style="transform: scale(1.1) rotate(210deg);"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<!-- Section Header -->
		<div class="mb-16 flex flex-col items-center justify-center space-y-6 text-center">
			<h2
				class="mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
			>
				Featured Projects
			</h2>
			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-white/40">
				A selection of projects showcasing full-stack development, AI integration, and modern web
				technologies—built to solve real-world problems at scale.
			</p>
		</div>

		<!-- Featured Projects -->
		<div class="mb-16 grid gap-8 md:grid-cols-2">
			{#each featuredProjects as project}
				<GlassCard hoverColor={project.categoryColor} class="group flex flex-col">
					<!-- Category Badge -->
					<div class="mb-4 flex items-center justify-between">
						<span
							class="rounded-full border border-{project.categoryColor}-400/30 bg-{project.categoryColor}-500/20 px-3 py-1 text-xs font-medium text-{project.categoryColor}-400"
						>
							{project.category}
						</span>
						<div class="flex gap-2">
							{#if project.githubUrl}
								<Tooltip content="View on GitHub">
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="rounded-lg bg-white/5 p-2 transition-all hover:bg-white/10"
										aria-label="View on GitHub"
									>
										<GitHub className="h-5 w-5 text-gray-400 transition-colors hover:text-white" />
									</a>
								</Tooltip>
							{/if}
							{#if project.liveUrl}
								<Tooltip content="View Project. Note: May be internal or restricted access">
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="rounded-lg bg-white/5 p-2 transition-all hover:bg-white/10"
										aria-label="View Live Project"
									>
										<DirectLink
											className="h-5 w-5 text-gray-400 transition-colors hover:text-white"
										/>
									</a>
								</Tooltip>
							{/if}
						</div>
					</div>

					<!-- Project Title -->
					<h3 class="mb-3 text-2xl font-bold text-white">{project.title}</h3>

					<!-- Description -->
					<p class="mb-4 leading-relaxed text-gray-300">{project.description}</p>

					{#if project.longDescription}
						<p class="mb-4 text-sm leading-relaxed text-gray-400">{project.longDescription}</p>
					{/if}

					<!-- Technologies -->
					<div class="mt-auto flex flex-wrap gap-2">
						{#each project.technologies as tech}
							<span
								class="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
							>
								{tech}
							</span>
						{/each}
					</div>
				</GlassCard>
			{/each}
		</div>

		<!-- Other Projects -->
		{#if otherProjects.length > 0}
			<div>
				<h3 class="mb-8 text-2xl font-bold text-white">Other Projects</h3>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
					{#each otherProjects as project}
						<GlassCard hoverColor={project.categoryColor} class="flex flex-col">
							<!-- Header -->
							<div class="mb-3 flex items-start justify-between">
								<span
									class="rounded-full border border-{project.categoryColor}-400/30 bg-{project.categoryColor}-500/20 px-2 py-1 text-xs font-medium text-{project.categoryColor}-400"
								>
									{project.category}
								</span>
								<div class="flex gap-2">
									{#if project.githubUrl}
										<a
											href={project.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="rounded-lg bg-white/5 p-1.5 transition-all hover:bg-white/10"
											aria-label="View on GitHub"
										>
											<GitHub
												className="h-4 w-4 text-gray-400 transition-colors hover:text-white"
											/>
										</a>
									{/if}
									{#if project.liveUrl}
										<a
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="rounded-lg bg-white/5 p-1.5 transition-all hover:bg-white/10"
											aria-label="View Live Project"
										>
											<DirectLink
												className="h-4 w-4 text-gray-400 transition-colors hover:text-white"
											/>
										</a>
									{/if}
								</div>
							</div>

							<!-- Title -->
							<h4 class="mb-2 text-lg font-bold text-white">{project.title}</h4>

							<!-- Description -->
							<p class="mb-4 text-sm leading-relaxed text-gray-300">{project.description}</p>

							<!-- Technologies -->
							<div class="mt-auto flex flex-wrap gap-1.5">
								{#each project.technologies as tech}
									<span class="rounded bg-white/5 px-2 py-0.5 text-xs text-gray-400">
										{tech}
									</span>
								{/each}
							</div>
						</GlassCard>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>
