<script lang="ts">
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';

	type Props = {
		content: string;
	};

	let { content }: Props = $props();

	// Configure marked for better code highlighting and formatting
	marked.setOptions({
		breaks: true,
		gfm: true
	});

	// Parse and sanitize markdown
	const html = $derived(DOMPurify.sanitize(marked.parse(content) as string));
</script>

<div class="markdown-content">
	{@html html}
</div>
