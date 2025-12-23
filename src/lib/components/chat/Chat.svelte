<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import type { FileItem, Message as MessageType } from '$lib/types';
	import { sendChatMessage, streamChatResponse, uploadFile } from '$lib/utils/chat';
	import { flyAndScale } from '$lib/utils/transitions';
	import { onMount, tick } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	import Tooltip from '../common/Tooltip.svelte';
	import ChatBot from '../icons/ChatBot.svelte';
	import Close from '../icons/Close.svelte';
	import Download from '../icons/Download.svelte';
	import Maximize from '../icons/Maximize.svelte';
	import Send from '../icons/Send.svelte';
	import Messages from './Messages.svelte';
	import Suggestions from './Suggestions.svelte';

	let showChat = $state(false);
	let chatMinimized = $state(false);
	let prompt = $state('');
	let promptLength = $derived.by(() => prompt.length);
	let isLoading = $state(false);
	let resumeContext = $state<string>('');

	let chatMessagesContainer = $state<HTMLElement | null>(null);

	let messages = $state<MessageType[]>([]);
	let files = $state<FileItem[]>([]);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		if (!prompt.trim().length || isLoading) return;

		const userMessage: MessageType = {
			id: uuidv4(),
			role: 'user',
			content: prompt.trim(),
			timestamp: Math.floor(Date.now() / 1000),
			done: true // User messages are always complete
		};

		messages = [...messages, userMessage];
		prompt = '';
		isLoading = true;

		// Scroll to show user message
		await tick();
		await scrollToBottom();

		// Create a placeholder for the AI response
		const assistantMessageId = uuidv4();
		const assistantMessage: MessageType = {
			id: assistantMessageId,
			role: 'assistant',
			content: '',
			timestamp: Math.floor(Date.now() / 1000),
			done: false // Not done yet - still streaming
		};

		messages = [...messages, assistantMessage];

		// Scroll to show skeleton loader
		await tick();
		await scrollToBottom();

		try {
			// Send message to API with resume context
			const response = await sendChatMessage(messages.slice(0, -1), resumeContext);

			// Stream the response
			for await (const chunk of streamChatResponse(response)) {
				// Find and update the assistant message
				messages = messages.map((msg) => {
					if (msg.id === assistantMessageId) {
						return { ...msg, content: msg.content + chunk };
					}
					return msg;
				});
				// Scroll on every chunk to keep streaming text visible
				await tick();
				await scrollToBottom();
			}

			// Mark the message as done after streaming completes
			messages = messages.map((msg) => {
				if (msg.id === assistantMessageId) {
					return { ...msg, done: true };
				}
				return msg;
			});
		} catch (error) {
			console.error('Chat error:', error);
			// Update message with error and mark as done
			messages = messages.map((msg) => {
				if (msg.id === assistantMessageId) {
					return {
						...msg,
						content: '❌ Sorry, I encountered an error. Please try again.',
						error: error instanceof Error ? error.message : 'Unknown error',
						done: true // Mark as done even on error
					};
				}
				return msg;
			});
			await tick();
			await scrollToBottom();
		} finally {
			isLoading = false;
			// Final scroll to ensure everything is visible
			await tick();
			await scrollToBottom();
		}
	};

	const handlePromptClick = async (promptText: string) => {
		prompt = promptText;
		// Trigger submit
		await tick();
		await handleSubmit(new Event('submit'));
	};

	const handleFileUpload = async (e: Event) => {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];

		if (!file) return;

		// Show file in UI
		const reader = new FileReader();
		reader.onload = (event) => {
			files = [
				...files,
				{
					type: file.type.includes('pdf') ? 'pdf' : file.type.includes('word') ? 'doc' : 'text',
					url: event.target?.result as string,
					size: file.size,
					name: file.name
				}
			];
		};
		reader.readAsDataURL(file);

		try {
			// Upload file to extract text as additional context
			const result = await uploadFile(file);
			resumeContext = result.text;
			console.log('Additional context loaded:', result.fileName, `(${result.text.length} chars)`);

			// Add system message about file upload
			messages = [
				...messages,
				{
					id: uuidv4(),
					role: 'assistant',
					content: `✅ I've loaded the additional context from ${file.name}. I can now use this information along with Jordan's resume to answer your questions!`,
					timestamp: Math.floor(Date.now() / 1000),
					done: true // System messages are always complete
				}
			];
			// Scroll to show file upload confirmation
			await tick();
			await scrollToBottom();
		} catch (error) {
			console.error('File upload error:', error);
			messages = [
				...messages,
				{
					id: uuidv4(),
					role: 'assistant',
					content: `❌ Sorry, I couldn't process that file. Please make sure it's a PDF, DOCX, or TXT file.`,
					timestamp: Math.floor(Date.now() / 1000),
					error: error instanceof Error ? error.message : 'Unknown error',
					done: true // Error messages are complete
				}
			];
			// Scroll to show error message
			await tick();
			await scrollToBottom();
		}
	};

	const scrollToBottom = async () => {
		await tick();
		if (chatMessagesContainer) {
			// Use smooth scrolling for better UX
			chatMessagesContainer.scrollTo({
				top: chatMessagesContainer.scrollHeight,
				behavior: 'smooth'
			});
		}
	};

	const handleTextAreaKeydown = async (
		e: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }
	) => {
		const isCtrlPressed = e.ctrlKey || e.metaKey; // Support Cmd key for Mac
		const isShiftPressed = e.shiftKey;
		if (e.key === 'Enter' && !isCtrlPressed && !isShiftPressed && prompt.trim().length) {
			e.preventDefault();
			await handleSubmit(e);
		}
	};

	// Watch for messages changes and scroll to bottom
	$effect(() => {
		if (messages.length > 0) {
			tick().then(() => scrollToBottom());
		}
	});

	onMount(async () => {
		// Initialize with a welcome message from the assistant
		messages.push({
			id: uuidv4(),
			role: 'assistant',
			content:
				"👋 Hi there! I'm Kernel — Jordan's AI assistant. I have full access to Jordan's resume and background, so I can answer any questions about his experience, skills, projects, or expertise. From his work as a Full-Stack Developer at Cisco building AI-powered networking tools, to his expertise in SvelteKit, FastAPI, and LLM systems — I'm here to help you learn about Jordan's journey and capabilities. What would you like to know? 🚀",
			timestamp: Math.floor(Date.now() / 1000),
			done: true // Welcome message is complete
		});
		console.log('Messages on mount:', messages);

		// Scroll to show welcome message
		await tick();
		await scrollToBottom();
	});
