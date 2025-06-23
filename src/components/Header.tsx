
import React from 'react';
import { APP_NAME } from '../constants';

const tailwindGoogleColors: string[] = [
  'text-blue-600',    // Google Blue
  'text-red-600',     // Google Red
  'text-yellow-500',  // Google Yellow
  'text-blue-600',    // Google Blue
  'text-green-600',   // Google Green
];

export const Header: React.FC = () => {
  const appNameLetters = APP_NAME.split('');

  return (
    <div className="text-center my-8 sm:my-12">
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight">
        {appNameLetters.map((letter, index) => (
          <span 
            key={index} 
            className={`${tailwindGoogleColors[index % tailwindGoogleColors.length]}`}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
};
