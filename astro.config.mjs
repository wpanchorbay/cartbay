// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { BASE_PATH, REPO_URL, SITE_ORIGIN, LOGO_SVG_PATH } from './site-config.mjs';

const srcDir = fileURLToPath(new URL('./src', import.meta.url));
const customIconPath = fileURLToPath(new URL('./src/components/starlight/Icon.astro', import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: SITE_ORIGIN,
	base: BASE_PATH,
	vite: {
		resolve: {
			alias: [
				{ find: '~', replacement: srcDir },
				{ find: '@astrojs/starlight/user-components/Icon.astro', replacement: customIconPath },
				{ find: '../user-components/Icon.astro', replacement: customIconPath },
			],
		},
	},
	integrations: [
		sitemap(),
		starlight({
			title: 'Documentation Boilerplate',
			description: 'A reusable boilerplate for jumping starting Starlight documentation.',
			customCss: ['./src/styles/home.css'],
			logo: {
				src: LOGO_SVG_PATH,
				replacesTitle: false,
			},
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				LanguageSelect: './src/components/starlight/LanguageSelect.astro',
				SocialIcons: './src/components/starlight/SocialIcons.astro',
			},
			head: [
				{ tag: 'link', attrs: { rel: 'icon', href: `${BASE_PATH}/assets/favicon.ico` } },
				{ tag: 'link', attrs: { rel: 'icon', sizes: '16x16', href: `${BASE_PATH}/assets/favicon-16x16.png` } },
				{ tag: 'link', attrs: { rel: 'icon', sizes: '32x32', href: `${BASE_PATH}/assets/favicon-32x32.png` } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${BASE_PATH}/assets/apple-touch-icon.png` } },
			],
			social: [{ icon: 'github', label: 'GitHub', href: REPO_URL }],
			sidebar: [
				{
					label: 'Overview',
					items: [{ label: 'Welcome', slug: '' }],
				},
				{
					label: 'Getting Started',
					items: [
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Configuration', slug: 'getting-started/configuration' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
			],
		}),
	],
});