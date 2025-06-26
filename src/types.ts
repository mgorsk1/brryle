export interface SearchResultItemSource {
  title: string;
  description: string;
  url: string;
  category?: string;
  subcategory?: string;
  labelsSplit?: string[];
}

export interface SearchResultItem {
  id: string;
  title: string; // Top-level title for easier access if needed
  description: string; // Top-level description
  url: string; // Top-level URL
  _source: SearchResultItemSource;
  // For convenience, derived from _source or directly from Gemini
  categories: string[];
  labels: string[];
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}
export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // Other types of chunks if necessary (e.g., code, ...)
}

export interface SearchResponse {
  hits: SearchResultItem[];
  total: number;
  took: number; // in milliseconds
  groundingAttributions?: GroundingChunk[];
}

export enum HealthStatus {
  GREEN = 'green',
  YELLOW = 'yellow',
  RED = 'red',
  UNKNOWN = 'gray',
}

// For Gemini specific types, if needed for components
export interface GeminiRawResult {
  title: string;
  description: string;
  url: string;
  category?: string;
  subcategory?: string;
  labels?: string[]; // Note: Gemini output will be 'labels', mapped to 'labelsSplit' in _source
}
