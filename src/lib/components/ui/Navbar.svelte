<script lang="ts">
	import pic from '$lib/assets/feature_dev.jpg';

	import ImagePreview from '../common/ImagePreview.svelte';

	const btns = $state([
		{ name: 'home', href: '#home' },
		{ name: 'about', href: '#about' },
		{ name: 'experience', href: '#experience' },
		{ name: 'skills', href: '#skills' },
		{ name: 'projects', href: '#projects' },
		{ name: 'achievements', href: '#achievements' },
		{ name: 'contact', href: '#contact' }
	]);

	function scrollToSection(href: string) {
		const targetId = href.replace('#', '');
		const targetElement = document.getElementById(targetId);
		console.log('targetElement: ', targetElement);
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}
</script>

<nav class="sticky top-0 right-0 left-0 z-50 w-full">
	<div class="flex glass items-center justify-between border-none px-5 py-2.5">
		<div class="flex items-center gap-0.5">
			{#each btns as btn, i (i)}
				<button
					data-testid={btn.name}
					onclick={() => scrollToSection(btn.href)}
					class="group relative rounded-full p-3 font-roboto text-sm text-white/70 capitalize transition-all duration-300 hover:bg-white/10"
				>
					{btn.name}
				</button>
			{/each}
		</div>
		<div>
			<ImagePreview
				src={pic}
				alt="Jordan Clemens"
				thumbnailClass="h-10 w-10 rounded-full border border-white/30 cursor-pointer transition-transform hover:scale-110"
				previewScale={4.5}
				position="bottom-left"
			/>
		</div>
	</div>
</nav>
