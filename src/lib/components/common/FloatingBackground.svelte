<script lang="ts">
	// State to trigger animations
	let mounted = $state(true);
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden">
	{#if mounted}
		<!-- Blue orb -->
		<div
			class="animate-float-1 absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
		></div>

		<!-- Purple orb -->
		<div
			class="animate-float-2 absolute right-20 bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
		></div>

		<!-- Cyan orb -->
		<div
			class="animate-float-3 absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
		></div>
	{/if}
</div>

<style>
	@keyframes float-1 {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(100px, -50px);
		}
	}

	@keyframes float-2 {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(100px, -100px);
		}
	}

	@keyframes float-3 {
		0% {
			transform: translate(0, 0);
		}
		33% {
			transform: translate(25px, -15px);
		}
		66% {
			transform: translate(-25px, 15px);
		}
		100% {
			transform: translate(0, 0);
		}
	}

	.animate-float-1 {
		animation: float-1 20s linear infinite;
	}

	.animate-float-2 {
		animation: float-2 25s linear infinite;
	}

	.animate-float-3 {
		animation: float-3 15s linear infinite;
	}
</style>
