<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
		testid?: string;
	}

	let { children, class: className = '', testid = '' }: Props = $props();
</script>

<div
	{...testid ? { 'data-testid': testid } : {}}
	class="group relative glass overflow-hidden rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:border-blue-500/30 {className}"
>
	<div
		class="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10"
	></div>
	<div class="relative z-10">
		{@render children()}
	</div>
</div>
