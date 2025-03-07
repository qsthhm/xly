/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      unoptimized: true, // 避免图片优化问题
    },
    // 如果还有问题，可以尝试添加以下配置
    experimental: {
      esmExternals: false,
    },
  }
  
  module.exports = nextConfig