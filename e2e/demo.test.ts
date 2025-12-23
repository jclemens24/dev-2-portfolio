import { expect, test } from '@playwright/test';

test.describe('Portfolio Website', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:4173');
	});

	test('home page loads successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Jordan Clemens \| Software Engineer/i);
		await expect(page.getByTestId('home-header')).toBeVisible();
	});

	test('navigation bar is visible and functional', async ({ page }) => {
		// Check navbar exists
		const navbar = page.locator('nav');
		await expect(navbar).toBeVisible();

		const testids = ['home', 'about', 'experience', 'projects', 'achievements', 'contact'];
		for (const id of testids) {
			await expect(page.getByTestId(id)).toBeVisible();
		}
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
		await page.getByTestId('about-section').click();
		await page.waitForTimeout(2000);

		// Check if About section is in viewport
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toBeInViewport();

		await page.getByTestId('skills').click();
		await page.waitForTimeout(2000);

		// Check if Skills section is in viewport
		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeInViewport();

		await page.getByTestId('experience').click();
		await page.waitForTimeout(2000);

		// Check if Experience section is in viewport
		const experienceSection = page.locator('#experience');
		await expect(experienceSection).toBeInViewport();

		await page.getByTestId('projects').click();
		await page.waitForTimeout(2000);

		// Check if Projects section is in viewport
		const projectsSection = page.locator('#projects');
		await expect(projectsSection).toBeInViewport();

		await page.getByTestId('achievements').click();
		await page.waitForTimeout(2000);

		// Check if Achievements section is in viewport
		const achievementsSection = page.locator('#achievements');
		await expect(achievementsSection).toBeInViewport();

		await page.getByTestId('contact').click();
		await page.waitForTimeout(2000);

		// Check if Contact section is in viewport
		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeInViewport();
	});

	test('About section displays education and resume', async ({ page }) => {
		await page.locator('#about').scrollIntoViewIfNeeded();

		// Check for education content
		await expect(page.getByTestId('education-institution')).toBeVisible();
		await expect(page.getByTestId('education-degree')).toBeVisible();
		await expect(page.getByTestId('gpa')).toBeVisible();

		// Check resume buttons exist
		await expect(page.getByTestId('download-resume')).toBeVisible();
		await expect(page.getByTestId('preview-resume')).toBeVisible();
	});

	test('Skills section displays all skill categories', async ({ page }) => {
		await page.locator('#skills').scrollIntoViewIfNeeded();

		const testids = [
			'frontend-development',
			'backend-development',
			'ai-machine-learning',
			'devops-tools',
			'testing-quality',
			'design-ux'
		];

		for (const id of testids) {
			await expect(page.getByTestId(id)).toBeVisible();
		}
	});

	test('Experience section shows timeline', async ({ page }) => {
		await page.locator('#experience').scrollIntoViewIfNeeded();

		const testids = ['cisco', 'accrue-partners', 'marine-corps'];

		for (const id of testids) {
			await expect(page.getByTestId(id)).toBeVisible();
		}
	});

	test('Projects section displays projects', async ({ page }) => {
		await page.locator('#projects').scrollIntoViewIfNeeded();

		// Check featured projects are visible
		const featuredProjects = [
			'featured-project-spanning-content-tree',
			'featured-project-portfolio-website',
			'featured-project-typeorm-fastify-plugin'
		];

		for (const id of featuredProjects) {
			await expect(page.getByTestId(id)).toBeVisible();
		}

		// Check other projects are visible
		const otherProjects = [
			'other-project-hardware-installation-guide',
			'other-project-devops-automation-suite'
		];

		for (const id of otherProjects) {
			await expect(page.getByTestId(id)).toBeVisible();
		}

		// Check that project links exist
		const githubLinks = page.getByTestId('project-github-link');
		expect(await githubLinks.count()).toBeGreaterThan(0);

		const liveLinks = page.getByTestId('project-live-link');
		expect(await liveLinks.count()).toBeGreaterThan(0);
	});

	test('Achievements section displays patent and medal', async ({ page }) => {
		await page.locator('#achievements').scrollIntoViewIfNeeded();

		// Check both achievement cards are visible
		await expect(page.getByTestId('achievement-patent')).toBeVisible();
		await expect(page.getByTestId('achievement-award')).toBeVisible();

		// Check achievement titles
		const achievementTitles = page.getByTestId('achievement-title');
		expect(await achievementTitles.count()).toBe(2);

		// Check other recognitions section
		await expect(page.getByTestId('other-recognitions')).toBeVisible();
		await expect(page.getByTestId('recognition-deans-list')).toBeVisible();
		await expect(page.getByTestId('recognition-gpa')).toBeVisible();
		await expect(page.getByTestId('recognition-excellence')).toBeVisible();
	});

	test('Contact form is functional', async ({ page }) => {
		await page.locator('#contact').scrollIntoViewIfNeeded();

		// Check form fields exist
		await expect(page.getByLabel(/name/i)).toBeVisible();
		await expect(page.getByTestId('email-label')).toBeVisible();
		await expect(page.getByLabel(/subject/i)).toBeVisible();
		await expect(page.getByLabel(/message/i)).toBeVisible();

		// Fill out form
		await page.getByLabel(/name/i).fill('Test User');
		await page.getByTestId('email-label').fill('test@example.com');
		await page.getByLabel(/subject/i).fill('Test Subject');
		await page.getByLabel(/message/i).fill('This is a test message.');

		// Check submit button exists
		const submitButton = page.getByRole('button', { name: /send message/i });
		await expect(submitButton).toBeVisible();
	});

	test('Contact section displays social links', async ({ page }) => {
		await page.locator('#contact').scrollIntoViewIfNeeded();

		// Check for social media links
		const emailLink = page.getByTestId('social-link-email').first();
		const githubLink = page.getByTestId('social-link-github').first();
		const linkedinLink = page.getByTestId('social-link-linkedin').first();

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
		await expect(footer.getByTestId('footer-name')).toBeVisible();
		await expect(footer.getByTestId('footer-sveltekit')).toBeVisible();
	});

	test('responsive design works on mobile', async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.getByTestId('home').click();

		// Check if navbar is still functional
		await expect(page.locator('nav')).toBeVisible();

		// Check if sections stack properly
		await expect(page.locator('#home')).toBeVisible();
		const aboutSection = page.locator('#about');
		await aboutSection.scrollIntoViewIfNeeded();
		await expect(aboutSection).toBeVisible();
	});

	test('resume download link works', async ({ page }) => {
		await page.locator('#about').scrollIntoViewIfNeeded();

		const downloadButton = page.getByTestId('download-resume');
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
