<script lang="ts">
	import './layout.css';
	import 'tippy.js/dist/tippy.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import Chat from '$lib/components/chat/Chat.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<main class="relative h-screen max-h-dvh overflow-auto font-sans text-gray-900 dark:text-gray-100">
	<Navbar />
	<Chat />
	{@render children()}
</main>
