<script lang="ts">
	interface Props {
		label: string;
		value: string;
		gradient?: boolean;
	}

	let { label, value, gradient = false }: Props = $props();
</script>

<div class="glass rounded-xl p-3 text-center">
	<div
		class="text-sm font-bold {gradient
			? 'bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'
			: 'text-gradient-blue bg-clip-text text-transparent'}"
	>
		{value}
	</div>
	<div class="text-xs text-gray-400">{label}</div>
</div>
