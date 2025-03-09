'use client';

import dynamic from 'next/dynamic';
import PasswordProtection from '../components/PasswordProtection';

// 动态导入Resume组件以避免服务器端渲染
const Resume = dynamic(() => import('../Resume'), {
  ssr: false,
});

export default function ResumePage() {
  return (
    <PasswordProtection password="daya">
      <Resume />
    </PasswordProtection>
  );
}