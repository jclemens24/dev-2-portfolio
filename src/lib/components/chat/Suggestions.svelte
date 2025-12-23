<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import { onMount } from 'svelte';

	type Props = {
		handlePromptClick: (prompt: string) => Promise<void>;
	};

	let { handlePromptClick }: Props = $props();

	let currentPromptIndex = $state(0);
	const suggestedPrompts = [
		"✨ What's your background in research?",
		'🚀 Tell me about your AI-powered projects',
		'💻 What technologies do you specialize in?',
		"🎯 What's your experience with LLMs?",
		'🔧 How do you approach full-stack development?',
		"📚 What's your latest work at Cisco?"
	];

	onMount(() => {
		// Carousel animation - cycle through prompts every 4 seconds
		const interval = setInterval(() => {
			currentPromptIndex = (currentPromptIndex + 1) % suggestedPrompts.length;
		}, 4000);

		return () => clearInterval(interval);
	});
</script>

<div class="shrink-0 rounded-t-2xl border-b border-white/10 bg-white/5 p-3">
	<div class="flex w-full items-center gap-2">
		<div class="relative h-10 flex-1 overflow-hidden">
			{#key currentPromptIndex}
				<button
					onclick={async () => await handlePromptClick(suggestedPrompts[currentPromptIndex])}
					in:fly={{ y: 20, duration: 400, easing: quintOut }}
					out:fly={{ y: -20, duration: 200 }}
					class="absolute inset-0 w-fit rounded-full border border-purple-500/30 bg-linear-to-r from-blue-500/20 to-violet-500/20 px-4 py-2 text-left text-sm text-gray-50 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 hover:from-blue-500/30 hover:to-violet-500/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
				>
					{suggestedPrompts[currentPromptIndex]}
				</button>
			{/key}
		</div>
	</div>
</div>
