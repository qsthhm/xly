'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import PasswordProtection from '../components/PasswordProtection';

// 动态导入Resume组件以避免服务器端渲染
const Resume = dynamic(() => import('../Resume'), {
  ssr: false,
});

export default function ResumePage() {
  // 创建一个联系按钮回调，当密码页面里的联系按钮被点击时会触发
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  const handleContactClick = () => {
    setContactModalOpen(true);
  };
  
  return (
    <PasswordProtection password="daya">
      <Resume />
    </PasswordProtection>
  );
}