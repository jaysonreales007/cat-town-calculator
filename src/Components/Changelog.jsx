import React, { useState } from 'react';

const changelogData = [
  {
    version: "1.1.0",
    date: "2024-10-01",
        changes: [
      "Fixed CATS conversion issue",
      "Added ETH exchange rate calculator",
      "Improved FLOOF calculation accuracy",
      "Fixed minor UI bugs"
    ]
  },
  {
    version: "1.0.1",
    date: "2024-9-30",
    changes: [
      "Updated donation addresses",
      "Updated footer section"
    ]
  },
  {
    version: "1.0.0",
    date: "2024-09-30",
    changes: [
      "Initial release of Cat Town FLOOF Calculator",
      "Basic FLOOF and CATS generation calculations",
      "Simple UI for input and display"
    ]
  }
];

function Changelog() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Changelog</h3>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {isExpanded ? "Hide Changelog" : "Show Changelog"}
      </button>
      {isExpanded && (
        <div className="space-y-4">
          {changelogData.map((release, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h4 className="text-lg font-semibold">Version {release.version} <span className="text-sm font-normal text-gray-600">({release.date})</span></h4>
              <ul className="mt-2 space-y-1">
                {release.changes.map((change, changeIndex) => (
                  <li key={changeIndex} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Changelog;