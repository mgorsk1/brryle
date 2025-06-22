
import { SearchResponse, SearchResultItem, SearchResultItemSource, HealthStatus } from '../types';
import { PageSize, ESIndex, ESQueryTemplate } from '../constants';

export const getElasticsearchClusterHealth = async (): Promise<HealthStatus> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

    const response = await fetch(`/api/_cluster/health`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json' // Usually not needed for ES GET requests but good practice
      }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[Brryle Search] Elasticsearch health check failed: ${response.status} ${response.statusText}`);
      // Attempt to read error body if any (ES often returns JSON errors)
      try {
        const errorData = await response.json();
        console.error("[Brryle Search] Elasticsearch error details:", errorData);
      } catch (e) {
        // If error body is not JSON or unreadable
        console.error("[Brryle Search] Could not parse Elasticsearch error response.");
      }
      return HealthStatus.UNKNOWN; // Or UNKNOWN, depending on desired behavior for HTTP errors
    }

    const healthData = await response.json();
    
    switch (healthData.status?.toLowerCase()) {
      case 'green':
        return HealthStatus.GREEN;
      case 'yellow':
        return HealthStatus.YELLOW;
      case 'red':
        return HealthStatus.RED;
      default:
        console.warn(`[Brryle Search] Unknown Elasticsearch health status: ${healthData.status}`);
        return HealthStatus.UNKNOWN;
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('[Brryle Search] Elasticsearch health check timed out.');
    } else {
      console.error('[Brryle Search] Error fetching Elasticsearch health:', error);
    }
    return HealthStatus.UNKNOWN; // Default to UNKNOWN or RED on fetch errors
  }
};


export const performSearch = async (
  query: string,
  currentPage: number = 1
): Promise<SearchResponse> => {
  // Simulating Elasticsearch pFrom and pSize
  const pFrom = (currentPage - 1) * PageSize; // Updated usage
  const pSize = PageSize; // Updated usage

  try {
    // This example assumes 'searchTemplate' for consistency with original request,
    // though direct query DSL is also common.
    const searchPayload = {
      id: ESQueryTemplate, // ID of a stored search template in Elasticsearch // Updated usage
      params: {
        pQuery: query,
        pSize: pSize,
        pFrom: pFrom,
      },
    };

    const response = await fetch(`/api/${ESIndex}/_search/template`, { // Updated usage
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Elasticsearch query failed:", errorData);
      throw new Error(`Elasticsearch search failed: ${response.statusText}`);
    }

    const responseData = await response.json();
    const esHits = responseData.hits.hits;
    const total = typeof responseData.hits.total === 'number' ? responseData.hits.total : responseData.hits.total?.value || 0;
    const took = responseData.took;

    const hits: SearchResultItem[] = esHits.map((hit: any) => ({
      id: hit._id,
      title: hit._source?.title || "Untitled Result",
      description: hit._source?.description || "No description available.",
      url: hit._source?.url || "#",
      _source: hit._source as SearchResultItemSource,
      categories: hit._source?.category ? (hit._source?.subcategory ? [hit._source.category, hit._source.subcategory] : [hit._source.category]) : [],
      labels: hit._source?.labelsSplit || [],
    }));

    return {
      hits,
      total,
      took,
      groundingAttributions: undefined, // Not applicable for Elasticsearch
    };

  } catch (error) {
    console.error("Elasticsearch query failed:", error);
  }
};
