'use client';

import React from 'react';

interface SkillSectionProps {
  title: string;
  description: string;
}

export default function SkillSectionItem({ title, description }: SkillSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200 mb-3">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{description}</p>
    </div>
  );
}