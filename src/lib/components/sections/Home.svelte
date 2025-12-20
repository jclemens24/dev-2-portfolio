<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import FloatingBackground from '$lib/components/common/FloatingBackground.svelte';
	import GitHub from '../icons/GitHub.svelte';

	// Icon SVGs as inline components for better control
	const MapPinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"/></svg>`;
	const EnvelopeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-8,144H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/></svg>`;
	const LinkedinLogoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"/></svg>`;

	// Animation state
	let visible = $state(true);

	const downloadResume = () => {
		const a = document.createElement('a');
		a.href = 'Jordan_Clemens_Resume_2025.pdf';
		a.download = 'Jordan_Clemens_Resume_2025.pdf';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	function customFade(
		node: HTMLElement,
		{ delay = 0, duration = 800 }
	): {
		delay: number;
		duration: number;
		css: (t: number) => string;
	} {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = cubicOut(t);
				return `
					opacity: ${eased};
					transform: translateY(${(1 - eased) * 20}px);
				`;
			}
		};
	}
</script>

<section id="home">
	<div
		class="relative mt-12 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 md:mt-0"
	>
		<FloatingBackground />
		<div
			class="relative z-10 mx-auto max-w-4xl glass animate-float rounded-2xl p-6 text-center md:p-12"
		>
			{#if visible}
				<div in:customFade={{ duration: 800, delay: 200 }}>
					<h1
						class="mb-6 bg-linear-to-r from-sky-200 to-blue-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
					>
						Jordan Clemens
					</h1>

					<div
						in:fade={{ delay: 200, duration: 800 }}
						class="mb-8 text-lg text-gray-200 md:text-xl"
					>
						<span class="text-sunset-gradient">AI Engineer</span>
						{' & '}
						<span class="text-sunset-gradient">Full Stack Developer</span>
					</div>

					<div
						in:fade={{ delay: 400, duration: 800 }}
						class="mb-8 flex flex-wrap justify-center gap-6 text-sm text-gray-200"
					>
						<div class="flex items-center gap-2">
							{@html MapPinIcon}
							<span>Goldsboro, NC</span>
						</div>
						<div class="flex items-center gap-2">
							{@html EnvelopeIcon}
							<span>jordanclemens1986@gmail.com</span>
						</div>
					</div>

					<div
						in:fade={{ delay: 600, duration: 800 }}
						class="flex flex-col items-center justify-center gap-6 text-gray-200 sm:flex-row"
					>
						<div class="flex items-center gap-4">
							<a href="https://github.com/jclemens24" class="group glass rounded-2xl p-3">
								<GitHub className="size-6" />
							</a>
							<a href="https://linkedin.com/in/jclemens24" class="group glass rounded-2xl p-3">
								{@html LinkedinLogoIcon}
							</a>
							<button
								onclick={() => downloadResume()}
								class="relative flex animate-glow items-center gap-3 overflow-hidden rounded-2xl bg-linear-to-r from-purple-500 to-pink-400 px-6 py-3 font-bold text-white"
							>
								Download CV
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="mt-12">
			<div class="inline-block animate-scroll-bounce">
				<div class="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
					<div class="mt-2 h-3 w-1 animate-scroll-dot rounded-full bg-white/60"></div>
				</div>
			</div>
		</div>
	</div>
</section>
