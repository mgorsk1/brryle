import React, { useState } from 'react';
import { SearchResultItem } from '../types';

interface ResultCardProps {
  document: SearchResultItem;
}

const ExpandableText: React.FC<{ text: string; maxLength: number }> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text || text.length <= maxLength) {
    return (
      <p className="text-sm text-gray-700 leading-relaxed">{text || 'No description available.'}</p>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-700 leading-relaxed">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-semibold text-blue-600 hover:text-blue-800 mt-1 focus:outline-none hover:underline"
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
};

export const ResultCard: React.FC<ResultCardProps> = ({ document }) => {
  const { title, description, url, category, subcategory, labelsSplit } = document._source;

  const categoriesDisplay = [category, subcategory].filter(Boolean).join(' / ');

  return (
    <div className="mb-6 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <h2 className="text-lg md:text-xl font-semibold text-blue-700 hover:text-blue-800 mb-1 sm:mb-0 break-words">
            <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {title || 'Untitled Result'}
            </a>
          </h2>
          {categoriesDisplay && (
            <p className="text-xs text-gray-500 whitespace-nowrap mt-1 sm:mt-0 sm:ml-4">
              {categoriesDisplay}
            </p>
          )}
        </div>

        <p className="text-xs text-green-700 truncate mb-1">{url}</p>

        <ExpandableText text={description || ''} maxLength={180} />

        {(labelsSplit && labelsSplit.length > 0) || (url && url !== '#') ? (
          <>
            <hr className="my-3 border-gray-200" />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-2">
              <div className="flex flex-wrap gap-2">
                {labelsSplit &&
                  labelsSplit.map(
                    (label, index) =>
                      label &&
                      label.length > 0 && (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full"
                        >
                          {label}
                        </span>
                      ),
                  )}
              </div>
              {url && url !== '#' && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 whitespace-nowrap self-start sm:self-center"
                >
                  Open Link
                </a>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
