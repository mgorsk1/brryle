export const APP_NAME = "Brryle";

export let PageSize = parseInt(process.env.PAGE_SIZE!) || 5;
export let ESIndex = process.env.ES_INDEX || 'news';
export let ESQueryTemplate = process.env.ES_QUERY_TEMPLATE || 'brryle';
export let UseMockDataFallback = process.env.MOCK_DATA_FALLBACK || true;

// Ensure PageSize is a valid number, default to 5 if parsing fails or results in NaN
if (isNaN(PageSize) || PageSize <= 0) {
  PageSize = 5;
}
