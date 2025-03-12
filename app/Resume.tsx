'use client';

import { useState, useEffect, useCallback } from 'react';
import ContactModal from './components/ContactModal';
import Navigation from './components/Navigation';
import Image from 'next/image';

// 主要经历组件
const Experience = ({ period, company, location, title, descriptions }) => (
  <div className="mb-8">
    <div className="flex space-x-6">
      {/* 左侧时间 */}
      <div className="w-28 flex-shrink-0">
        <span className="text-gray-500 dark:text-gray-400 text-base">{period}</span>
      </div>
      
      {/* 右侧内容 */}
      <div className="flex-1">
        <div className="mb-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200">{company}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-base">{location}</p>
        </div>
        
        {title && <p className="text-gray-500 dark:text-gray-400 text-base mb-2">{title}</p>}
        
        {descriptions && descriptions.length > 0 && (
          <ul className="space-y-1.5">
            {descriptions.map((desc, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#C15F3C] dark:text-[#C15F3C] mr-2 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{desc}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

// 案例展示组件
const CaseStudy = ({ title, image, time, scale, team, cycle, responsibilities, results }) => (
  <div className="mb-12">
    <div className="flex space-x-6">
      {/* 左侧图片 */}
      <div className="w-28 flex-shrink-0">
        <div className="relative w-full h-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      {/* 右侧内容 */}
      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200 mb-3">{title}</h3>
        
        <div className="mb-3">
          {time && (
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
              <span className="font-medium">项目时间：</span>{time}
            </p>
          )}
          
          {scale && (
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
              <span className="font-medium">项目规模：</span>{scale}
            </p>
          )}
          
          {team && (
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
              <span className="font-medium">团队规模：</span>{team}
            </p>
          )}
          
          {cycle && (
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              <span className="font-medium">制作周期：</span>{cycle}
            </p>
          )}
        </div>
        
        {responsibilities && responsibilities.length > 0 && (
          <div className="mb-3">
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed font-medium mb-2">主要职责：</p>
            <ul className="space-y-1.5">
              {responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#C15F3C] dark:text-[#C15F3C] mr-2 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {results && (
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            <span className="font-medium">项目成果：</span>{results}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default function Resume() {
  const [mounted, setMounted] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleContactClick = useCallback(() => {
    setContactModalOpen(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-[#F0EFE7] dark:bg-[#141414] text-gray-900 dark:text-gray-200 min-h-screen">
      <Navigation onContactClick={handleContactClick} />

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">许璐雅</h1>
              <p className="text-gray-500 dark:text-gray-400 text-base">
                12年经验 <span className="mx-1.5 text-gray-400 dark:text-gray-500">|</span> 
                数字视觉领域专家 <span className="mx-1.5 text-gray-400 dark:text-gray-500">|</span> 
                项目经理
              </p>
            </div>
            
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
          
          <div>
            <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-200 mb-4">个人简介</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
              12年数字视觉领域经验(建筑动画7年和数字展馆5年)，精通三维可视化全流程管理。主导200+商业项目交付，包括120+地产影片和30+政企展厅，服务万达、保利、金茂等TOP10房企及政府重点项目。
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              技术实力：精通全流程数字视觉制作和技术方案落地，掌握3Dmax/AE/PR高级应用，专注异型幕影片制作和沉浸式体验设计。管理20人团队高效协作，建立标准化SOP体系，项目交付准时率提升35%，客户满意度达92%。
            </p>
          </div>
        </div>
        
        {/* 个人简介和主要经历之间的分隔线 */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-12"></div>
        
        {/* 主要经历 */}
        <div className="mb-12">
          <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-200 mb-6">主要经历</h2>
          
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
              "创新实施分类管理项目监督层级机制，项目交付准时率提升35%"
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
          
          <Experience 
            period="2010.07 - 2013.05"
            company="上海工艺美术职业学院"
            location="展示设计"
            title=""
            descriptions={[]}
          />
        </div>
        
        {/* 主要经历和案例展示之间的分隔线 */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-12"></div>
        
        {/* 案例展示 */}
        <div>
          <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-200 mb-6">案例展示</h2>
          
          <div className="space-y-2">
            <CaseStudy
              title="舟山城市展示馆-《飞跃舟山》" 
              image="/img/01.png"
              time="2023年6月-9月"
              scale="五折幕沉浸式影院，全三维场景渲染，分辨率达12K，帧率30fps，约9分钟"
              team="核心制作团队12人，包括三维建模师、动画师、特效师、音效师等"
              responsibilities={[
                "主导影片整体创意方向，设计舟山群岛主题故事线，打造具有视觉冲击力的叙事结构",
                "负责所有三维镜头的设计与实现，包括镜头走向、转场设计、场景衔接等",
                "协调团队完成全三维场景的建模、渲染及特效制作，优化12K分辨率下的视觉效果",
                "统筹12人团队的分工与协作，制定详细项目计划，确保项目按时高质量交付"
              ]}
              results="影片成功落地并成为舟山城市展示馆的核心展项，获得参观者与馆方一致好评。通过该项目，展现了在大型沉浸式影片制作中的全流程管理能力、三维视觉设计能力及团队协作能力。"
            />
            
            <CaseStudy
              title="2022博博会-《华夏万载》" 
              image="/img/02.png"
              time="2022年3月-8月"
              scale="瀑布屏沉浸式影片，分辨率4K，帧率30fps，融合水墨风、三维实景、动态特效等多重视觉风格，时长4分30秒"
              team="12人跨领域团队（C4D、3ds Max、AE、PR等）"
              responsibilities={[
                "配合策划团队，设计从史前文明到现代科技的内容框架，整合水墨风与三维实景双重风格",
                "主导关键场景的三维镜头设计，监督跨朝代场景的无缝转场与瀑布屏适配",
                "协调多软件协作，带队完成现场投放测试，确保展览期间零故障运行"
              ]}
              results="影片成为博博会热门展项，日均吸引超3000人次观看，多家媒体报道其以创新形式激活传统文化。超70%的参展家长带孩子重复观看，部分观众现场记录影片知识点，实现文化传播与教育功能双赢。"
            />
            
            <CaseStudy
              title="鸦片战争纪念馆" 
              image="/img/03.png"
              time="2022年7月"
              scale="投影（6K分辨率）+ LED全息（4K分辨率），帧率30fps，时长9分30秒"
              team="16人跨领域团队（策划、拍摄、三维制作、后期合成等）"
              cycle="半个月（含绿幕抠像、三维制作及后期合成）"
              responsibilities={[
                "协调演员、舞蹈拍摄及抠像工作，确保历史场景的真实感与艺术性",
                "主导定海城三维还原、战争场景制作及人物与场景的合成，把控相机动画与单帧效果",
                "在极短制作周期内高效推进项目，确保各环节无缝衔接，返工率低于行业平均水平"
              ]}
              results="影片成功落地，成为舟山鸦片战争纪念馆的核心展项，日均接待游客超500人次，获馆方与观众一致好评。在极短周期内高质量交付，展现了团队的高效协作与项目管理能力。"
            />
            
            <CaseStudy
              title="陕北三战三捷纪念馆" 
              image="/img/01.png"
              scale="以投影形式，结合油画背景，上方空白区域用于播放视频素材，下方油画区域结合山地表现战场作战场面"
              responsibilities={[
                "解决人物动作、运动流线问题，统筹项目全流程管理",
                "协调策划、设计、技术团队，确保项目按时交付"
              ]}
              results="项目在规定时间提前完成现场测试，确保客户顺利接待重要领导。"
            />
          </div>
        </div>
      </div>
      
      {/* 页面底部增加间距 */}
      <div className="h-24"></div>
      
      {/* 联系人弹窗 */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </div>
  );
}