</script>

{#if showChat}
	<div
		transition:flyAndScale={{ duration: 200 }}
		class="fixed bottom-6 z-50 mx-4 flex {chatMinimized
			? ''
			: 'h-[90vh]'} max-h-150 w-lg animate-float flex-col rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:right-6 sm:w-100 lg:w-112.5"
	>
		<div class="flex shrink-0 items-center justify-between border-b border-white/10 p-4">
			<div class="flex items-center gap-3">
				<div class="relative">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-blue-500"
					>
						<ChatBot className="h-4 w-4 text-white" />
					</div>
					<div
						class="absolute inset-0 animate-pulse rounded-full bg-linear-to-r from-purple-500/40 to-blue-500/40 blur-lg"
					></div>
				</div>
				<div>
					<h3
						class="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-sm font-semibold text-transparent"
					>
						Kernel <span class="text-gray-200">•</span> AI Assistant
					</h3>
					<p class="text-xs text-white/70">Showcasing Jordan's expertise</p>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<Tooltip content="Download Resume" placement="bottom">
					<button
						class="rounded-lg bg-linear-to-r from-purple-500/80 to-blue-500/80 p-2 transition-all duration-200 hover:from-purple-600/80 hover:to-blue-600/80 disabled:opacity-50"
						tabindex="0"
						onclick={() => {
							const link = document.createElement('a');
							link.href = '/Jordan_Clemens_Resume_2025.pdf';
							link.download = 'Jordan_Clemens_Resume_2025.pdf';
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
						}}
						><div>
							<Download className="h-4 w-4 text-white" />
						</div></button
					>
				</Tooltip>
				<Tooltip content={chatMinimized ? 'Maximize Chat' : 'Minimize Chat'} placement="bottom">
					<button
						onclick={() => {
							chatMinimized = !chatMinimized;
						}}
						class="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10"
						><Maximize className="size-4 text-white" /></button
					>
				</Tooltip>
				<Tooltip content="Close Chat" placement="bottom">
					<button
						class="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10"
						onclick={() => {
							showChat = false;
						}}><Close className="size-4 text-white" /></button
					>
				</Tooltip>
			</div>
		</div>
		{#if !chatMinimized}
			<div
				bind:this={chatMessagesContainer}
				class="scrollbar-thin min-h-0 flex-1 space-y-4 overflow-y-auto p-4"
				in:fly={{ duration: 200, y: 20, easing: quintOut, opacity: 0 }}
			>
				<Messages {messages} />
			</div>
			<Suggestions {handlePromptClick} />
			<div class="shrink-0 border-t border-gray-400/20 bg-white/5 backdrop-blur-sm">
				{#if files.length > 0}
					<div class="border-b border-white/10 p-3">
						<div class="flex flex-wrap gap-2">
							{#each files as file, i}
								<div
									class="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs text-white/90"
								>
									<span class="max-w-40 truncate">{file.name}</span>
									<button
										onclick={() => {
											files = files.filter((_, idx) => idx !== i);
											if (files.length === 0) {
												resumeContext = '';
											}
										}}
										class="text-white/70 hover:text-white"
									>
										✕
									</button>
								</div>
							{/each}
						</div>
					</div>
				{/if}
				<form
					class="p-4"
					onsubmit={async (e) => {
						e.preventDefault();
					}}
				>
					<div class="flex items-end gap-3">
						<textarea
							name="chat-input"
							id="chat-input"
							bind:value={prompt}
							disabled={promptLength >= 2000 || isLoading}
							rows="1"
							oninput={(e) => {
								e.currentTarget.style.height = '';
								e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 220) + 'px';
							}}
							onfocus={(e) => {
								e.currentTarget.style.height = '';
								e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 220) + 'px';
							}}
							onkeydown={async (e) => await handleTextAreaKeydown(e)}
							onpaste={async (e) => {
								const clipboardData = e.clipboardData;

								if (clipboardData && clipboardData.items) {
									for (const item of clipboardData.items) {
										if (item.type.indexOf('image') !== -1) {
											const blob = item.getAsFile();
											const reader = new FileReader();

											reader.onload = (event) => {
												files = [
													...files,
													{
														type: 'image',
														url: `${event.target?.result}`,
														size: blob?.size || 0,
														name: blob?.name || ''
													}
												];
											};
											if (blob) {
												reader.readAsDataURL(blob);
											}
										} else if (item.type === 'text/plain') {
											const text = clipboardData.getData('text/plain');
											const blob = new Blob([text], { type: 'text/plain' });
											const file = new File([blob], `Pasted_Text_${Date.now()}.txt`, {
												type: 'text/plain'
											});
											files = [
												...files,
												{
													type: 'text',
													url: URL.createObjectURL(file),
													name: file.name,
													size: file.size
												}
											];
										}
									}
								}
							}}
							placeholder="Send a message..."
							class="scrollbar-hidden flex-1 resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/15 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						></textarea>
						<div class="flex shrink-0 gap-2">
							<Tooltip content="Upload Additional Context (PDF, DOCX, TXT)" placement="top">
								<label
									class="flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-white transition-all duration-200 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="size-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
										<polyline points="17 8 12 3 7 8" />
										<line x1="12" y1="3" x2="12" y2="15" />
									</svg>
									<input
										type="file"
										accept=".pdf,.docx,.txt"
										onchange={handleFileUpload}
										class="hidden"
										disabled={isLoading}
									/>
								</label>
							</Tooltip>
							<button
								type="button"
								onclick={(e) => {
									e.preventDefault();
									handleSubmit(e);
								}}
								disabled={!prompt.trim().length || isLoading}
								class="flex items-center gap-2 rounded-xl bg-linear-to-r from-purple-500 to-blue-500 px-4 py-2.5 text-white transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:shadow-purple-500/25 focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							>
								{#if isLoading}
									<div
										class="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
									></div>
								{:else}
									<Send className="size-4" />
								{/if}
							</button>
						</div>
					</div>
					<div class="mt-2 flex items-center justify-between">
						<p class="text-xs text-white/50">{promptLength}/2000 characters</p>
						<div class="text-xs text-white/40">
							{isLoading ? 'Thinking...' : 'Press Enter to send'}
						</div>
					</div>
				</form>
			</div>
		{/if}
	</div>
{:else}
	<div in:flyAndScale class="fixed right-6 bottom-6 z-50">
		<button
			onclick={() => {
				showChat = true;
			}}
			class="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/25"
		>
			<ChatBot />
		</button>
	</div>
{/if}
