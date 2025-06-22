
export const GOOGLE_COLORS: string[] = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
export const APP_NAME = "brryle";

// IMPORTANT: In the current frontend-only ES module setup (loaded directly via index.html),
// `process.env.VAR_NAME` will likely be undefined in the browser.
// These variables will therefore default to the values specified after `||`.
// For true environment variable configuration, a build process (e.g., Webpack, Vite)
// or server-side templating would be required to inject these values.

export let PageSize = parseInt(process.env.PAGE_SIZE!) || 5;
export let ESIndex = process.env.ES_INDEX || 'news';
export let ESQueryTemplate = process.env.ES_QUERY_TEMPLATE || 'brryle';
export let UseMockDataFallback = process.env.MOCK_DATA_FALLBACK || true;

// Ensure PageSize is a valid number, default to 5 if parsing fails or results in NaN
if (isNaN(PageSize) || PageSize <= 0) {
  PageSize = 5;
}
