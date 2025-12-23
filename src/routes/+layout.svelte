<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Chat from '$lib/components/chat/Chat.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import 'tippy.js/dist/tippy.css';

	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Jordan Clemens | Software Engineer</title>
</svelte:head>
<main class="relative h-screen max-h-dvh overflow-auto font-sans text-gray-900 dark:text-gray-100">
	<Navbar />
	<Chat />
	{@render children()}
</main>
