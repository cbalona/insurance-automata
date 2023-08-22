import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
	plugins: [topLevelAwait(), sveltekit()],
	server: {
		host: '0.0.0.0',
		hmr: {
			clientPort: 3501
		},
		port: 5173,
		watch: {
			usePolling: true
		}
	}
});
