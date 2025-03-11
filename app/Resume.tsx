'use client';

import { useState, useEffect, useCallback } from 'react';
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
        <div className="mb-2">
          <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200">{company}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-base">{location}</p>
        </div>
        
        {title && <p className="text-gray-500 dark:text-gray-400 text-base mb-2">{title}</p>}
        
        <ul className="space-y-2">
          {descriptions.map((desc, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#C15F3C] mr-2 mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300 text-base">{desc}</span>
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
    <h3 className="font-medium text-lg text-gray-900 dark:text-gray-200 mb-2">{title}</h3>
    <p className="text-gray-700 dark:text-gray-300 text-base">{description}</p>
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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 个人信息 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center">许璐雅</h1>
          
          <div className="space-y-8">
            {/* 个人简介 */}
            <div>
              <h2 className="font-medium text-xl text-gray-900 dark:text-gray-200 mb-2">个人简介</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                6 年 UI/UX 设计工作经验。现就职于 SHEIN 集团担任高级交互设计师。有企业服务、供应链管和消费级电商 SaaS 产品的业务背景。
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                工作期间积累了国际化、设计系统搭建、数据可视化和体验提量等实践经验，并独立把握流程中的各环节。
              </p>
            </div>
            
            {/* 教育背景 */}
            <div>
              <h2 className="font-medium text-xl text-gray-900 dark:text-gray-200 mb-2">教育背景</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-1">华北理工大学(2014-2018)</p>
              <p className="text-gray-700 dark:text-gray-300 text-lg">艺术学学士，主修现代数字媒体设计</p>
            </div>
            
            {/* 联系方式 */}
            <div id="contact">
              <h2 className="font-medium text-xl text-gray-900 dark:text-gray-200 mb-2">联系方式</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-1">电话：189 2500 1685</p>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-1">邮箱：lrdbufl@gmail.com</p>
              <p className="text-gray-700 dark:text-gray-300 text-lg">微信：lrd.im</p>
            </div>
          </div>
        </div>
        
        {/* 工作经历 */}
        <div className="mb-12">
          <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-6">工作经历</h2>
          
          <Experience 
            period="2024.2 - 至今"
            company="SHEIN"
            location="高级交互设计师，广州"
            title=""
            descriptions={[
              // 空描述，示例中这个职位没有具体描述
            ]}
          />
          
          <Experience 
            period="2023.2 - 2023.8"
            company="ONES"
            location="资深 UI/UX 设计师，深圳"
            title=""
            descriptions={[
              "负责ONES 规划端体验设计，包含着重用户空间模型及驱动整体设计趋势的能力和相应的体验优化；",
              "负责团队协同体任务管理系统的规则梳理和优化，沙盒权限系统改造和 Design Token 实践等；",
              "复杂留存的复盘，分享内容包含：复盘的的本地化设计策略分析（日本和北美），两阶体验指标及其改进方式等。"
            ]}
          />
          
          <Experience 
            period="2021.9 - 2022.11"
            company="欢聚集团"
            location="资深 UI/UX 设计师，广州"
            title=""
            descriptions={[
              "负责虎牙SHOPLINE商家后台数据业务和 App 项目的全流程设计；",
              "主导提案覆盖各角度的体验分析和设计及方案调研，有效提升后台系统的可扩展性和使用感受；",
              "负责虎牙商业场景器的优化和平台管理系统，与 UX 设计师协作统一数据流前标准；",
              "负责 App 整体的视觉风格和交互模式探索，调整基于系统和地区需求特点的体验细节和结构优化策略的实践经验；",
              "支持 SHOPLINE 开放平台：应用商店独立化项目，针对商家和开发者各种个性化的核心诉求体验设计及方案并评效果量。",
              "归纳创新化设计规范，结合外部流程经验和公司业务需求并进行深解拆；并为广州、杭州和西安的设计师参与到联动。"
            ]}
          />
          
          <Experience 
            period="2020.7 - 2021.9"
            company="千麦"
            location="资深 UI 设计师，广州"
            title=""
            descriptions={[
              "负责千麦B 端(商家管理服务站) 业务，担任社区贸易项目，协助达成产品目标；",
              "建立千麦商个资型社区和购物指导系统的组件文件夹库，提升设计、开发、跨部门合作的效率；",
              "负责从零开始设计 Saas商家端CRM，在 Ant Design 的生态下制定开发实现细节规范，梳理数据场景，提出并与产品和开发讨论的实践；",
              "梳理高效协的方式流程设计经验，与团队一起进步。"
            ]}
          />
          
          <Experience 
            period="2018.3 - 2020.4"
            company="阿思达克集团"
            location="高级 UI 设计师，广州"
            title=""
            descriptions={[
              "参与阿思达克 App 界面设计，涉及产品流程、交互模式、动效交付定规范 UI 规范等；",
              "负责调控决策集团项目，独立中心的可工具设备各合作组组的设计方案；",
              "负责面包 数据考辨系统设计，提出并策略使优化设计方案。"
            ]}
          />
          
          <Experience 
            period="2017.7 - 2017.9"
            company="华南农业大学"
            location="实习 UI/UX 设计师，广州"
            title=""
            descriptions={[
              "在农教台学习实践过程的页面构建，根据原型图定完成考勤 App 界面设计；",
              "使用 Element UI 组件库完成后台管理系统界面设计。"
            ]}
          />
        </div>
        
        {/* 技能部分 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-4">专业技能</h2>
            
            <SkillSection 
              title="界面设计"
              description="熟练 Figma 和 Sketch 等软件，主要的响应式和桌面设应用设计分析流程设计和企业，将各类系统化方为用户友好界面文学规格和视觉化-SaaS 实践经验，熟悉 Win/Mac端交互特点分析方法，以数据驱动优化产品经验验数据。"
            />
            
            <SkillSection 
              title="动效设计"
              description="熟练使用 After Effects / Principle / Lottie 设计界面动画，了解两位动画表达方式。"
            />
            
            <SkillSection 
              title="前端实现"
              description="了解基础 React (State, Hooks)，基于在设计过程中和前端设计师配合的经验进行设计与前端的基础，有基础的理解。"
            />
          </div>
          
          <div>
            <SkillSection 
              title="交互设计"
              description="基础语言和英标准ademic，熟练使用"
            />
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