<script lang="ts">
	import GlassCard from '$lib/components/common/GlassCard.svelte';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import DirectLink from '$lib/components/icons/DirectLink.svelte';
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import type { Colors } from '$lib/types';

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
			title: 'SMB Agent Platform',
			description:
				'Production-ready multi-agent platform with supervisor architecture and ROI measurement for enterprise content generation.',
			longDescription:
				'Enterprise multi-agent system with Phase 5 Quality & Metrics (>300% ROI), Prometheus monitoring, circuit breakers, Redis session management, and MCP server integration. Production-approved with comprehensive Grafana dashboards.',
			technologies: [
				'Python',
				'LangChain',
				'FastAPI',
				'Redis',
				'Prometheus',
				'Grafana',
				'Docker',
				'OAuth2'
			],
			category: 'AI/ML',
			categoryColor: 'cyan',
			githubUrl: 'https://github.com/copresto/SMB-Support-Agent',
			featured: true
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
			title: 'DevOps Automation Suite (CodeShift)',
			description: 'CI/CD pipeline automation and deployment monitoring tools.',
			longDescription:
				'Streamlined deployment processes with automated testing, monitoring, and rollback capabilities.',
			technologies: [
				'Docker',
				'GitHub Actions',
				'Jenkins',
				'CloudBees',
				'Python',
				'OpenShift CAE',
				'Kubernetes'
			],
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
		},
		{
			title: 'SMBDev API Server',
			description: 'Web scraping and documentation management tool for Cisco product articles.',
			longDescription:
				'Full-stack application for scraping and managing Cisco product documentation articles. Built with FastAPI (Python) backend and SvelteKit (TypeScript) frontend.',
			technologies: ['SvelteKit', 'FastAPI', 'Python', 'TypeScript', 'BeautifulSoup'],
			category: 'Full Stack Development',
			categoryColor: 'blue',
			githubUrl: 'https://github.com/Cisco-DES/smbdev-api-server',
			featured: false
		},
		{
			title: 'CDT Transform App',
			description:
				'Document transformation tool that converts DOCX files into deployment-ready HTML packages.',
			longDescription:
				'Internal build tool that parses DOCX files, extracts content sections, images, and videos, then packages everything into HTML format with assets bundled for easy deployment.',
			technologies: ['SvelteKit', 'Node.js', 'TypeScript', 'HTML Parser', 'File Processing'],
			category: 'Web Development',
			categoryColor: 'orange',
			liveUrl: 'https://cdt-transformer-app-v1-converter.cisco.com/',
			githubUrl: 'https://github.com/Cisco-DES/cdt-transform-app-v1-converter',
			featured: false
		},
		{
			title: 'Harbor Elements Svelte',
			description:
				'TypeScript compiler that transforms Cisco Harbor Web Components into Svelte components.',
			longDescription:
				'Automated build tool that generates strongly-typed Svelte wrappers for Harbor Design System web components, providing Svelte 5 runes, snippets for slots, and full IDE autocomplete support.',
			technologies: ['TypeScript', 'Node.js', 'Svelte 5', 'Web Components', 'Stencil'],
			category: 'Plugin',
			categoryColor: 'green',
			githubUrl: 'https://github.com/jorcleme/elements-svelte',
			featured: true
		},
		{
			title: 'Hardened Node Alpine',
			description:
				'Security-hardened Docker base image with Cisco CA bundle compliance for enterprise Node.js apps.',
			longDescription:
				'PSB SEC-509-CA compliant Alpine Linux container with Node.js compiled against Cisco Core CA Bundle. Minimal footprint hardened image based on Cloud9 containers for secure deployment of Node.js applications to Cisco infrastructure.',
			technologies: ['Docker', 'Alpine Linux', 'Node.js', 'Security', 'DevOps'],
			category: 'DevOps',
			categoryColor: 'orange',
			githubUrl: 'https://github.com/jorcleme/hardened-node-alpine',
			featured: false
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
				<GlassCard
					hoverColor={project.categoryColor}
					class="group flex flex-col"
					testid="featured-project-{project.title.toLowerCase().replace(/\s+/g, '-')}"
				>
					<!-- Category Badge -->
					<div class="mb-4 flex items-center justify-between">
						<span
							class="rounded-full border border-{project.categoryColor}-400/30 bg-{project.categoryColor}-500/20 px-3 py-1 text-xs font-medium text-{project.categoryColor}-400"
							data-testid="project-category"
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
										data-testid="project-github-link"
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
										data-testid="project-live-link"
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
					<h3 class="mb-3 text-2xl font-bold text-white" data-testid="project-title">
						{project.title}
					</h3>

					<!-- Description -->
					<p class="mb-4 leading-relaxed text-gray-300" data-testid="project-description">
						{project.description}
					</p>

					{#if project.longDescription}
						<p
							class="mb-4 text-sm leading-relaxed text-gray-400"
							data-testid="project-long-description"
						>
							{project.longDescription}
						</p>
					{/if}

					<!-- Technologies -->
					<div class="mt-auto flex flex-wrap gap-2" data-testid="project-technologies">
						{#each project.technologies as tech}
							<span
								class="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
								data-testid="project-tech-{tech.toLowerCase().replace(/\s+/g, '-')}"
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
				<h3 class="mb-8 text-2xl font-bold text-white" data-testid="other-projects-header">
					Other Projects
				</h3>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
					{#each otherProjects as project}
						<GlassCard
							hoverColor={project.categoryColor}
							class="flex flex-col"
							testid="other-project-{project.title.toLowerCase().replace(/\s+/g, '-')}"
						>
							<!-- Header -->
							<div class="mb-3 flex items-start justify-between">
								<span
									class="rounded-full border border-{project.categoryColor}-400/30 bg-{project.categoryColor}-500/20 px-2 py-1 text-xs font-medium text-{project.categoryColor}-400"
									data-testid="project-category"
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
											data-testid="project-github-link"
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
											data-testid="project-live-link"
										>
											<DirectLink
												className="h-4 w-4 text-gray-400 transition-colors hover:text-white"
											/>
										</a>
									{/if}
								</div>
							</div>

							<!-- Title -->
							<h4 class="mb-2 text-lg font-bold text-white" data-testid="project-title">
								{project.title}
							</h4>

							<!-- Description -->
							<p
								class="mb-4 text-sm leading-relaxed text-gray-300"
								data-testid="project-description"
							>
								{project.description}
							</p>

							<!-- Technologies -->
							<div class="mt-auto flex flex-wrap gap-1.5" data-testid="project-technologies">
								{#each project.technologies as tech}
									<span
										class="rounded bg-white/5 px-2 py-0.5 text-xs text-gray-400"
										data-testid="project-tech-{tech.toLowerCase().replace(/\s+/g, '-')}"
									>
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
