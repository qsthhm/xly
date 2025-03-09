'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [phoneButtonText, setPhoneButtonText] = useState('复制我的手机号');
  const [emailButtonText, setEmailButtonText] = useState('709020257@qq.com');
  const [phoneButtonIcon, setPhoneButtonIcon] = useState('phone');
  const [emailButtonIcon, setEmailButtonIcon] = useState('email');
  
  const modalRef = useRef<HTMLDivElement>(null);
  
  // 处理视频播放暂停
  useEffect(() => {
    if (isOpen) {
      // 查找视频播放器并暂停
      try {
        const videoElement = document.querySelector('video');
        if (videoElement && !videoElement.paused) {
          videoElement.pause();
          // 存储视频播放状态
          videoElement.dataset.wasPlaying = 'true';
        }
      } catch (error) {
        console.error('暂停视频时出错:', error);
      }
    } else {
      // 关闭弹窗时，如果视频之前在播放则恢复播放
      try {
        const videoElement = document.querySelector('video');
        if (videoElement && videoElement.dataset.wasPlaying === 'true') {
          videoElement.play().catch(e => console.error('恢复播放失败:', e));
          delete videoElement.dataset.wasPlaying;
        }
      } catch (error) {
        console.error('恢复视频播放时出错:', error);
      }
    }
  }, [isOpen]);
  
  // 复制手机号
  const copyPhone = () => {
    navigator.clipboard.writeText('18925001685').then(() => {
      setPhoneButtonText('已复制18925001685');
      setPhoneButtonIcon('check');
      
      // 3秒后恢复原样
      setTimeout(() => {
        setPhoneButtonText('复制我的手机号');
        setPhoneButtonIcon('phone');
      }, 3000);
    });
  };
  
  // 复制邮箱
  const copyEmail = () => {
    navigator.clipboard.writeText('709020257@qq.com').then(() => {
      setEmailButtonText('已复制709020257@qq.com');
      setEmailButtonIcon('check');
      
      // 3秒后恢复原样
      setTimeout(() => {
        setEmailButtonText('709020257@qq.com');
        setEmailButtonIcon('email');
      }, 3000);
    });
  };
  
  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC键关闭弹窗
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F2F1EA] dark:bg-[#141414]">
      <div 
        ref={modalRef}
        className="relative bg-white dark:bg-[#202020] rounded-xl p-5 max-w-xs w-full shadow-xl transform transition-all"
      >
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          aria-label="关闭"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center mb-4">
          <h3 className="font-medium text-base text-gray-900 dark:text-gray-100 mb-5">扫一扫加我微信</h3>
          
          {/* 二维码图片 */}
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48 bg-white p-2 rounded-lg">
              <Image 
                src="/img/wechat.png" 
                alt="微信二维码" 
                width={192}
                height={192}
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="text-center text-gray-500 dark:text-gray-400 mb-4">
            或
          </div>
        </div>
        
        {/* 复制手机号按钮 - 修改颜色 */}
        <button
          onClick={copyPhone}
          className="flex items-center justify-center w-full py-2.5 px-4 mb-3 rounded-lg bg-[#ECEAE3] dark:bg-[#373737] text-gray-700 dark:text-gray-200 hover:bg-[#E3E2D9] dark:hover:bg-[#424242] transition-colors"
        >
          {phoneButtonIcon === 'phone' ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-[#C15F3C]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          {phoneButtonText}
        </button>
        
        {/* 复制邮箱按钮 - 修改颜色 */}
        <button
          onClick={copyEmail}
          className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-[#ECEAE3] dark:bg-[#373737] text-gray-700 dark:text-gray-200 hover:bg-[#E3E2D9] dark:hover:bg-[#424242] transition-colors"
        >
          {emailButtonIcon === 'email' ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-[#C15F3C]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          {emailButtonText}
        </button>
      </div>
    </div>
  );
}