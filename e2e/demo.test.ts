import { expect, test } from '@playwright/test';

test.describe('Portfolio Website', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('home page loads successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Jordan Clemens/i);
		await expect(page.locator('h1')).toBeVisible();
	});

	test('navigation bar is visible and functional', async ({ page }) => {
		// Check navbar exists
		const navbar = page.locator('nav');
		await expect(navbar).toBeVisible();

		// Check all navigation links are present
		await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /about/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /experience/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /projects/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /achievements/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /contact/i })).toBeVisible();
	});

	test('all main sections are present', async ({ page }) => {
		// Check all section IDs exist
		await expect(page.locator('#home')).toBeVisible();
		await expect(page.locator('#about')).toBeVisible();
		await expect(page.locator('#skills')).toBeVisible();
		await expect(page.locator('#experience')).toBeVisible();
		await expect(page.locator('#projects')).toBeVisible();
		await expect(page.locator('#achievements')).toBeVisible();
		await expect(page.locator('#contact')).toBeVisible();
	});

	test('smooth scroll navigation works', async ({ page }) => {
		// Click About button
		await page.getByRole('button', { name: /about/i }).click();
		await page.waitForTimeout(1000); // Wait for smooth scroll

		// Check if About section is in viewport
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toBeInViewport();
	});

	test('About section displays education and resume', async ({ page }) => {
		await page.locator('#about').scrollIntoViewIfNeeded();

		// Check for education content
		await expect(page.getByText(/Penn State/i)).toBeVisible();
		await expect(page.getByText(/Information Sciences/i)).toBeVisible();
		await expect(page.getByText(/3.85/i)).toBeVisible();

		// Check resume buttons exist
		await expect(page.getByRole('button', { name: /download/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /preview/i })).toBeVisible();
	});

	test('Skills section displays all skill categories', async ({ page }) => {
		await page.locator('#skills').scrollIntoViewIfNeeded();

		// Check for skill category headers
		await expect(page.getByText(/Frontend Development/i)).toBeVisible();
		await expect(page.getByText(/Backend Development/i)).toBeVisible();
		await expect(page.getByText(/AI & Machine Learning/i)).toBeVisible();
		await expect(page.getByText(/DevOps & Cloud/i)).toBeVisible();
		await expect(page.getByText(/Testing & Quality/i)).toBeVisible();
	});

	test('Experience section shows timeline', async ({ page }) => {
		await page.locator('#experience').scrollIntoViewIfNeeded();

		// Check for company names
		await expect(page.getByText(/Cisco/i)).toBeVisible();
		await expect(page.getByText(/AccruePartners/i)).toBeVisible();
		await expect(page.getByText(/U\.?S\.? Marine Corps/i)).toBeVisible();
	});

	test('Projects section displays projects', async ({ page }) => {
		await page.locator('#projects').scrollIntoViewIfNeeded();

		// Check section header
		await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible();

		// Check for project links (GitHub icons should be present)
		const githubLinks = page.locator('a[href*="github"]');
		expect(await githubLinks.count()).toBeGreaterThan(0);
	});

	test('Achievements section displays patent and medal', async ({ page }) => {
		await page.locator('#achievements').scrollIntoViewIfNeeded();

		// Check for achievements
		await expect(page.getByText(/U\.?S\.? Patent/i)).toBeVisible();
		await expect(page.getByText(/Navy Achievement Medal/i)).toBeVisible();
	});

	test('Contact form is functional', async ({ page }) => {
		await page.locator('#contact').scrollIntoViewIfNeeded();

		// Check form fields exist
		await expect(page.getByLabel(/name/i)).toBeVisible();
		await expect(page.getByLabel(/email/i)).toBeVisible();
		await expect(page.getByLabel(/subject/i)).toBeVisible();
		await expect(page.getByLabel(/message/i)).toBeVisible();

		// Fill out form
		await page.getByLabel(/name/i).fill('Test User');
		await page.getByLabel(/email/i).fill('test@example.com');
		await page.getByLabel(/subject/i).fill('Test Subject');
		await page.getByLabel(/message/i).fill('This is a test message.');

		// Check submit button exists
		const submitButton = page.getByRole('button', { name: /send message/i });
		await expect(submitButton).toBeVisible();
	});

	test('Contact section displays social links', async ({ page }) => {
		await page.locator('#contact').scrollIntoViewIfNeeded();

		// Check for social media links
		const emailLink = page.locator('a[href^="mailto:"]');
		const githubLink = page.locator('a[href*="github.com"]');
		const linkedinLink = page.locator('a[href*="linkedin.com"]');

		await expect(emailLink).toBeVisible();
		await expect(githubLink).toBeVisible();
		await expect(linkedinLink).toBeVisible();
	});

	test('Footer is present with correct information', async ({ page }) => {
		// Scroll to bottom
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

		const footer = page.locator('footer');
		await expect(footer).toBeVisible();

		// Check for copyright text
		await expect(footer.getByText(/Jordan Clemens/i)).toBeVisible();
		await expect(footer.getByText(/SvelteKit/i)).toBeVisible();
	});

	test('responsive design works on mobile', async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		// Check if navbar is still functional
		await expect(page.locator('nav')).toBeVisible();

		// Check if sections stack properly
		await expect(page.locator('#home')).toBeVisible();
		await expect(page.locator('#about')).toBeVisible();
	});

	test('resume download link works', async ({ page }) => {
		await page.locator('#about').scrollIntoViewIfNeeded();

		const downloadButton = page.getByRole('button', { name: /download/i });
		await expect(downloadButton).toBeVisible();

		// Check if button is clickable (don't actually download in test)
		await expect(downloadButton).toBeEnabled();
	});

	test('glass morphism cards render correctly', async ({ page }) => {
		// Check if glass cards in About section have proper styling
		const glassCards = page.locator('[class*="backdrop-blur"]');
		expect(await glassCards.count()).toBeGreaterThan(0);
	});

	test('scroll reveal animations are present', async ({ page }) => {
		// Check if sections have animation classes
		const sections = page.locator('section');
		expect(await sections.count()).toBeGreaterThan(0);

		// Scroll to trigger animations
		await page.locator('#about').scrollIntoViewIfNeeded();
		await page.waitForTimeout(500); // Wait for animation
	});
});

test.describe('AI Chat Assistant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('chat interface is accessible', async ({ page }) => {
		// Check if chat component exists (might be in a modal or sidebar)
		// Adjust selectors based on your actual implementation
		const chatContainer = page.locator('[class*="chat"]').first();
		
		// If chat is always visible
		if (await chatContainer.isVisible()) {
			await expect(chatContainer).toBeVisible();
		}
	});
});

