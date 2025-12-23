// eslint-disable-next-line @typescript-eslint/no-unused-vars
import adapter from '@sveltejs/adapter-node';
import netlify from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: { adapter: netlify({ edge: false, split: false }), env: { privatePrefix: 'PRIVATE_' } }
};

export default config;
