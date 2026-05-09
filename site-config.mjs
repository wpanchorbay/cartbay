export const SITE_ORIGIN =
	process.env.SITE_ORIGIN || process.env.PUBLIC_SITE_ORIGIN || 'https://example.com';

export const BASE_PATH = '/documentation-boilerplate-starlight';

export const REPO_URL =
	process.env.DOCS_REPO_URL || 'https://github.com/organization/documentation-boilerplate-starlight';

export const LOGO_SVG_PATH = './src/assets/wpanchorbay-icon.svg';
export const WPANCHORBAY_URL = 'https://wpanchorbay.com';

export function buildAbsoluteUrl(pathname = '/') {
	const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return new URL(`${BASE_PATH}${normalizedPath}`, SITE_ORIGIN).toString();
}
