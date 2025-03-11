'use client';

import React from 'react';

interface ExperienceProps {
  period: string;
  company: string;
  location: string;
  title: string;
  descriptions: string[];
}

export default function ExperienceItem({ period, company, location, title, descriptions }: ExperienceProps) {
  return (
    <div className="mb-10">
      <div className="flex space-x-6">
        {/* 左侧时间 */}
        <div className="w-36 flex-shrink-0">
          <span className="text-gray-500 dark:text-gray-400 text-base">{period}</span>
        </div>
        
        {/* 右侧内容 */}
        <div className="flex-1">
          <div className="mb-3">
            <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200">{company}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-base">{location}</p>
          </div>
          
          {title && <p className="text-gray-500 dark:text-gray-400 text-base mb-3">{title}</p>}
          
          <ul className="space-y-2.5">
            {descriptions.map((desc, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-500 mr-2 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}