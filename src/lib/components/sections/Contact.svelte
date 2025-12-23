<script lang="ts">
	import GlassCard from '$lib/components/common/GlassCard.svelte';
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';
	import Mail from '$lib/components/icons/Mail.svelte';

	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	let submitStatus = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		submitStatus = 'sending';
		errorMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			submitStatus = 'success';
			// Reset form after successful submission
			formData = {
				name: '',
				email: '',
				subject: '',
				message: ''
			};

			// Reset success message after 5 seconds
			setTimeout(() => {
				submitStatus = 'idle';
			}, 5000);
		} catch (error) {
			submitStatus = 'error';
			errorMessage = 'Failed to send message. Please try again or email me directly.';
		}
	}

	const socialLinks = [
		{
			name: 'Email',
			href: 'mailto:jordanclemens1986@gmail.com',
			icon: Mail,
			label: 'jordanclemens1986@gmail.com',
			color: 'blue'
		},
		{
			name: 'GitHub',
			href: 'https://github.com/jorcleme',
			icon: GitHub,
			label: '@jorcleme',
			color: 'purple'
		},
		{
			name: 'LinkedIn',
			href: 'https://linkedin.com/in/jordan-m-clemens',
			icon: Linkedin,
			label: 'Jordan Clemens',
			color: 'cyan'
		}
	];
</script>

<section id="contact" class="relative py-20">
	<!-- Background Orbs -->
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="absolute top-20 left-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"
			style="transform: scale(1.3) rotate(45deg);"
		></div>
		<div
			class="absolute right-1/3 bottom-20 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl"
			style="transform: scale(1.2) rotate(120deg);"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<!-- Section Header -->
		<div class="mb-16 flex flex-col items-center justify-center space-y-6 text-center">
			<h2
				class="mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
			>
				Get In Touch
			</h2>
			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-white/40">
				Have a project in mind or want to collaborate? I'm always open to discussing new
				opportunities, innovative ideas, or just connecting with fellow developers.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Contact Form -->
			<div class="lg:col-span-2">
				<GlassCard hoverColor="blue">
					<h3 class="mb-6 text-2xl font-bold text-white">Send a Message</h3>

					<form onsubmit={handleSubmit} class="space-y-6">
						<!-- Name and Email Row -->
						<div class="grid gap-6 md:grid-cols-2">
							<!-- Name Input -->
							<div>
								<label for="name" class="mb-2 block text-sm font-medium text-gray-300">
									Your Name
								</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									required
									class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
									placeholder="John Doe"
								/>
							</div>

							<!-- Email Input -->
							<div>
								<label
									for="email"
									data-testid="email-label"
									class="mb-2 block text-sm font-medium text-gray-300"
								>
									Your Email
								</label>
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									required
									class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
									placeholder="john@example.com"
								/>
							</div>
						</div>

						<!-- Subject Input -->
						<div>
							<label for="subject" class="mb-2 block text-sm font-medium text-gray-300">
								Subject
							</label>
							<input
								type="text"
								id="subject"
								bind:value={formData.subject}
								required
								class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
								placeholder="Project Inquiry"
							/>
						</div>

						<!-- Message Textarea -->
						<div>
							<label for="message" class="mb-2 block text-sm font-medium text-gray-300">
								Message
							</label>
							<textarea
								id="message"
								bind:value={formData.message}
								required
								rows="6"
								class="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
								placeholder="Tell me about your project or inquiry..."
							></textarea>
						</div>

						<!-- Submit Button -->
						<button
							type="submit"
							disabled={submitStatus === 'sending'}
							class="group relative w-full overflow-hidden rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:from-blue-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<span class="relative z-10 flex items-center justify-center gap-2">
								{#if submitStatus === 'sending'}
									<svg
										class="h-5 w-5 animate-spin"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Sending...
								{:else if submitStatus === 'success'}
									<svg
										class="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									Message Sent!
								{:else}
									<Mail className="h-5 w-5" />
									Send Message
								{/if}
							</span>
							<div
								class="absolute inset-0 z-0 bg-linear-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
							></div>
						</button>

						<!-- Success/Error Messages -->
						{#if submitStatus === 'success'}
							<div
								class="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center text-sm text-green-400"
							>
								Thanks for reaching out! I'll get back to you as soon as possible.
							</div>
						{/if}

						{#if submitStatus === 'error'}
							<div
								class="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400"
							>
								{errorMessage}
							</div>
						{/if}
					</form>
				</GlassCard>
			</div>

			<!-- Contact Info & Social Links -->
			<div class="space-y-8">
				<!-- Direct Contact Card -->
				<GlassCard hoverColor="purple">
					<h3 class="mb-6 text-xl font-bold text-white">Connect With Me</h3>
					<div class="space-y-4">
						{#each socialLinks as link}
							<a
								href={link.href}
								data-testid={'social-link-' + link.name.toLowerCase()}
								target="_blank"
								rel="noopener noreferrer"
								class="group flex items-center gap-4 rounded-lg border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-{link.color}-500/30 hover:bg-white/10"
							>
								<div
									class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-{link.color}-500/10 text-{link.color}-400 transition-transform duration-300 group-hover:scale-110"
								>
									<link.icon className="h-6 w-6" />
								</div>
								<div class="flex-1">
									<p class="text-sm font-semibold text-white">{link.name}</p>
									<p class="text-xs text-gray-400">{link.label}</p>
								</div>
								<svg
									class="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									></path>
								</svg>
							</a>
						{/each}
					</div>
				</GlassCard>

				<!-- Availability Card -->
				<GlassCard hoverColor="cyan">
					<h3 class="mb-4 text-xl font-bold text-white">Availability</h3>
					<div class="space-y-4">
						<div class="flex items-start gap-3">
							<div class="mt-1 h-3 w-3 shrink-0 animate-pulse rounded-full bg-green-500"></div>
							<div>
								<p class="text-sm font-semibold text-white">Open to Opportunities</p>
								<p class="text-xs text-gray-400">
									Available for freelance projects and consultations
								</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<div class="mt-1 h-3 w-3 shrink-0 rounded-full bg-blue-500"></div>
							<div>
								<p class="text-sm font-semibold text-white">Response Time</p>
								<p class="text-xs text-gray-400">Usually within 24-48 hours</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<div class="mt-1 h-3 w-3 shrink-0 rounded-full bg-purple-500"></div>
							<div>
								<p class="text-sm font-semibold text-white">Collaboration</p>
								<p class="text-xs text-gray-400">
									Excited about innovative projects and partnerships
								</p>
							</div>
						</div>
					</div>
				</GlassCard>
			</div>
		</div>
	</div>
</section>
