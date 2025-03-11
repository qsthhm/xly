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
    <div className="min-h-screen bg-[#F0EFE7] dark:bg-[#141414] text-gray-900 dark:text-gray-200">
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
          
          <div className="space-y-8">
            <div>
              <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-4">个人简介</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
                12年数字视觉领域经验(建筑动画7年和数字展馆5年)，精通三维可视化全流程管理。主导200+商业项目交付，包括120+地产影片和30+政企展厅，服务万达、保利、金茂等TOP10房企及政府重点项目。
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                技术实力：精通全流程数字视觉制作和技术方案落地，掌握3Dmax/AE/PR高级应用，专注异型幕影片制作和沉浸式体验设计。管理20人团队高效协作，建立标准化SOP体系，项目交付准时率提升35%，客户满意度达92%。
              </p>
            </div>
            
            {/* 教育背景 */}
            <div>
              <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-4">教育背景</h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-1">上海工艺美术职业学院(2010-2013)</p>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">展示设计</p>
            </div>
          </div>
        </div>
        
        {/* 工作经历 */}
        <div className="mb-12">
          <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-6">工作经历</h2>
          
          <Experience 
            period="2021.05 - 至今"
            company="上海妙文创意科技有限公司"
            location="影视后期副总监，上海"
            title=""
            descriptions={[
              "统筹数字视觉项目全流程管理，年均监制147部影片，2023年产能提升82%",
              "领导跨部门创意团队，对接政企客户需求，协调脚本创意和技术实现",
              "建立标准化项目交付流程，优化资源配置，提升团队运转效率",
              "搭建人才培养体系，实施动态人员管理和职责轮换机制",
              "成功交付舟山城市馆、陕北三战三捷纪念馆等30+政企展厅项目",
              "创新实施\"分类管理项目监督层级\"机制，项目交付准时率提升35%"
            ]}
          />
          
          <Experience 
            period="2020.06 - 2021.04"
            company="上海壹然数字科技有限公司"
            location="多媒体项目经理，上海"
            title=""
            descriptions={[
              "全程把控宣传片制作流程，包括前期策划、现场拍摄和后期制作",
              "协调导演、摄影、演员等多方资源，组织现场拍摄和场地协调",
              "负责走访勘景、拍摄素材整理、剪辑包装直至成片交付",
              "独立完成张家港工业云展厅全流程影片制作",
              "优化工业题材拍摄流程，缩短40%现场拍摄时间",
              "解决多个疑难技术问题，确保项目高质量交付"
            ]}
          />
          
          <Experience 
            period="2014.06 - 2020.05"
            company="丝路视觉科技股份有限公司"
            location="项目经理，上海"
            title=""
            descriptions={[
              "与客户沟通脚本，深入了解客户需求，配合脚本制作完成镜头动画预演",
              "与各环节制作人员协调沟通，推进影片制作，监督镜头制作进度",
              "把控影片剪辑、音乐及转场衔接，确保画面效果和影片整体质量",
              "负责片头片尾包装、logo演绎、区位制作、视频及图片包装等",
              "参与保利、绿地、金茂、富力、碧桂园等120多条地产影片的后期制作",
              "主导太湖院子、青岛东方小镇、金地平金中心等多个项目"
            ]}
          />
          
          <Experience 
            period="2013.04 - 2014.05"
            company="上海景上数码科技"
            location="后期制作，上海"
            title=""
            descriptions={[
              "负责建筑动画后期制作，包括logo演绎、区位及业态制作、视频及图片包装等",
              "参与简单三维动画制作及渲染",
              "参与制作青岛万达、无锡万达、哈尔滨万达等旅游娱乐三维影片后期制作"
            ]}
          />
        </div>
        
        {/* 技能部分 */}
        <div>
          <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-6">专业技能</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <SkillSection 
                title="三维制作"
                description="精通3Dmax软件，擅长建筑场景和空间设计，能创建高质量三维模型和动画。具备异型幕影片制作的专业经验，能解决复杂的相机动画和场景过渡问题。成功交付多个12K分辨率大型五折幕/瀑布屏项目。"
              />
            </div>
            
            <div>
              <SkillSection 
                title="后期制作"
                description="精通After Effects和Premiere Pro，擅长视频合成、特效制作、色彩校正和剪辑节奏控制。能处理4K-12K高分辨率素材，熟悉各类展示屏幕的技术规格，技术故障率低于行业平均水平的25%。"
              />
            </div>
            
            <div>
              <SkillSection 
                title="项目管理"
                description="具备12年项目管理经验，熟悉数字视觉制作全流程，擅长资源调配、进度控制和质量把关。建立完善的SOP流程体系，提升团队协作效率和项目交付质量，使项目交付准时率提升35%，客户满意度达92%。"
              />
            </div>
            
            <div>
              <SkillSection 
                title="团队领导"
                description="领导20人跨部门团队高效协作，擅长人才培养和团队建设。创建\"阶梯式培训+轮岗激励\"人才发展机制，3年内培养4名核心骨干晋升项目经理岗位。具备出色的沟通能力和问题解决能力。"
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
    </div>
  );
}