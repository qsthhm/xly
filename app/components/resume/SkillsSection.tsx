'use client';

import React from 'react';
import SkillSectionItem from './SkillSection';

export default function SkillsSection() {
  return (
    <div>
      <h2 className="font-medium text-2xl text-gray-900 dark:text-gray-200 mb-6">专业技能</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div>
          <SkillSectionItem 
            title="三维制作"
            description="精通3Dmax软件，擅长建筑场景与空间设计，能够创建高质量的三维模型和动画。具备异型幕影片制作的专业经验，能解决复杂的相机动画和场景过渡问题。"
          />
        </div>
        
        <div>
          <SkillSectionItem 
            title="后期制作"
            description="精通After Effects和Premiere Pro，擅长视频合成、特效制作、色彩校正和剪辑节奏控制。能够处理4K-12K高分辨率素材，熟悉各类展示屏幕的技术规格和视觉要求。"
          />
        </div>
        
        <div>
          <SkillSectionItem 
            title="项目管理"
            description="具备12年项目管理经验，熟悉数字视觉制作全流程，擅长资源调配、进度控制和质量把关。建立了完善的SOP流程体系，能有效提升团队协作效率和项目交付质量。"
          />
        </div>
        
        <div>
          <SkillSectionItem 
            title="团队领导"
            description="领导20人跨部门团队高效协作，擅长人才培养和团队建设。创建"阶梯式培训+轮岗激励"体系，促进团队成员专业成长。具备出色的沟通能力和问题解决能力。"
          />
        </div>
      </div>
    </div>
  );
}
