import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';
import resume from '$lib/data/resume.md?raw';
import type { BaseMessageLike } from '@langchain/core/messages';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

// The resume is imported at build time and cached in memory
// This is the most performant approach - zero file system reads at runtime
const JORDAN_RESUME = resume;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { messages, context } = await request.json();

		// Initialize the model with the API key
		const model = new ChatOpenAI({
			modelName: 'gpt-4o-mini',
			temperature: 0.7,
			apiKey: PRIVATE_OPENAI_API_KEY,
			streaming: true
		});

		// Build the message history
		const chatMessages: BaseMessageLike[] = [];

		// Add system message with Jordan's resume (always present) and any additional context
		const systemPrompt = `You are Kernel, Jordan Clemens' AI assistant. You're knowledgeable, professional, and enthusiastic about Jordan's work.

Here is Jordan's resume:

${JORDAN_RESUME}

${context ? `\n\nAdditional Context (from uploaded file):\n\n${context}\n\n` : ''}

Your role is to:
- Answer questions about Jordan's experience, skills, and projects
- Highlight his expertise in AI, full-stack development, and LLM systems
- Be conversational and engaging
- Provide specific examples from his work when relevant
- If you don't know something specific, be honest and redirect to what you do know

Keep responses concise but informative.`;

		chatMessages.push(new SystemMessage(systemPrompt));

		// Add message history
		for (const msg of messages) {
			if (msg.role === 'user') {
				chatMessages.push(new HumanMessage(msg.content));
			} else if (msg.role === 'assistant') {
				chatMessages.push(new AIMessage(msg.content));
			}
		}

		// Create a ReadableStream for streaming responses
		const stream = new ReadableStream({
			async start(controller) {
				try {
					const streamResponse = await model.stream(chatMessages);

					for await (const chunk of streamResponse) {
						const content = chunk.content;
						if (content) {
							controller.enqueue(
								new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`)
							);
						}
					}

					controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
					controller.close();
				} catch (error) {
					console.error('Streaming error:', error);
					controller.error(error);
				}
			}
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive'
			}
		});
	} catch (error) {
		console.error('Chat API error:', error);
		return json(
			{
				error: 'Failed to process chat request',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
