
import React from 'react';
import { SearchResponse } from '../types';
import { ResultCard } from './ResultCard';
import { Pagination } from './Pagination';

interface SearchResultsDisplayProps {
  results: SearchResponse;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const SearchResultsDisplay: React.FC<SearchResultsDisplayProps> = ({ results, currentPage, totalPages, onPageChange }) => {
  if (results.hits.length === 0) {
    return <p className="text-gray-600 text-center my-8">No results found for your query.</p>;
  }

  return (
    <div className="mt-6">
      <p className="text-sm text-gray-600 mb-4">
        Found {results.total} results (took {results.took} ms)
      </p>

      {results.groundingAttributions && results.groundingAttributions.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">
            Information possibly grounded by Google Search:
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2">
            {results.groundingAttributions.map((attribution, index) => (
              attribution.web && (
                <li key={index} className="text-xs">
                  <a 
                    href={attribution.web.uri} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                    title={attribution.web.uri}
                  >
                    {attribution.web.title || attribution.web.uri}
                  </a>
                </li>
              )
            ))}
          </ul>
           <p className="text-xs text-yellow-700 mt-2">Note: Grounding suggests these sources may be relevant. Verify information independently.</p>
        </div>
      )}

      <div>
        {results.hits.map((hit) => (
          <ResultCard key={hit.id} document={hit} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
