<script lang="ts">
	import { flyAndScale } from '$lib/utils/transitions';
	import { DropdownMenu } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Side = 'bottom' | 'top' | 'right' | 'left';
	type Align = 'start' | 'center' | 'end';

	type Props = {
		trigger: Snippet;
		children: Snippet;
		show?: boolean;
		side?: Side;
		align?: Align;
	};

	let {
		trigger,
		children,
		show = $bindable(false),
		side = 'bottom',
		align = 'start'
	}: Props = $props();
</script>

<DropdownMenu.Root bind:open={show} onOpenChange={(e) => (show = e)}>
	<DropdownMenu.Trigger
		class="inline-flex items-center justify-center rounded-full p-2 text-white/70 transition-all duration-300 hover:bg-white/10 focus:ring-2 focus:ring-white/30 focus:outline-none"
	>
		{@render trigger()}
	</DropdownMenu.Trigger>

	{#if show}
		<DropdownMenu.Content
			forceMount
			class="bg-gray-850 relative top-0 z-100 w-full max-w-32.5 rounded-lg border border-gray-900 px-1 py-1.5 text-white"
			sideOffset={14}
			{side}
			{align}
		>
			{@render children()}
		</DropdownMenu.Content>
	{/if}
</DropdownMenu.Root>
