<script lang="ts">
	import FeatureCard from '../common/FeatureCard.svelte';
	import GlassCard from '../common/GlassCard.svelte';
	import Trophy from '../icons/Trophy.svelte';

	type Achievement = {
		title: string;
		subtitle: string;
		organization: string;
		date: string;
		description: string;
		highlights: string[];
		icon: string;
		color: 'blue' | 'purple' | 'cyan' | 'green' | 'orange' | 'gold' | 'yellow';
		type: 'patent' | 'award' | 'recognition';
	};

	const achievements: Achievement[] = [
		{
			title: 'U.S. Patent',
			subtitle: 'AI-Powered Documentation Platform',
			organization: 'United States Patent and Trademark Office',
			date: 'Patent No: 12,395,410 - Issued 2025',
			description:
				'Awarded patent for innovative AI-powered platform architecture that revolutionizes how engineers interact with technical documentation.',
			highlights: [
				'Serves 1,000+ engineers daily at Cisco Systems',
				'Leverages LangChain, OpenAI, and RAG architecture',
				'85% improvement in documentation query accuracy',
				'Reduced information retrieval time by 70%'
			],
			icon: '🏆',
			color: 'yellow',
			type: 'patent'
		},
		{
			title: 'Navy Achievement Medal',
			subtitle: 'Outstanding Professional Achievement',
			organization: 'United States Marine Corps',
			date: 'Awarded 2011-2018',
			description:
				'Recognized with the Navy Achievement Medal (NAM), the fourth-highest peacetime military decoration, for exceptional professional achievement and superior performance of duty.',
			highlights: [
				'Demonstrated exceptional leadership in high-pressure environments',
				'Led teams of 15-30 personnel in complex operations',
				'Managed multi-million dollar logistics and coordination',
				'Set apart from peers through meritorious service'
			],
			icon: '🎖️',
			color: 'blue',
			type: 'award'
		}
	];
</script>

<section id="achievements" class="relative py-20">
	<!-- Background Orbs -->
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-yellow-500/5 blur-3xl"
			style="transform: scale(1.2) rotate(30deg);"
		></div>
		<div
			class="absolute right-1/4 bottom-10 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl"
			style="transform: scale(1.1) rotate(150deg);"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<!-- Section Header -->
		<div class="mb-16 flex flex-col items-center justify-center space-y-6 text-center">
			<h2
				class="mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
			>
				Achievements & Recognition
			</h2>
			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-white/40">
				Recognition for innovation, leadership, and exceptional service—from patented AI technology
				to military honors.
			</p>
		</div>

		<!-- Achievements Grid -->
		<div class="grid gap-8 md:grid-cols-2">
			{#each achievements as achievement}
				<FeatureCard testid="achievement-{achievement.type}">
					<!-- Achievement Header -->
					<div class="mb-6 flex items-start gap-4">
						<!-- Icon -->
						<div
							class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-yellow-500/20 to-yellow-600/20 text-4xl"
							data-testid="achievement-icon"
						>
							{achievement.icon}
						</div>

						<!-- Title and Subtitle -->
						<div class="flex-1">
							<h3 class="mb-1 text-2xl font-bold text-white" data-testid="achievement-title">
								{achievement.title}
							</h3>
							<p
								class="text-sm font-semibold text-{achievement.color}-400"
								data-testid="achievement-subtitle"
							>
								{achievement.subtitle}
							</p>
						</div>
					</div>

					<!-- Organization and Date -->
					<div class="mb-4 space-y-1">
						<div class="flex items-center gap-2">
							<Trophy className="h-4 w-4 text-gray-400" />
							<p class="text-sm font-medium text-muted-foreground" data-testid="achievement-org">
								{achievement.organization}
							</p>
						</div>
						<p class="text-xs text-gray-400" data-testid="achievement-date">{achievement.date}</p>
					</div>

					<!-- Description -->
					<p
						class="mb-6 leading-relaxed text-muted-foreground"
						data-testid="achievement-description"
					>
						{achievement.description}
					</p>

					<!-- Highlights -->
					<div class="space-y-3">
						<h4
							class="text-sm font-semibold tracking-wide text-gray-400 uppercase"
							data-testid="achievement-highlights-header"
						>
							Key Impact
						</h4>
						<div class="space-y-2" data-testid="achievement-highlights">
							{#each achievement.highlights as highlight}
								<div class="flex items-start gap-3">
									<div class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"></div>
									<p class="text-sm leading-relaxed text-muted-foreground">{highlight}</p>
								</div>
							{/each}
						</div>
					</div>
				</FeatureCard>
			{/each}
		</div>

		<!-- Additional Recognition Section -->
		<div class="mt-12">
			<GlassCard class="text-center" testid="other-recognitions">
				<h3 class="mb-4 text-xl font-bold text-white" data-testid="other-recognitions-header">
					Other Recognitions
				</h3>
				<div class="flex flex-wrap items-center justify-center gap-6">
					<div class="flex items-center gap-2 text-gray-300" data-testid="recognition-deans-list">
						<span class="text-2xl">🎓</span>
						<span class="text-sm">Dean's List (6x) - Penn State</span>
					</div>
					<div class="flex items-center gap-2 text-gray-300" data-testid="recognition-gpa">
						<span class="text-2xl">⭐</span>
						<span class="text-sm">3.85 GPA - Information Sciences</span>
					</div>
					<div class="flex items-center gap-2 text-gray-300" data-testid="recognition-excellence">
						<span class="text-2xl">🚀</span>
						<span class="text-sm">Fortune 500 Engineering Excellence</span>
					</div>
				</div>
			</GlassCard>
		</div>
	</div>
</section>
