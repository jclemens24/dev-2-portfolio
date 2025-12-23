<script lang="ts">
	import { fade } from 'svelte/transition';

	import { type Snippet, onDestroy } from 'svelte';

	type Props = {
		show?: boolean;
		size?: 'full' | 'xs' | 'sm' | 'md' | 'lg';
		className?: string;
		children: Snippet;
	};

	let {
		show = false,
		size = 'md',
		className = 'bg-white dark:bg-gray-900 rounded-2xl',
		children
	}: Props = $props();

	let modalElement: HTMLDivElement | null = $state(null);

	const sizeToWidth = (size: string) => {
		switch (size) {
			case 'full':
				return 'w-full';
			case 'xs':
				return 'w-64';
			case 'sm':
				return 'w-120';
			case 'md':
				return 'w-2xl';
			case 'lg':
				return 'w-4xl';
			default:
				return 'w-2xl';
		}
	};

	const isTopModal = () => {
		const modals = document.getElementsByClassName('modal');
		return modals.length && modals[modals.length - 1] === modalElement;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && isTopModal()) {
			console.log('Closing modal on Escape key');
			show = false;
		}
	};

	$effect(() => {
		if (show && modalElement) {
			document.body.appendChild(modalElement);
			window.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';
		} else if (modalElement && document.body.contains(modalElement)) {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.removeChild(modalElement);
			document.body.style.overflow = 'unset';
		}
	});

	onDestroy(() => {
		show = false;
		if (modalElement && document.body.contains(modalElement)) {
			document.body.removeChild(modalElement);
			window.removeEventListener('keydown', handleKeyDown);
		}
	});
</script>

{#if show}
	<div
		bind:this={modalElement}
		in:fade={{ duration: 100 }}
		role="dialog"
		tabindex="0"
		onmousedown={() => {
			show = false;
		}}
		class="modal fixed top-0 right-0 bottom-0 left-0 z-9999 flex h-screen max-h-dvh w-full justify-center overflow-y-auto overscroll-contain bg-black/60 p-3"
	>
		<div
			class="m-auto max-w-full {sizeToWidth(size)} {size !== 'full'
				? 'mx-2'
				: ''} scrollbar-hidden min-h-fit shadow-2xl"
			onmousedown={(e) => {
				e.stopPropagation();
			}}
			role="dialog"
			tabindex="0"
		>
			{@render children()}
		</div>
	</div>
{/if}
