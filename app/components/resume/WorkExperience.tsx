'use client';

import React from 'react';
import ExperienceItem from './ExperienceItem';

export default function WorkExperience() {
  return (
    <div className="mb-12">
      <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-6">工作经历</h2>
      
      <ExperienceItem 
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
          "创新实施"分类管理项目监督层级"机制，项目交付准时率提升35%"
        ]}
      />
      
      <ExperienceItem 
        period="2020.06 - 2021.04"
        company="上海壹然数字科技有限公司"
        location="多媒体项目经理，上海浦东"
        title=""
        descriptions={[
          "全程把控宣传片制作流程，包括前期策划、现场拍摄与后期制作",
          "协调导演、摄影、演员等多方资源，组织现场拍摄与场地协调",
          "负责走访勘景、拍摄素材整理、剪辑包装直至成片交付",
          "独立完成《张家港工业云展厅》全流程影片制作",
          "优化工业题材拍摄流程，缩短40%现场拍摄时间"
        ]}
      />
      
      <ExperienceItem 
        period="2014.06 - 2020.05"
        company="丝路视觉科技股份有限公司"
        location="项目经理，上海"
        title=""
        descriptions={[
          "与客户沟通脚本，深入了解客户需求，配合脚本制作完成镜头动画预演",
          "与各环节制作人员协调沟通，推进影片制作，监督镜头制作进度",
          "把控影片剪辑、音乐及转场衔接，确保画面效果与影片整体质量",
          "负责片头片尾包装、logo演绎、区位制作、视频及图片包装等",
          "参与保利、绿地、金茂、富力、碧桂园、泰禾院子等120多条地产影片的后期制作",
          "主导项目包括《太湖院子》、《青岛东方小镇》、《金地平金中心》、《保利广场》等"
        ]}
      />
      
      <ExperienceItem 
        period="2013.04 - 2014.05"
        company="上海景上数码科技"
        location="后期制作，上海"
        title=""
        descriptions={[
          "负责建筑动画后期制作，包括logo演绎、区位及业态制作、视频及图片包装等",
          "参与简单三维动画制作及渲染",
          "参与制作青岛万达、无锡万达、哈尔滨万达等旅游娱乐的三维影片后期制作"
        ]}
      />
    </div>
  );
}