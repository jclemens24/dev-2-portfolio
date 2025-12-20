import type { Message } from '$lib/types';

export async function sendChatMessage(messages: Message[], context?: string) {
	const response = await fetch('/api/chat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ messages, context })
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.details || 'Failed to send message');
	}

	return response;
}

export async function uploadFile(file: File) {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch('/api/upload', {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.details || 'Failed to upload file');
	}

	return response.json();
}

export async function* streamChatResponse(
	response: Response
): AsyncGenerator<string, void, unknown> {
	const reader = response.body?.getReader();
	const decoder = new TextDecoder();

	if (!reader) {
		throw new Error('No response body');
	}

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value);
			const lines = chunk.split('\n');

			for (const line of lines) {
				if (line.startsWith('data: ')) {
					const data = line.slice(6);
					if (data === '[DONE]') {
						return;
					}
					try {
						const parsed = JSON.parse(data);
						yield parsed.content;
					} catch (e) {
						// Skip invalid JSON
						console.log(e);
						console.warn('Failed to parse chunk:', data);
					}
				}
			}
		}
	} finally {
		reader.releaseLock();
	}
}
