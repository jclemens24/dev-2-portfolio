<script lang="ts">
	import type { Message as MessageType } from '$lib/types';
	import Message from './Messages/Message.svelte';

	type Props = {
		messages: MessageType[];
	};

	let { messages }: Props = $props();
</script>

{#each messages as message (message.id)}
	<Message
		{message}
		isLastMessage={messages.length !== 1 && message.id === messages[messages.length - 1].id}
	/>
{/each}
