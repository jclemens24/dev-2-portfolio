<script lang="ts">
	import type { Message } from '$lib/types';
	import dayjs from 'dayjs';
	import isToday from 'dayjs/plugin/isToday';
	import isYesterday from 'dayjs/plugin/isYesterday';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import { formatTimestamp } from '$lib/utils';
	import User from '$lib/components/icons/User.svelte';
	import Copy from '$lib/components/icons/Copy.svelte';
	import Tooltip from '$lib/components/common/Tooltip.svelte';

	type Props = {
		message: Message;
	};

	dayjs.extend(isToday);
	dayjs.extend(isYesterday);
	dayjs.extend(localizedFormat);

	let { message }: Props = $props();
</script>

{#key message.id}
	<div id={`message-${message.id}`} class="user-message flex flex-col space-y-3">
		<div class="flex flex-row items-start justify-end gap-3">
			<div class="max-w-3/4 flex-1">
				<div
					class="inline-block rounded-2xl rounded-tr-md border border-purple-500/30 bg-linear-to-r from-purple-500/20 to-blue-500/20 p-3 text-white/90 backdrop-blur-sm"
				>
					<p class="text-sm leading-relaxed">
						{message.content}
					</p>
				</div>
				<Tooltip content={dayjs(message.timestamp * 1000).format('LLLL')} placement="bottom-end">
					<div class="mt-2 flex w-full cursor-pointer justify-end text-xs text-white/50">
						{dayjs(formatTimestamp(message.timestamp)).isToday()
							? dayjs(formatTimestamp(message.timestamp)).format('h:mm A')
							: dayjs(formatTimestamp(message.timestamp)).isYesterday()
								? `Yesterday at ${dayjs(formatTimestamp(message.timestamp)).format('h:mm A')}`
								: dayjs(formatTimestamp(message.timestamp)).format('MMM D, YYYY h:mm A')}
					</div>
				</Tooltip>
			</div>
			<div
				class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-linear-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm"
			>
				<User className="h-4 w-4 text-white" />
			</div>
		</div>
	</div>
{/key}
