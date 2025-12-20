<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Colors } from '$lib/types';

	interface Props {
		children: Snippet;
		class?: string;
		hoverColor?: Colors;
	}

	let { children, class: className = '', hoverColor = 'purple' }: Props = $props();

	const hoverColors = {
		purple: 'hover:border-purple-500/30',
		blue: 'hover:border-blue-500/30',
		cyan: 'hover:border-cyan-500/30',
		green: 'hover:border-green-500/30',
		pink: 'hover:border-pink-500/30',
		emerald: 'hover:border-emerald-500/30',
		violet: 'hover:border-violet-500/30',
		gray: 'hover:border-gray-500/30',
		orange: 'hover:border-orange-500/30',
		red: 'hover:border-red-500/30'
	};
</script>

<div
	class="group glass rounded-2xl border border-white/10 p-6 transition-all duration-300 {hoverColors[
		hoverColor
	]} {className}"
>
	{@render children()}
</div>
