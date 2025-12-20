<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		delay?: number;
		direction?: 'up' | 'down' | 'left' | 'right';
		class?: string;
	}

	let { children, delay = 0, direction = 'up', class: className = '' }: Props = $props();

	let elementRef = $state<HTMLElement | null>(null);
	let isVisible = $state(false);

	const directionClasses = {
		up: 'translate-y-16',
		down: '-translate-y-16',
		left: 'translate-x-16',
		right: '-translate-x-16'
	};

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -100px 0px'
			}
		);

		if (elementRef) {
			observer.observe(elementRef);
		}

		return () => {
			if (elementRef) {
				observer.unobserve(elementRef);
			}
		};
	});
</script>

<div
	bind:this={elementRef}
	class="transition-all duration-1000 ease-out {isVisible
		? 'translate-x-0 translate-y-0 opacity-100'
		: `opacity-0 ${directionClasses[direction]}`} {className}"
	style="transition-delay: {delay}ms;"
>
	{@render children()}
</div>
