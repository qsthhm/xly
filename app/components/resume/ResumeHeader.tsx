'use client';

import React from 'react';

export default function ResumeHeader() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">许璐雅</h1>
        
        <a 
          href="/resume.pdf" 
          target="_blank" 
          className="flex items-center px-3 py-1.5 bg-transparent border border-[#DDDDD8] dark:border-[#383838] text-gray-600 dark:text-gray-400 text-sm rounded-full transition-colors hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          下载PDF
        </a>
      </div>
      
      <div className="space-y-8">
        <div>
          <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-4">个人简介</h2>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
            12年深耕数字视觉领域（建筑动画7年+数字展馆5年），精通三维可视化全流程管理。主导200+商业项目交付（含120+地产影片、30+政企展厅），服务万达、保利、金茂等TOP10房企及政府重点文化工程，项目总价值超2000万元。
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            技术实力：艺术功底扎实（6年美术基础），精通全流程数字视觉制作与技术方案落地，掌握3Dmax/AE/PR高级应用，专精异型幕影片制作与沉浸式体验设计。管理能力：带领20人团队跨部门高效协作，制定标准化SOP体系，项目交付准时率提升35%。搭建"阶梯式培训+轮岗激励"人才发展机制，3年内培养4名项目经理。
          </p>
        </div>
        
        {/* 教育背景 */}
        <div>
          <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-4">教育背景</h2>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-1">上海工艺美术职业学院 (2010-2013)</p>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">展示设计</p>
        </div>
      </div>
    </div>
  );
}