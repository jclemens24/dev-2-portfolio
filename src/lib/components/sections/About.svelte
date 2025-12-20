<script lang="ts">
	import Basketball from '../icons/Basketball.svelte';
	import Bicycle from '../icons/Bicycle.svelte';
	import Education from '../icons/Education.svelte';
	import Calendar from '../icons/Calendar.svelte';
	import FishMultiple from '../icons/FishMultiple.svelte';
	import Mountain from '../icons/Mountain.svelte';
	import Location from '../icons/Location.svelte';
	import Running from '../icons/Running.svelte';
	import User from '../icons/User.svelte';
	import WorshipChristian from '../icons/WorshipChristian.svelte';
	import Tooltip from '../common/Tooltip.svelte';
	import GlassCard from '../common/GlassCard.svelte';
	import FeatureCard from '../common/FeatureCard.svelte';
	import StatBadge from '../common/StatBadge.svelte';

	const downloadResume = () => {
		const link = document.createElement('a');
		link.href = '/Jordan_Clemens_Resume_2025.docx';
		link.download = 'Jordan_Clemens_Resume_2025.docx';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const previewResume = () => {
		window.open('/Jordan_Clemens_Resume_2025.pdf', '_blank');
	};
</script>

<section id="about">
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl"
			style="transform: scale(1.1) rotate(45deg);"
		></div>
		<div
			class="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"
			style="transform: scale(1.2) rotate(120deg);"
		></div>
		<div
			class="absolute bottom-20 left-10 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl"
			style="transform: scale(0.9) rotate(200deg);"
		></div>
		<div
			class="absolute right-20 bottom-40 h-64 w-64 rounded-full bg-pink-500/5 blur-3xl"
			style="transform: scale(1.15) rotate(300deg);"
		></div>
	</div>
	<div class="relative z-10 mx-auto max-w-4xl">
		<div class="mb-8 flex flex-col items-center justify-center space-y-6 text-center">
			<h2
				class="mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
			>
				About Me
			</h2>
			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
				I'm a full-stack engineer and AI enthusiast with over 7 years of experience crafting
				high-impact web applications for Fortune 500 companies and mission-driven teams. Currently,
				I build intelligent, user-first experiences at Cisco, where I architected an AI-powered
				platform that earned a U.S. patent and serves thousands of engineers daily. From SvelteKit
				frontends to FastAPI backends, I thrive at the intersection of modern web tech and
				cutting-edge AI—turning complex problems into elegant, scalable solutions.
			</p>
		</div>
		<div class="grid auto-cols-fr gap-8 lg:items-stretch">
			<!-- Education Column -->
			<div class="flex flex-col">
				<div class="mb-8 flex items-center gap-3">
					<Education className="h-8 w-8 text-blue-400" />
					<h3
						class="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent"
					>
						Education
					</h3>
				</div>
				<div class="flex-1 space-y-6">
					<GlassCard>
						<div class="my-4 flex items-start justify-between">
							<div>
								<h4 class="mb-4 font-bold text-white">
									Bachelor of Science in Information Sciences & Technologies
								</h4>
								<p class="mb-4 font-semibold text-blue-400">Penn State University</p>
							</div>
							<div class="flex flex-col justify-center gap-2">
								<StatBadge value="Dean's List" label="6x" gradient={true} />
								<StatBadge value="3.85" label="GPA" />
							</div>
						</div>
						<div class="flex items-stretch gap-4 text-sm text-muted-foreground">
							<div class="flex items-center gap-1">
								<Calendar className="h-4 w-4" />
								Graduated March 2022
							</div>
							<div class="flex items-center gap-1">
								<Location className="h-4 w-4" />
								State College, PA
							</div>
						</div>
					</GlassCard>
				</div>
			</div>

			<!-- Resume Column -->
			<div class="flex flex-col">
				<div class="mb-8 flex items-center gap-3">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-red-800 to-orange-500"
					>
						<span class="text-sm font-bold text-white">CV</span>
					</div>
					<h3
						class="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent"
					>
						Resume
					</h3>
				</div>
				<div class="flex-1">
					<FeatureCard>
						<div class="mb-6 flex items-center gap-4">
							<div
								class="relative rounded-2xl border border-blue-400/30 bg-linear-to-br from-blue-500/20 to-purple-500/20 p-4"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8 text-blue-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
									<path d="M14 2v4a2 2 0 0 0 2 2h4" />
									<path d="M10 9H8" />
									<path d="M16 13H8" />
									<path d="M16 17H8" />
								</svg>
							</div>
							<div>
								<h3 class="mb-2 font-bold text-white">Resume / CV</h3>
								<p class="text-gray-400">
									7+ years building full-stack solutions at Cisco, open-source, and beyond. Download
									or preview my full professional journey.
								</p>
							</div>
						</div>
						<div class="flex gap-3">
							<Tooltip content="Download Resume">
								<button
									aria-label="Download Resume"
									onclick={downloadResume}
									class="group/btn flex glass items-center gap-2 rounded-xl border border-blue-400/30 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/10"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-blue-400 transition-transform group-hover/btn:translate-y-0.5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path d="M12 15V3" />
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
										<path d="m7 10 5 5 5-5" />
									</svg>
									Download
								</button>
							</Tooltip>

							<Tooltip content="Preview Resume">
								<button
									aria-label="Preview Resume"
									onclick={previewResume}
									class="group/preview glass rounded-xl border border-white/10 p-2.5 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-gray-400 transition-colors group-hover/preview:text-cyan-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
										/>
										<circle cx="12" cy="12" r="3" />
									</svg>
								</button>
							</Tooltip>
						</div>
					</FeatureCard>
				</div>
			</div>
			<!-- Beyond Code Section -->
			<div class="mt-12">
				<div class="mb-8 flex items-center gap-3">
					<User className="h-8 w-8 text-purple-400" />
					<h3
						class="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent"
					>
						Beyond Code
					</h3>
				</div>
				<GlassCard>
					<p class="mb-6 text-gray-300">
						When I'm not building software, I'm building memories with my amazing family — my wife
						Kayla and our son Luka. Here's what keeps me grounded:
					</p>
					<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<div class="flex items-center gap-3 rounded-xl bg-white/5 p-3">
							<WorshipChristian className="size-6 text-cyan-400" />
							<span class="text-sm text-gray-300">Church & scripture reading</span>
						</div>
						<div class="flex items-center gap-3 rounded-xl bg-white/5 p-3">
							<Basketball className="size-6 text-orange-400" />
							<span class="text-sm text-gray-300">Basketball, baseball & football</span>
						</div>
						<div class="flex items-center gap-3 rounded-xl bg-white/5 p-3">
							<FishMultiple className="size-6 text-emerald-400" />
							<span class="text-sm text-gray-300">Fishing & hunting</span>
						</div>
						<div class="flex items-center gap-3 rounded-xl bg-white/5 p-3">
							<Mountain className="size-6 text-blue-400" />
							<span class="text-sm text-gray-300">The great outdoors</span>
						</div>
						<div class="flex items-center gap-3 rounded-xl bg-white/5 p-3">
							<Bicycle className="size-6 text-pink-400" />
							<span class="text-sm text-gray-300">Dirt bike riding</span>
						</div>
						<div class="flex items-center gap-3 rounded-xl bg-white/5 p-3">
							<Running className="size-6 text-red-400" />
							<span class="text-sm text-gray-300">Working out</span>
						</div>
					</div>
				</GlassCard>
			</div>
		</div>
	</div>
</section>
