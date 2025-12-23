import type { Message } from '$lib/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendChatMessage, streamChatResponse, uploadFile } from './chat';

describe('sendChatMessage', () => {
	beforeEach(() => {
		global.fetch = vi.fn();
	});

	it('should send a POST request with messages', async () => {
		const mockMessages: Message[] = [
			{ id: '1', role: 'user', content: 'Hello', timestamp: 1704110400 },
			{ id: '2', role: 'assistant', content: 'Hi there!', timestamp: 1704110401 }
		];

		(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
			ok: true,
			json: async () => ({ success: true })
		});

		const response = await sendChatMessage(mockMessages);

		expect(global.fetch).toHaveBeenCalledWith('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ messages: mockMessages, context: undefined })
		});

		expect(response.ok).toBe(true);
	});

	it('should include context when provided', async () => {
		const mockMessages: Message[] = [
			{ id: '3', role: 'user', content: 'Hello', timestamp: 1704110402 }
		];
		const mockContext = 'Resume context here';

		(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
			ok: true,
			json: async () => ({ success: true })
		});

		await sendChatMessage(mockMessages, mockContext);

		expect(global.fetch).toHaveBeenCalledWith(
			'/api/chat',
			expect.objectContaining({
				body: JSON.stringify({ messages: mockMessages, context: mockContext })
			})
		);
	});

	it('should throw an error when response is not ok', async () => {
		const mockMessages: Message[] = [
			{ id: '4', role: 'user', content: 'Hello', timestamp: 1704110403 }
		];

		(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
			ok: false,
			json: async () => ({ details: 'API Error' })
		});

		await expect(sendChatMessage(mockMessages)).rejects.toThrow('API Error');
	});

	it('should throw a generic error when no details provided', async () => {
		const mockMessages: Message[] = [
			{ id: '5', role: 'user', content: 'Hello', timestamp: 1704110404 }
		];

		(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
			ok: false,
			json: async () => ({})
		});

		await expect(sendChatMessage(mockMessages)).rejects.toThrow('Failed to send message');
	});
});

describe('uploadFile', () => {
	beforeEach(() => {
		global.fetch = vi.fn();
	});

	it('should upload a file using FormData', async () => {
		const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });

		(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
			ok: true,
			json: async () => ({ fileUrl: 'https://example.com/test.txt' })
		});

		const result = await uploadFile(mockFile);

		expect(global.fetch).toHaveBeenCalledWith('/api/upload', {
			method: 'POST',
			body: expect.any(FormData)
		});

		expect(result).toEqual({ fileUrl: 'https://example.com/test.txt' });
	});

	it('should throw an error when upload fails', async () => {
		const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });

		(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
			ok: false,
			json: async () => ({ details: 'Upload failed' })
		});

		await expect(uploadFile(mockFile)).rejects.toThrow('Upload failed');
	});

	it('should throw a generic error when no details provided', async () => {
		const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });

		(global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
			ok: false,
			json: async () => ({})
		});

		await expect(uploadFile(mockFile)).rejects.toThrow('Failed to upload file');
	});
});

describe('streamChatResponse', () => {
	it('should stream chat response chunks', async () => {
		const mockChunks = [
			'data: {"content":"Hello"}\n',
			'data: {"content":" world"}\n',
			'data: [DONE]\n'
		];

		const mockResponse = {
			body: {
				getReader: () => {
					let index = 0;
					return {
						read: async () => {
							if (index >= mockChunks.length) {
								return { done: true, value: undefined };
							}
							const chunk = mockChunks[index++];
							return {
								done: false,
								value: new TextEncoder().encode(chunk)
							};
						},
						releaseLock: () => {}
					};
				}
			}
		} as unknown as Response;

		const chunks: string[] = [];
		for await (const chunk of streamChatResponse(mockResponse)) {
			chunks.push(chunk);
		}

		expect(chunks).toEqual(['Hello', ' world']);
	});

	it('should handle invalid JSON gracefully', async () => {
		const mockChunks = [
			'data: {"content":"Hello"}\n',
			'data: invalid json\n',
			'data: {"content":"world"}\n',
			'data: [DONE]\n'
		];

		const mockResponse = {
			body: {
				getReader: () => {
					let index = 0;
					return {
						read: async () => {
							if (index >= mockChunks.length) {
								return { done: true, value: undefined };
							}
							const chunk = mockChunks[index++];
							return {
								done: false,
								value: new TextEncoder().encode(chunk)
							};
						},
						releaseLock: () => {}
					};
				}
			}
		} as unknown as Response;

		const chunks: string[] = [];
		for await (const chunk of streamChatResponse(mockResponse)) {
			chunks.push(chunk);
		}

		// Should skip invalid JSON and continue
		expect(chunks).toEqual(['Hello', 'world']);
	});

	it('should throw error when no response body', async () => {
		const mockResponse = {
			body: null
		} as unknown as Response;

		const generator = streamChatResponse(mockResponse);

		await expect(generator.next()).rejects.toThrow('No response body');
	});

	it('should handle empty stream', async () => {
		const mockResponse = {
			body: {
				getReader: () => ({
					read: async () => ({ done: true, value: undefined }),
					releaseLock: () => {}
				})
			}
		} as unknown as Response;

		const chunks: string[] = [];
		for await (const chunk of streamChatResponse(mockResponse)) {
			chunks.push(chunk);
		}

		expect(chunks).toEqual([]);
	});
});
