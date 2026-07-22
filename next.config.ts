import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // خروجی کاملاً استاتیک در پوشه‌ی out/ برای هاست معمولی
  output: "export",
  // هر مسیر به‌صورت پوشه/index.html خروجی می‌گیرد (سازگار با هاست‌های ساده)
  trailingSlash: true,
  // بدون سرور بهینه‌سازی تصویر (حالت استاتیک)
  images: { unoptimized: true },
};

export default nextConfig;
