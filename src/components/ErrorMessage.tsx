
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="my-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-md" role="alert">
    <p className="font-bold text-lg">Oops! Something went wrong.</p>
    <p className="text-sm">{message}</p>
    <p className="text-xs mt-2">Please try again later or refine your search.</p>
  </div>
);
