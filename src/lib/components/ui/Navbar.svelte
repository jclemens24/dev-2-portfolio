<script lang="ts">
	import pic from '$lib/assets/feature_dev.jpg';
	import { DropdownMenu } from 'bits-ui';

	import Dropdown from '../common/Dropdown.svelte';
	import ImagePreview from '../common/ImagePreview.svelte';
	import Menu from '../icons/Menu.svelte';

	const btns = $state([
		{ name: 'home', href: '#home' },
		{ name: 'about', href: '#about' },
		{ name: 'experience', href: '#experience' },
		{ name: 'skills', href: '#skills' },
		{ name: 'projects', href: '#projects' },
		{ name: 'achievements', href: '#achievements' },
		{ name: 'contact', href: '#contact' }
	]);

	let show = $state(false);

	async function scrollToSection(href: string) {
		window.location.href = href;
		// const targetId = href.replace('#', '');
		// const targetElement = document.getElementById(targetId);
		// console.log('targetElement: ', targetElement);

		// targetElement?.scrollIntoView({
		// 	behavior: 'smooth',
		// 	block: 'start'
		// });
	}
</script>

<nav class="sticky top-0 right-0 left-0 z-50 w-full">
	<div class="flex glass items-center justify-between border-none px-5 py-2.5">
		<!-- Desktop Navigation - Hidden on small screens -->
		<div class="hidden items-center gap-0.5 md:flex">
			{#each btns as btn, i (i)}
				<button
					data-testid={btn.name}
					onclick={async () => await scrollToSection(btn.href)}
					class="group relative rounded-full font-roboto text-sm text-white/70 capitalize transition-all duration-300 hover:bg-white/10"
				>
					{btn.name}
				</button>
			{/each}
		</div>

		<!-- Mobile Navigation - Visible only on small screens -->
		<div class="md:hidden">
			<Dropdown bind:show side="bottom" align="end">
				{#snippet trigger()}
					<Menu className="h-6 w-6" />
				{/snippet}
				{#snippet children()}
					{#each btns as btn, i (i)}
						<DropdownMenu.Item class="flex items-center px-3 py-2 text-sm font-medium">
							<button
								data-testid={`mobile-${btn.name}`}
								onclick={async () => await scrollToSection(btn.href)}
								class="w-full rounded-md px-4 py-2.5 text-left font-roboto text-sm text-white/80 capitalize transition-all duration-200 hover:bg-white/10 hover:text-white"
							>
								{btn.name}
							</button>
						</DropdownMenu.Item>
					{/each}
				{/snippet}
			</Dropdown>
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
