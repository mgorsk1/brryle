import React, { useState, useCallback } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SearchResultsDisplay } from './components/SearchResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { performSearch } from './services/elasticsearchService'; // Updated import
import { SearchResponse } from './types';
import { PageSize } from './constants'; // Updated import

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearch = useCallback(async (query: string, page: number = 1) => {
    if (!query.trim()) {
      setSearchResults(null);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setSearchTerm(query); // Keep track of the active search term
    setCurrentPage(page);

    try {
      const results = await performSearch(query, page);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    if (searchTerm) {
      handleSearch(searchTerm, newPage);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  const totalPages = searchResults ? Math.ceil(searchResults.total / PageSize) : 0; // Updated usage

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <TopBar />
      <div className="container mx-auto px-4 py-8 flex-grow max-w-4xl">
        <Header />
        <SearchBar onSearch={(query) => handleSearch(query, 1)} isLoading={isLoading} />

        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {searchResults && !isLoading && !error && (
          <SearchResultsDisplay
            results={searchResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <footer className="text-center py-4 text-xs text-gray-500 border-t border-gray-200">
        Brryle Search - Powered by Elasticsearch Data
      </footer>
    </div>
  );
};

export default App;
