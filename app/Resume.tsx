'use client';

import { useState, useEffect, useCallback } from 'react';
import ContactModal from './components/ContactModal';
import Navigation from './components/Navigation';
import ResumeHeader from './components/resume/ResumeHeader';
import WorkExperience from './components/resume/WorkExperience';
import ProjectsSection from './components/resume/ProjectsSection';
import SkillsSection from './components/resume/SkillsSection';

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
        <ResumeHeader />
        <WorkExperience />
        <ProjectsSection />
        <SkillsSection />
      </div>
      
      {/* 联系人弹窗 */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </div>
  );
}