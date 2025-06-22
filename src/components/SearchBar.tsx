
import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 max-w-2xl mx-auto">
      <div className="flex items-center border-2 border-gray-300 hover:border-blue-500 focus-within:border-blue-500 rounded-full shadow-sm transition-colors duration-200 bg-white">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Brryle or type URL"
          className="flex-grow px-5 py-3 text-gray-700 bg-white rounded-l-full focus:outline-none text-base"
          disabled={isLoading}
          aria-label="Search query"
        />
        <button
          type="submit"
          className="px-5 py-3 text-blue-600 hover:text-blue-700 rounded-r-full focus:outline-none disabled:opacity-50 flex items-center"
          disabled={isLoading}
          aria-label="Submit search"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
