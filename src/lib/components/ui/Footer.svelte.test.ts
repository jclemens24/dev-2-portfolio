import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import Footer from './Footer.svelte';

describe('Footer', () => {
	it('should render the name correctly', async () => {
		render(Footer);

		const name = page.getByTestId('footer-name');
		await expect.element(name).toHaveTextContent('Jordan Clemens');
	});

	it('should display the current year', async () => {
		const { container } = render(Footer);

		const currentYear = new Date().getFullYear();
		expect(container.textContent).toContain(currentYear.toString());
	});

	it('should render social media links', async () => {
		const { container } = render(Footer);

		// Check for GitHub link
		const githubLink = container.querySelector('a[href="https://github.com/jorcleme"]');
		expect(githubLink).toBeTruthy();

		// Check for LinkedIn link
		const linkedinLink = container.querySelector(
			'a[href="https://www.linkedin.com/in/jordan-m-clemens/"]'
		);
		expect(linkedinLink).toBeTruthy();

		// Check for Email link
		const emailLink = container.querySelector('a[href="mailto:jordanclemens1986@gmail.com"]');
		expect(emailLink).toBeTruthy();
	});

	it('should have navigation links', async () => {
		const { container } = render(Footer);

		const navLinks = [
			'Home',
			'About',
			'Skills',
			'Experience',
			'Projects',
			'Achievements',
			'Contact'
		];

		for (const linkText of navLinks) {
			expect(container.textContent).toContain(linkText);
		}
	});

	it('should have proper footer styling', async () => {
		const { container } = render(Footer);

		const footer = container.querySelector('footer');
		expect(footer?.classList.contains('backdrop-blur-xl')).toBe(true);
		expect(footer?.classList.contains('border-t')).toBe(true);
	});

	it('should have social links with proper aria labels', async () => {
		const { container } = render(Footer);

		const githubLink = container.querySelector('a[aria-label="View my GitHub profile"]');
		expect(githubLink).toBeTruthy();

		const linkedinLink = container.querySelector('a[aria-label="Connect on LinkedIn"]');
		expect(linkedinLink).toBeTruthy();

		const emailLink = container.querySelector('a[aria-label="Send me an email"]');
		expect(emailLink).toBeTruthy();
	});

	it('should open external links in new tab', async () => {
		const { container } = render(Footer);

		const externalLinks = container.querySelectorAll('a[target="_blank"]');
		expect(externalLinks.length).toBeGreaterThan(0);

		// Check for proper rel attributes
		for (const link of externalLinks) {
			expect(link.getAttribute('rel')).toContain('noopener');
			expect(link.getAttribute('rel')).toContain('noreferrer');
		}
	});

	it('should scroll to section when navigation link is clicked', async () => {
		// Mock getElementById and scrollIntoView
		const mockScrollIntoView = vi.fn();
		const mockElement = {
			scrollIntoView: mockScrollIntoView
		};
		const getElementByIdSpy = vi
			.spyOn(document, 'getElementById')
			.mockReturnValue(mockElement as unknown as HTMLElement);

		render(Footer);

		// Find and click the About button
		const aboutButton = page.getByRole('button', { name: 'About' });
		await aboutButton.click();

		// Verify scrollIntoView was called
		await vi.waitFor(() => {
			expect(getElementByIdSpy).toHaveBeenCalledWith('about');
			expect(mockScrollIntoView).toHaveBeenCalledWith({
				behavior: 'smooth',
				block: 'start'
			});
		});

		getElementByIdSpy.mockRestore();
	});

	it('should handle missing target element gracefully when clicking nav link', async () => {
		// Mock getElementById to return null
		const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(null);

		render(Footer);

		// Click a navigation button - should not throw
		const homeButton = page.getByRole('button', { name: 'Home' });
		await homeButton.click();

		// Verify getElementById was called but no error was thrown
		await vi.waitFor(() => {
			expect(getElementByIdSpy).toHaveBeenCalledWith('home');
		});

		getElementByIdSpy.mockRestore();
	});
});
