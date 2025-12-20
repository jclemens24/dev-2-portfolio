<script lang="ts">
	import type { Message } from '$lib/types';
	import dayjs from 'dayjs';
	import isToday from 'dayjs/plugin/isToday';
	import isYesterday from 'dayjs/plugin/isYesterday';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import { formatTimestamp } from '$lib/utils';
	import ChatBot from '$lib/components/icons/ChatBot.svelte';
	import Copy from '$lib/components/icons/Copy.svelte';
	import Voice from '$lib/components/icons/Voice.svelte';
	import VoiceOff from '$lib/components/icons/VoiceOff.svelte';
	import Skeleton from './Skeleton.svelte';
	import Markdown from './Markdown.svelte';

	dayjs.extend(isToday);
	dayjs.extend(isYesterday);
	dayjs.extend(localizedFormat);

	type Props = {
		message: Message;
		isLastMessage?: boolean;
	};

	let { message, isLastMessage }: Props = $props();

	let speaking = $state(false);
	let loadingSpeech = $state(false);

	const toggleSpeakMessage = async () => {
		// If already speaking, stop it
		if (speaking) {
			try {
				speechSynthesis.cancel();
			} catch (error) {
				console.error('Error stopping speech synthesis:', error);
			} finally {
				speaking = false;
			}
			return;
		}

		// Validate message content
		if (!message?.content?.trim()) {
			console.warn('No message content to speak.');
			return;
		}

		// Check if browser supports speech synthesis
		if (!('speechSynthesis' in window)) {
			console.error('Speech synthesis not supported in this browser');
			return;
		}

		loadingSpeech = true;
		speaking = true;

		try {
			// Wait for voices to load (they may not be immediately available)
			let voices = speechSynthesis.getVoices();
			console.log('Available voices:', voices);
			// If voices aren't loaded yet, wait for them
			if (voices.length === 0) {
				await new Promise<void>((resolve) => {
					const checkVoices = () => {
						voices = speechSynthesis.getVoices();
						if (voices.length > 0) {
							speechSynthesis.removeEventListener('voiceschanged', checkVoices);
							resolve();
						}
					};
					speechSynthesis.addEventListener('voiceschanged', checkVoices);

					// Timeout after 3 seconds
					setTimeout(() => {
						speechSynthesis.removeEventListener('voiceschanged', checkVoices);
						resolve();
					}, 3000);
				});
			}

			// Find preferred voice (Google US English, or any English voice, or default)
			const preferredVoice =
				voices.find((v) => v.name.toLowerCase().includes('google') && v.lang.startsWith('en-US')) ||
				voices.find((v) => v.lang.startsWith('en-US')) ||
				voices.find((v) => v.lang.startsWith('en')) ||
				voices[0];

			// Create utterance
			const utterance = new SpeechSynthesisUtterance(message.content);
			utterance.rate = 1.0; // Normal speed
			utterance.pitch = 1.0; // Normal pitch
			utterance.volume = 1.0; // Full volume

			if (preferredVoice) {
				utterance.voice = preferredVoice;
			}

			// Set up event handlers
			utterance.onend = () => {
				speaking = false;
				loadingSpeech = false;
			};

			utterance.onerror = (event) => {
				console.error('Speech synthesis error:', event);
				speaking = false;
				loadingSpeech = false;
			};

			// Start speaking
			speechSynthesis.speak(utterance);
			loadingSpeech = false;
		} catch (error) {
			console.error('Error initializing speech synthesis:', error);
			speaking = false;
			loadingSpeech = false;
		}
	};

	// Cleanup on component unmount
	$effect(() => {
		return () => {
			if (speaking) {
				speechSynthesis.cancel();
			}
		};
	});
</script>

{#key message.id}
	<div id={`message-${message.id}`} class="space-y-3">
		<div class="flex flex-row items-start gap-3">
			<div
				class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm"
			>
				<ChatBot className="h-4 w-4 text-white" />
			</div>
			<div class="max-w-3/4 flex-1 text-left">
				<div
					class="inline-block rounded-2xl rounded-tl-md border border-white/20 bg-white/10 p-3 text-white/90 backdrop-blur-sm"
				>
					{#if message.content === ''}
						<Skeleton />
					{:else if message.content && !message.error}
						<Markdown content={message.content} />
					{/if}
				</div>
				<div class="flex items-center justify-between pt-2">
					<div>
						<Tooltip
							content={dayjs(message.timestamp * 1000).format('LLLL')}
							placement="bottom-start"
						>
							<div class="flex w-full cursor-pointer justify-start text-xs text-white/50">
								{dayjs(formatTimestamp(message.timestamp)).isToday()
									? dayjs(formatTimestamp(message.timestamp)).format('h:mm A')
									: dayjs(formatTimestamp(message.timestamp)).isYesterday()
										? `Yesterday at ${dayjs(formatTimestamp(message.timestamp)).format('h:mm A')}`
										: dayjs(formatTimestamp(message.timestamp)).format('MMM D, YYYY h:mm A')}
							</div>
						</Tooltip>
					</div>
					{#if isLastMessage && message.done}
						<div class="flex items-center">
							<Tooltip content={'Copy'}>
								<button
									class="text-white/40 transition-colors hover:text-white {isLastMessage
										? 'visible'
										: 'invisible group-hover:visible'} rounded-lg p-1"
									onclick={() => {
										navigator.clipboard.writeText(message.content);
									}}
								>
									<Copy className="h-4 w-4" />
								</button>
							</Tooltip>
							<Tooltip content={speaking ? 'Stop Reading' : 'Read Aloud'}>
								<button
									class=" text-white/40 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50 {isLastMessage
										? 'visible'
										: 'invisible group-hover:visible'} rounded-lg p-1"
									onclick={async () => await toggleSpeakMessage()}
									disabled={loadingSpeech}
									class:text-purple-400={speaking}
									class:animate-pulse={speaking}
								>
									{#if loadingSpeech}
										<svg
											class=" h-4 w-4"
											fill="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<style>
												.spinner_S1WN {
													animation: spinner_MGfb 0.8s linear infinite;
													animation-delay: -0.8s;
												}

												.spinner_Km9P {
													animation-delay: -0.65s;
												}

												.spinner_JApP {
													animation-delay: -0.5s;
												}

												@keyframes spinner_MGfb {
													93.75%,
													100% {
														opacity: 0.2;
													}
												}
											</style>
											<circle class="spinner_S1WN" cx="4" cy="12" r="3" />
											<circle class="spinner_S1WN spinner_Km9P" cx="12" cy="12" r="3" />
											<circle class="spinner_S1WN spinner_JApP" cx="20" cy="12" r="3" />
										</svg>
									{:else if speaking}
										<VoiceOff className="h-4 w-4" />
									{:else}
										<Voice className="h-4 w-4" />
									{/if}
								</button>
							</Tooltip>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/key}
