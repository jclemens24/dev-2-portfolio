import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return json({ error: 'No file provided' }, { status: 400 });
		}

		const buffer = await file.arrayBuffer();
		const fileType = file.type;
		let extractedText = '';

		// Handle PDF files
		if (fileType === 'application/pdf' || file.name.endsWith('.pdf')) {
			const parser = new PDFParse({ data: Buffer.from(buffer) });
			const data = await parser.getText();
			console.log('PDF extracted text:', data);
			extractedText = data.text;
		}
		// Handle Word documents
		else if (
			fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
			file.name.endsWith('.docx')
		) {
			const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
			console.log('DOCX extracted text:', result.value);
			extractedText = result.value;
		}
		// Handle plain text
		else if (fileType === 'text/plain' || file.name.endsWith('.txt')) {
			extractedText = new TextDecoder().decode(buffer);
		} else {
			return json({ error: 'Unsupported file type' }, { status: 400 });
		}

		return json({
			success: true,
			text: extractedText,
			fileName: file.name,
			fileSize: file.size
		});
	} catch (error) {
		console.error('File upload error:', error);
		return json(
			{
				error: 'Failed to process file',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
