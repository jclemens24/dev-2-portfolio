import { mount } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ImagePreview from './ImagePreview.svelte';

describe('ImagePreview', () => {
	let container: HTMLElement;

	beforeEach(() => {
		vi.useFakeTimers();
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.removeChild(container);
		vi.restoreAllMocks();
	});

	it('should render thumbnail image', () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const img = container.querySelector('img');
		expect(img).toBeTruthy();
		expect(img?.getAttribute('src')).toBe('/test-image.jpg');
		expect(img?.getAttribute('alt')).toBe('Test Image');
	});

	it('should apply custom thumbnail class', () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image',
				thumbnailClass: 'custom-thumbnail-class'
			}
		});

		const img = container.querySelector('img.custom-thumbnail-class');
		expect(img).toBeTruthy();
	});

	it('should show preview on mouse enter', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const wrapper = container.querySelector('[role="img"]');
		expect(wrapper).toBeTruthy();

		// Initially no preview should be visible
		let preview = container.querySelector('.pointer-events-none');
		expect(preview).toBeNull();

		// Trigger mouse enter
		wrapper?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await vi.waitFor(() => {
			preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeTruthy();
		});
	});

	it('should hide preview on mouse leave', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const wrapper = container.querySelector('[role="img"]');

		// Show preview
		wrapper?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeTruthy();
		});

		// Hide preview
		wrapper?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeNull();
		});
	});

	it('should show preview on touch start', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const wrapper = container.querySelector('[role="img"]') as HTMLDivElement;

		// Trigger touch start
		const touchEvent = new TouchEvent('touchstart', { bubbles: true, cancelable: true });
		wrapper?.dispatchEvent(touchEvent);

		// Preview should be visible
		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeTruthy();
		});
	});

	it('should auto-hide preview after 3 seconds on touch', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const wrapper = container.querySelector('[role="img"]') as HTMLDivElement;

		// Trigger touch start
		const touchEvent = new TouchEvent('touchstart', { bubbles: true, cancelable: true });
		wrapper?.dispatchEvent(touchEvent);

		// Preview should be visible
		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeTruthy();
		});

		// Fast-forward 3 seconds
		vi.advanceTimersByTime(3000);
		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeNull();
		});
	});

	it('should hide preview on touch end', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const wrapper = container.querySelector('[role="img"]') as HTMLDivElement;

		// Trigger touch start
		wrapper?.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true }));
		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeTruthy();
		});

		// Trigger touch end
		wrapper?.dispatchEvent(new TouchEvent('touchend', { bubbles: true }));
		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeNull();
		});
	});

	it('should hide preview on touch cancel', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const wrapper = container.querySelector('[role="img"]') as HTMLDivElement;

		// Trigger touch start
		wrapper?.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true }));
		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeTruthy();
		});

		// Trigger touch cancel
		wrapper?.dispatchEvent(new TouchEvent('touchcancel', { bubbles: true }));
		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none');
			expect(preview).toBeNull();
		});
	});

	it('should clear timeout on touch end before auto-hide', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const wrapper = container.querySelector('[role="img"]') as HTMLDivElement;

		// Trigger touch start
		wrapper?.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true }));

		// Trigger touch end before 3 seconds
		vi.advanceTimersByTime(1000);
		wrapper?.dispatchEvent(new TouchEvent('touchend', { bubbles: true }));

		// Fast-forward past 3 seconds
		vi.advanceTimersByTime(3000);

		// Preview should be hidden immediately from touch end, not from timeout
		const preview = container.querySelector('.pointer-events-none');
		expect(preview).toBeNull();
	});

	it('should apply correct preview scale', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image',
				previewScale: 5
			}
		});

		const wrapper = container.querySelector('[role="img"]');
		wrapper?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

		await vi.waitFor(() => {
			const preview = container.querySelector('.pointer-events-none') as HTMLElement;
			expect(preview?.style.width).toBe('500%');
		});
	});

	it('should apply correct position classes', async () => {
		const positions = [
			{ pos: 'left' as const, expectedClass: 'right-full' },
			{ pos: 'right' as const, expectedClass: 'left-full' },
			{ pos: 'top' as const, expectedClass: 'bottom-full' },
			{ pos: 'bottom' as const, expectedClass: 'top-full' },
			{ pos: 'top-left' as const, expectedClass: 'bottom-full' },
			{ pos: 'top-right' as const, expectedClass: 'bottom-full' },
			{ pos: 'bottom-left' as const, expectedClass: 'top-full' },
			{ pos: 'bottom-right' as const, expectedClass: 'top-full' }
		];

		for (const { pos, expectedClass } of positions) {
			const testContainer = document.createElement('div');
			document.body.appendChild(testContainer);

			mount(ImagePreview, {
				target: testContainer,
				props: {
					src: '/test-image.jpg',
					alt: 'Test Image',
					position: pos
				}
			});

			const wrapper = testContainer.querySelector('[role="img"]');
			wrapper?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

			await vi.waitFor(() => {
				const preview = testContainer.querySelector('.pointer-events-none');
				expect(preview?.classList.contains(expectedClass)).toBe(true);
			});

			document.body.removeChild(testContainer);
		}
	});

	it('should have glass effect and animation on preview', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const wrapper = container.querySelector('[role="img"]');
		wrapper?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

		await vi.waitFor(() => {
			const previewInner = container.querySelector('.glass.animate-glow');
			expect(previewInner).toBeTruthy();
			expect(previewInner?.classList.contains('rounded-2xl')).toBe(true);
			expect(previewInner?.classList.contains('border')).toBe(true);
		});
	});

	it('should render preview image with correct attributes', async () => {
		mount(ImagePreview, {
			target: container,
			props: {
				src: '/test-image.jpg',
				alt: 'Test Image'
			}
		});

		const wrapper = container.querySelector('[role="img"]');
		wrapper?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

		await vi.waitFor(() => {
			// There should be 2 images: thumbnail and preview
			const images = container.querySelectorAll('img');
			expect(images.length).toBe(2);

			// Both should have the same src and alt
			for (const img of images) {
				expect(img.getAttribute('src')).toBe('/test-image.jpg');
				expect(img.getAttribute('alt')).toBe('Test Image');
			}
		});
	});
});
