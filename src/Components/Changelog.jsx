import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LuArrowRight, LuArrowDown } from "react-icons/lu";

function Changelog() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [changelogData, setChangelogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await axios.get('https://api.github.com/repos/jaysonreales007/cat-town-calculator/commits');

        const formattedData = response.data.map((commit, index) => ({
          version: `1.0.${response.data.length - index}`,
          date: new Date(commit.commit.author.date).toISOString().split('T')[0],
          changes: [commit.commit.message]
        }));
        setChangelogData(formattedData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching changelog:', err);
        setError('Failed to fetch changelog data');
        setIsLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">🐱Changelog</h3>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
      >
        {isExpanded ? (
          <>
            Hide Changelog <LuArrowDown className="ml-2" />
          </>
        ) : (
          <>
            Show Changelog <LuArrowRight className="ml-2" />
          </>
        )}
      </button>
      {isExpanded && (
        <div className="space-y-4">
          {isLoading ? (
            <p>Loading changelog...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            changelogData.map((release, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h4 className="text-lg font-semibold">Version {release.version} <span className="text-sm font-normal text-gray-600">({release.date})</span></h4>
                <ul className="mt-2 space-y-1">
                  {release.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{change.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Changelog;