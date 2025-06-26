import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col justify-center items-center py-10 my-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
    <p className="mt-4 text-lg text-gray-700">Searching Brryle...</p>
  </div>
);
