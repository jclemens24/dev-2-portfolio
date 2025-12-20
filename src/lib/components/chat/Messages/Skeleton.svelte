<script lang="ts">
	type Props = {
		size?: 'md' | 'sm';
	};

	let { size = 'md' }: Props = $props();
</script>

<div class="mt-2 mb-2 w-full">
	<div class="flex w-full animate-pulse">
		<div class="{size === 'md' ? 'space-y-2' : 'space-y-1.5'} w-full">
			<div
				class="{size === 'md' ? 'h-2' : 'h-1.5'} mr-14 rounded-sm bg-gray-200 dark:bg-gray-600"
			></div>

			<div class="grid grid-cols-3 gap-4">
				<div
					class="{size === 'md'
						? 'h-2'
						: 'h-1.5'} col-span-2 rounded-sm bg-gray-200 dark:bg-gray-600"
				></div>
				<div
					class="{size === 'md'
						? 'h-2'
						: 'h-1.5'} col-span-1 rounded-sm bg-gray-200 dark:bg-gray-600"
				></div>
			</div>
			<div class="grid grid-cols-4 gap-4">
				<div
					class="{size === 'md'
						? 'h-2'
						: 'h-1.5'} col-span-1 rounded-sm bg-gray-200 dark:bg-gray-600"
				></div>
				<div
					class="{size === 'md'
						? 'h-2'
						: 'h-1.5'} col-span-2 rounded-sm bg-gray-200 dark:bg-gray-600"
				></div>
				<div
					class="{size === 'md'
						? 'h-2'
						: 'h-1.5'} col-span-1 mr-4 rounded-sm bg-gray-200 dark:bg-gray-600"
				></div>
			</div>

			<div
				class="{size === 'md'
					? 'h-2'
					: 'h-1.5'} mb-safe-bottom rounded-sm bg-gray-200 dark:bg-gray-600"
			></div>
		</div>
	</div>
</div>
