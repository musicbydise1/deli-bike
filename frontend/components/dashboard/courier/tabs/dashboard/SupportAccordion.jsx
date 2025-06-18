'use client';
import React from 'react';

export default function SupportAccordion({ supportItems, openIndex, toggleItem }) {
  return (
    <div className="mt-8 border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Поддержка</h3>
      <div className="divide-y divide-gray-200">
        {supportItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left py-3 focus:outline-none flex items-center justify-between"
            >
              <span className="font-medium text-gray-800">{item.title}</span>
              <svg
                className={`w-4 h-4 text-gray-500 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="text-sm text-gray-700 mb-3">{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
