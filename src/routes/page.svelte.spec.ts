import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render h1', async () => {
		render(Page);

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});

	it('should render all major section components', async () => {
		const { container } = render(Page);

		// Check for sections by looking for section elements
		const sections = container.querySelectorAll('section');
		expect(sections.length).toBeGreaterThan(0);
	});

	it('should render footer', async () => {
		const { container } = render(Page);

		const footer = container.querySelector('footer');
		expect(footer).toBeTruthy();
	});

	it('should have proper page padding', async () => {
		const { container } = render(Page);

		const mainDiv = container.querySelector('.p-4');
		expect(mainDiv).toBeTruthy();
	});
});
