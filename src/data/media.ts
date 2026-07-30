/**
 * پیکربندی ویدیوی معرفی ماهیر.
 *
 * تا وقتی مقدار `INTRO_VIDEO` برابر `null` باشد، یک باکس حرفه‌ای «به‌زودی»
 * نمایش داده می‌شود. هر وقت ویدیو آماده شد، کافی است این مقدار را پر کنید:
 *
 *   // برای آپارات / یوتیوب (لینک embed):
 *   export const INTRO_VIDEO = {
 *     type: "iframe" as const,
 *     url: "https://www.aparat.com/video/video/embed/videohash/XXXXX/vt/frame",
 *   };
 *
 *   // برای فایل mp4 مستقیم روی هاست خودتان:
 *   export const INTRO_VIDEO = {
 *     type: "file" as const,
 *     url: "/videos/intro.mp4",
 *     poster: "/videos/intro-poster.jpg", // اختیاری
 *   };
 */
export type IntroVideo =
  | { type: "iframe"; url: string }
  | { type: "file"; url: string; poster?: string };

export const INTRO_VIDEO: IntroVideo | null = null;
