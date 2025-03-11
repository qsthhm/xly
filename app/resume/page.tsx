'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import PasswordProtection from '../components/PasswordProtection';
import ContactModal from '../components/ContactModal';

// 动态导入Resume组件以避免服务器端渲染
const Resume = dynamic(() => import('../Resume'), {
  ssr: false,
});

export default function ResumePage() {
  // 创建一个联系按钮点击状态
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  const handleContactClick = () => {
    setContactModalOpen(true);
  };
  
  return (
    <>
      <PasswordProtection password="daya" onContactClick={handleContactClick}>
        <Resume />
      </PasswordProtection>
      
      {/* 联系人弹窗 */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </>
  );
}