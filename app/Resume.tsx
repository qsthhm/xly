'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactModal from './components/ContactModal';
import Navigation from './components/Navigation';

// 主要经历组件
interface ExperienceProps {
  period: string;
  company: string;
  location: string;
  title: string;
  descriptions: string[];
}

const Experience = ({ period, company, location, title, descriptions }: ExperienceProps) => (
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

// 技能组件
interface SkillSectionProps {
  title: string;
  description: string;
}

const SkillSection = ({ title, description }: SkillSectionProps) => (
  <div className="mb-6">
    <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200 mb-3">{title}</h3>
    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{description}</p>
  </div>
);

export default function Resume() {
  const [mounted, setMounted] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 处理联系按钮点击
  const handleContactClick = useCallback(() => {
    setContactModalOpen(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F0EFE7] dark:bg-[#141414] text-gray-900 dark:text-gray-200">
      <Navigation onContactClick={handleContactClick} />

      {/* 简历内容 */}
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* 个人信息 */}
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
          
          <div className="text-center mb-8">
            <p className="text-base text-gray-600 dark:text-gray-400">
              12年工作经验 | 专注于数字视觉领域 | 项目经理
            </p>
          </div>
          
          <div className="space-y-8">
            {/* 个人简介 */}
            <div>
              <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-4">个人简介</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                12年行业经验，擅长跨界融合艺术创意与技术实现。主导200+商业项目交付，涵盖120+地产影片与30+政企展厅，协作万达、保利、金茂等TOP10房企及政府重点文化工程，项目总价值超2000万元。
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                技术实力扎实，精通全流程数字视觉制作与技术方案落地，掌握3Dmax/AE/PR高级应用，专精异型幕影片制作与沉浸式体验设计。
              </p>
            </div>
            
            {/* 教育背景 */}
            <div>
              <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-4">教育背景</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-1">华北理工大学(2014-2018)</p>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">艺术学学士，主修现代数字媒体设计</p>
            </div>
          </div>
        </div>
        
        {/* 工作经历 */}
        <div className="mb-12">
          <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-6">工作经历</h2>
          
          <Experience 
            period="2021.05 - 至今"
            company="上海妙文创意科技有限公司"
            location="影视后期副总监，上海浦东"
            title=""
            descriptions={[
              "统筹数字视觉项目全流程管理，年均监制147部影片，2023年产能提升82%",
              "领导跨部门创意团队，对接政企客户需求，协调脚本创意与技术实现",
              "建立标准化项目交付流程，优化资源配置，提升团队运转效率",
              "搭建人才培养体系，实施动态人员管理与职责轮换机制",
              "成功交付《舟山城市馆》、《陕北三战三捷纪念馆》等30+政企展厅项目",
              "创新实施"分类管理项目监督层级"机制，项目交付准时率提升35%",
              "建立"阶梯式培训+轮岗激励"体系，3年内培养4名项目经理",
              "优化临时紧急项目流程，应急项目交付周期缩短40%"
            ]}
          />
          
          <Experience 
            period="2020.06 - 2021.04"
            company="上海壹然数字科技有限公司"
            location="多媒体项目经理，上海浦东"
            title=""
            descriptions={[
              "全程把控宣传片制作流程，包括前期策划、现场拍摄与后期制作",
              "协调导演、摄影、演员等多方资源，组织现场拍摄与场地协调",
              "负责走访勘景、拍摄素材整理、剪辑包装直至成片交付",
              "独立完成《张家港工业云展厅》全流程影片制作",
              "优化工业题材拍摄流程，缩短40%现场拍摄时间",
              "解决多个疑难技术问题，确保项目高质量交付"
            ]}
          />
        </div>
        
        {/* 技能部分 */}
        <div>
          <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-6">专业技能</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <SkillSection 
                title="视觉制作"
                description="精通全流程数字视觉制作与技术方案落地，掌握3Dmax/AE/PR高级应用，专精异型幕影片制作与沉浸式体验设计。成功交付多12K分辨率大型五折幕/瀑布屏项目，技术故障率低于行业平均水平的25%。"
              />
            </div>
            
            <div>
              <SkillSection 
                title="项目管理"
                description="带领20人团队跨部高效协作，优化制作流程与资源配置，制定标准化SOP体系，使项目交付准时率提升35%，客户满意度达92%。创建"阶梯式培训+轮岗激励"人才发展机制。"
              />
            </div>
            
            <div>
              <SkillSection 
                title="创意价值"
                description="擅长转化抽象需求为具象方案，项目复投率达65%。《华夏万载》项目日均吸引3000+观众，《舟山城市展示馆》成为当地文化打卡地标，获省级文化创意奖项提名。"
              />
            </div>
            
            <div>
              <SkillSection 
                title="团队协作"
                description="能高效组织跨部门团队合作，平衡技术实现与创意需求，善于沟通协调解决项目各阶段困难，培养新人并推动团队整体成长，实施动态人员管理与职责轮换机制。"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* 联系人弹窗 */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </main>
  );
}