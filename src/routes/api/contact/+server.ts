import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { PRIVATE_RESEND_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const resend = new Resend(PRIVATE_RESEND_API_KEY);
	try {
		const { name, email, subject, message } = await request.json();

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return json({ error: 'All fields are required' }, { status: 400 });
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Invalid email address' }, { status: 400 });
		}

		// Send email using Resend
		const { data, error } = await resend.emails.send({
			from: 'onboarding@resend.dev', // Update with your verified domain
			to: ['jclemens24@hotmail.com'], // Update with your actual email
			replyTo: email,
			subject: `Portfolio Contact: ${subject}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
						New Contact Form Submission
					</h2>
					
					<div style="margin: 20px 0;">
						<p style="margin: 10px 0;"><strong>From:</strong> ${name}</p>
						<p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
						<p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
					</div>
					
					<div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
						<h3 style="margin-top: 0; color: #333;">Message:</h3>
						<p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
					</div>
					
					<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
					
					<p style="color: #666; font-size: 12px;">
						This message was sent from your portfolio contact form.
					</p>
				</div>
			`
		});

		if (error) {
			console.error('Resend error:', error);
			return json({ error: 'Failed to send email' }, { status: 500 });
		}

		// Log successful submission
		console.log('Contact form submitted successfully:', {
			name,
			email,
			subject,
			messageId: data?.id,
			timestamp: new Date().toISOString()
		});

		// Return success response
		return json({
			success: true,
			message: 'Message sent successfully'
		});
	} catch (error) {
		console.error('Contact form error:', error);
		return json({ error: 'Failed to send message' }, { status: 500 });
	}
};
