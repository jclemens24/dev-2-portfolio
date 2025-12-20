<script lang="ts">
	import type { Message } from '$lib/types';

	import UserMessage from './UserMessage.svelte';
	import AssistantMessage from './AssistantMessage.svelte';

	type Props = {
		message: Message;
		isLastMessage?: boolean;
	};

	let { message, isLastMessage }: Props = $props();
</script>

{#key message.id}
	{#if message.role === 'assistant'}
		<AssistantMessage {message} {isLastMessage} />
	{:else if message.role === 'user'}
		<UserMessage {message} />
	{/if}
{/key}
