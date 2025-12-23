<script lang="ts">
	import Github from '$lib/components/icons/GitHub.svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';
	import Mail from '$lib/components/icons/Mail.svelte';

	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			name: 'GitHub',
			href: 'https://github.com/jorcleme',
			icon: Github,
			label: 'View my GitHub profile'
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/jordan-m-clemens/',
			icon: Linkedin,
			label: 'Connect on LinkedIn'
		},
		{
			name: 'Email',
			href: 'mailto:jordanclemens1986@gmail.com',
			icon: Mail,
			label: 'Send me an email'
		}
	];

	const footerLinks = [
		{
			title: 'Navigation',
			links: [
				{ name: 'Home', href: '#home' },
				{ name: 'About', href: '#about' },
				{ name: 'Skills', href: '#skills' },
				{ name: 'Experience', href: '#experience' }
			]
		},
		{
			title: 'More',
			links: [
				{ name: 'Projects', href: '#projects' },
				{ name: 'Achievements', href: '#achievements' },
				{ name: 'Contact', href: '#contact' }
			]
		}
	];

	function scrollToSection(href: string) {
		const id = href.replace('#', '');
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<footer class="relative border-t border-white/10 bg-black/40 backdrop-blur-xl">
	<!-- Background Gradient -->
	<div class="absolute inset-0 overflow-hidden">
		<div class="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl"></div>
		<div class="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"></div>
	</div>

	<div class="relative z-10 mx-auto max-w-6xl px-4 py-12">
		<!-- Main Footer Content -->
		<div class="grid gap-12 md:grid-cols-3">
			<!-- Brand Section -->
			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-500/20 to-blue-500/20"
					>
						<span class="text-2xl font-bold text-white">JC</span>
					</div>
					<div>
						<h3 data-testid="footer-name" class="text-xl font-bold text-white">Jordan Clemens</h3>
						<p class="text-sm text-gray-400">Software Engineer</p>
					</div>
				</div>
				<p class="text-sm leading-relaxed text-gray-400">
					Building innovative solutions with AI, full-stack development, and a passion for creating
					exceptional user experiences.
				</p>
				<!-- Social Links -->
				<div class="flex gap-3">
					{#each socialLinks as social}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.label}
							class="group flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10"
						>
							<svelte:component
								this={social.icon}
								className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-purple-400"
							/>
						</a>
					{/each}
				</div>
			</div>

			<!-- Navigation Links -->
			{#each footerLinks as section}
				<div class="space-y-4">
					<h4 class="text-sm font-semibold tracking-wider text-gray-300 uppercase">
						{section.title}
					</h4>
					<ul class="space-y-2">
						{#each section.links as link}
							<li>
								<button
									onclick={() => scrollToSection(link.href)}
									class="text-sm text-gray-400 transition-colors duration-300 hover:text-purple-400"
								>
									{link.name}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Divider -->
		<div class="my-8 border-t border-white/10"></div>

		<!-- Bottom Footer -->
		<div class="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
			<div class="flex items-center gap-2">
				<span>© {currentYear} Jordan Clemens.</span>
				<span class="hidden md:inline">All rights reserved.</span>
			</div>

			<div class="flex items-center gap-4">
				<span class="flex items-center gap-2">
					Built with
					<span data-testid="footer-sveltekit" class="text-purple-400">SvelteKit</span>
					&
					<span class="text-blue-400">Tailwind CSS</span>
				</span>
			</div>

			<div class="flex items-center gap-1">
				<span>Made with</span>
				<span class="animate-pulse text-red-500">❤️</span>
				<span>and ☕</span>
			</div>
		</div>
	</div>
</footer>
