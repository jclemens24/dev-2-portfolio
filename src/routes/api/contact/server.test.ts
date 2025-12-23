import { beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from './+server';

// Mock the Resend module
const mockEmailSend = vi.fn();
vi.mock('resend', () => ({
	Resend: class Resend {
		emails = {
			send: mockEmailSend
		};
	}
}));

// Mock the environment variable
vi.mock('$env/static/private', () => ({
	PRIVATE_RESEND_API_KEY: 'test-api-key'
}));

describe('Contact API', () => {
	beforeEach(() => {
		// Reset mocks before each test
		vi.clearAllMocks();
	});

	it('should successfully send an email with valid data', async () => {
		mockEmailSend.mockResolvedValue({
			data: { id: 'test-email-id' },
			error: null
		});

		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: 'John Doe',
				email: 'john@example.com',
				subject: 'Test Subject',
				message: 'Test message content'
			})
		});

		// @ts-expect-error - Simplified mock for testing
		const response = await POST({ request });
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.success).toBe(true);
		expect(data.message).toBe('Message sent successfully');
		expect(mockEmailSend).toHaveBeenCalledOnce();
	});

	it('should return 400 if name is missing', async () => {
		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: 'john@example.com',
				subject: 'Test Subject',
				message: 'Test message'
			})
		});

		// @ts-expect-error - Simplified mock for testing
		const response = await POST({ request });
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.error).toBe('All fields are required');
		expect(mockEmailSend).not.toHaveBeenCalled();
	});

	it('should return 400 if email is missing', async () => {
		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: 'John Doe',
				subject: 'Test Subject',
				message: 'Test message'
			})
		});

		// @ts-expect-error - Simplified mock for testing
		const response = await POST({ request });
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.error).toBe('All fields are required');
	});

	it('should return 400 for invalid email format', async () => {
		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: 'John Doe',
				email: 'invalid-email',
				subject: 'Test Subject',
				message: 'Test message'
			})
		});

		// @ts-expect-error - Simplified mock for testing
		const response = await POST({ request });
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.error).toBe('Invalid email address');
	});

	it('should return 500 if Resend returns an error', async () => {
		mockEmailSend.mockResolvedValue({
			data: null,
			error: { message: 'API Error' }
		});

		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: 'John Doe',
				email: 'john@example.com',
				subject: 'Test Subject',
				message: 'Test message'
			})
		});

		// @ts-expect-error - Simplified mock for testing
		const response = await POST({ request });
		const data = await response.json();

		expect(response.status).toBe(500);
		expect(data.error).toBe('Failed to send email');
	});

	it('should handle unexpected errors gracefully', async () => {
		mockEmailSend.mockRejectedValue(new Error('Unexpected error'));

		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: 'John Doe',
				email: 'john@example.com',
				subject: 'Test Subject',
				message: 'Test message'
			})
		});

		// @ts-expect-error - Simplified mock for testing
		const response = await POST({ request });
		const data = await response.json();

		expect(response.status).toBe(500);
		expect(data.error).toBe('Failed to send message');
	});

	it('should include all required email fields', async () => {
		mockEmailSend.mockResolvedValue({
			data: { id: 'test-email-id' },
			error: null
		});

		const request = new Request('http://localhost/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: 'John Doe',
				email: 'john@example.com',
				subject: 'Test Subject',
				message: 'Test message content'
			})
		});

		// @ts-expect-error - Simplified mock for testing
		await POST({ request });

		expect(mockEmailSend).toHaveBeenCalledWith(
			expect.objectContaining({
				from: 'onboarding@resend.dev',
				to: ['jclemens24@hotmail.com'],
				replyTo: 'john@example.com',
				subject: 'Portfolio Contact: Test Subject'
			})
		);
	});
});
