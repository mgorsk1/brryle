
import React, { useState, useEffect } from 'react';
import { HealthStatus } from '../types';
import { PersonIcon } from './icons/PersonIcon';
import { getElasticsearchClusterHealth } from '../services/elasticsearchService';

const healthColors: Record<HealthStatus, string> = {
  [HealthStatus.GREEN]: 'bg-green-500',
  [HealthStatus.YELLOW]: 'bg-yellow-500',
  [HealthStatus.RED]: 'bg-red-500',
  [HealthStatus.UNKNOWN]: 'bg-gray-400',
};

const baseHealthTooltips: Record<HealthStatus, string> = {
  [HealthStatus.GREEN]: 'Elasticsearch Cluster Status: Green - All shards active.',
  [HealthStatus.YELLOW]: 'Elasticsearch Cluster Status: Yellow - Primary shards active, some replicas unassigned.',
  [HealthStatus.RED]: 'Elasticsearch Cluster Status: Red - Some primary shards not active. Data loss possible.',
  [HealthStatus.UNKNOWN]: 'Elasticsearch Cluster Status: Unknown.', // Base message
};

export const TopBar: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus>(HealthStatus.UNKNOWN);
  const [isLoadingHealth, setIsLoadingHealth] = useState<boolean>(true);

  const fetchHealth = async () => {
    setIsLoadingHealth(true);
    const currentHealth = await getElasticsearchClusterHealth();
    setHealth(currentHealth);
    setIsLoadingHealth(false);
  };

  useEffect(() => {
    fetchHealth(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchHealth();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const displayHealth = isLoadingHealth ? HealthStatus.UNKNOWN : health;
  const esIsUnreachable = !isLoadingHealth && health === HealthStatus.UNKNOWN;
  
  let tooltipText = "";
  if (isLoadingHealth) {
    tooltipText = "Loading Elasticsearch status...";
  } else if (displayHealth === HealthStatus.UNKNOWN) {
    // This detailed tooltip is good for the icon itself.
    tooltipText = "Elasticsearch Status: Unknown. Could not retrieve status. Please ensure Elasticsearch is running at http://localhost:9200 and CORS is correctly configured in elasticsearch.yml (http.cors.enabled: true, http.cors.allow-origin).";
  } else {
    tooltipText = baseHealthTooltips[displayHealth];
  }

  return (
    <div className="bg-gray-100 py-2 px-6 text-sm text-gray-800 flex justify-between items-center border-b border-gray-300 shadow-sm min-h-[40px]">
      <div>
      </div>
      <div className="flex items-right">
        <a 
          href="https://www.linkedin.com/in/gorskimariusz/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline text-blue-600 hover:text-blue-700 transition-colors duration-150 mr-4"
          aria-label="Mariusz Górski's LinkedIn Profile"
        >
          Mariusz Górski
        </a>
        <div className="flex items-center" title={tooltipText} aria-label={tooltipText}>
          <PersonIcon className="h-5 w-5 text-gray-600 mr-1.5" aria-hidden="true" />
          <span 
            className={`w-3 h-3 rounded-full inline-block ring-1 ring-offset-1 ring-gray-100 ring-opacity-50 ${healthColors[displayHealth]} transition-colors duration-500 ${isLoadingHealth ? 'animate-pulse' : ''}`}
            role="status"
            aria-live="polite"
          >
            <span className="sr-only">{tooltipText}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
