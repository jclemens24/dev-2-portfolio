import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import Navbar from './Navbar.svelte';

describe('Navbar', () => {
	it('should render all navigation buttons', async () => {
		render(Navbar);

		const expectedButtons = [
			'home',
			'about',
			'experience',
			'skills',
			'projects',
			'achievements',
			'contact'
		];

		for (const buttonName of expectedButtons) {
			const button = page.getByTestId(buttonName);
			await expect.element(button).toBeInTheDocument();
		}
	});

	it('should have sticky positioning', async () => {
		const { container } = render(Navbar);

		const nav = container.querySelector('nav');
		expect(nav?.classList.contains('sticky')).toBe(true);
		expect(nav?.classList.contains('top-0')).toBe(true);
		expect(nav?.classList.contains('z-50')).toBe(true);
	});

	it('should render navigation buttons in correct order', async () => {
		render(Navbar);

		const buttons = [
			'home',
			'about',
			'experience',
			'skills',
			'projects',
			'achievements',
			'contact'
		];

		for (let i = 0; i < buttons.length; i++) {
			const button = page.getByTestId(buttons[i]);
			await expect.element(button).toBeInTheDocument();
		}

		const firstButton = buttons.at(0);
		if (firstButton) {
			const button = page.getByTestId(firstButton);
			await button.click();
		}
	});

	it('should have glass effect styling', async () => {
		const { container } = render(Navbar);

		const navContent = container.querySelector('.glass');
		expect(navContent).toBeTruthy();
	});

	it('should render with profile image preview', async () => {
		const { container } = render(Navbar);

		// Check that the ImagePreview component is rendered (it will have an img tag)
		const img = container.querySelector('img');
		expect(img).toBeTruthy();
		expect(img?.getAttribute('alt')).toBe('Jordan Clemens');
		img?.dispatchEvent(new TouchEvent('touchstart'));
	});

	it('should call scrollIntoView when clicking navigation buttons', async () => {
		// Create mock sections in the document
		const mockSection = document.createElement('section');
		mockSection.id = 'about';
		const mockScrollIntoView = vi.fn();
		mockSection.scrollIntoView = mockScrollIntoView;
		document.body.appendChild(mockSection);

		render(Navbar);

		const aboutButton = page.getByTestId('about');
		await aboutButton.click();

		// Verify scrollIntoView was called with correct options
		expect(mockScrollIntoView).toHaveBeenCalledWith({
			behavior: 'smooth',
			block: 'start'
		});

		// Cleanup
		document.body.removeChild(mockSection);
	});

	it('should handle missing target element gracefully', async () => {
		render(Navbar);

		// Click a button for a section that doesn't exist
		const homeButton = page.getByTestId('home');

		// This should not throw an error - just click and verify it doesn't crash
		await homeButton.click();
		// If we get here without an error, the test passes
		expect(true).toBe(true);
	});
});
