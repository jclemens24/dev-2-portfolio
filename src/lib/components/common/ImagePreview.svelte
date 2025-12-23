<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	interface Props {
		src: string;
		alt: string;
		thumbnailClass?: string;
		previewScale?: number;
		position?:
			| 'left'
			| 'right'
			| 'top'
			| 'bottom'
			| 'top-left'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-right';
	}

	let { src, alt, thumbnailClass = '', previewScale = 4, position = 'left' }: Props = $props();

	let isHovered = $state(false);
	let touchTimeout: ReturnType<typeof setTimeout> | null = null;

	function handleTouchStart(e: TouchEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		e.preventDefault();
		isHovered = true;
		// Auto-hide after 3 seconds on touch devices
		touchTimeout = setTimeout(() => {
			isHovered = false;
		}, 3000);
	}

	function handleTouchEnd(e: TouchEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		if (touchTimeout) {
			clearTimeout(touchTimeout);
		}
		isHovered = false;
	}

	const positionClasses = {
		left: 'right-full mr-4 top-1/2 -translate-y-1/2',
		right: 'left-full ml-4 top-1/2 -translate-y-1/2',
		top: 'bottom-full mb-4 left-1/2 -translate-x-1/2',
		bottom: 'top-full mt-4 left-1/2 -translate-x-1/2',
		'top-left': 'bottom-full right-full mb-4 mr-4',
		'top-right': 'bottom-full left-full mb-4 ml-4',
		'bottom-left': 'top-full right-full mt-4 mr-4',
		'bottom-right': 'top-full left-full mt-4 ml-4'
	};
</script>

<div
	role="img"
	class="relative inline-block"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
	ontouchcancel={handleTouchEnd}
>
	<!-- Thumbnail -->
	<img {src} {alt} class={thumbnailClass} />

	<!-- Preview on Hover -->
	{#if isHovered}
		<div
			class="pointer-events-none absolute z-50 {positionClasses[position]}"
			style="width: {previewScale * 100}%;"
		>
			<div
				transition:fly={{ y: 10, duration: 200, easing: cubicInOut }}
				class="glass animate-glow overflow-hidden rounded-2xl border border-white/20 shadow-2xl duration-300"
			>
				<img {src} {alt} class="h-full w-full object-cover" />
			</div>
		</div>
	{/if}
</div>
