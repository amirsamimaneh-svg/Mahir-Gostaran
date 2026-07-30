/**
 * نمادهای اعتماد و مشتریان ماهیر.
 *
 * - CLIENTS: لوگوی همکاران/مشتریان. تا وقتی `logo` خالی باشد، یک جای‌گاه (placeholder)
 *   با نام نمایش داده می‌شود. برای افزودن لوگوی واقعی: logo را با مسیر تصویر پر کنید
 *   (مثلاً "/clients/nila.png").
 * - BADGES: نمادهای مجوز مثل اینماد و ساماندهی. وقتی مجوز را گرفتید، `href` را با
 *   لینک واقعی نماد و `active` را true کنید (کد/تصویر رسمی نماد را جایگزین کنید).
 */

export type Client = {
  name: string;
  /** مسیر لوگوی واقعی؛ اگر خالی باشد جای‌گاه نمایش داده می‌شود. */
  logo?: string;
};

export const CLIENTS: Client[] = [
  { name: "نیلا" },
  { name: "آتوسا" },
  { name: "آوای نوین" },
  { name: "برند شما" },
  { name: "برند شما" },
  { name: "برند شما" },
];

export type TrustBadge = {
  title: string;
  subtitle: string;
  /** لینک رسمی نماد؛ تا وقتی خالی/غیرفعال باشد، حالت «به‌زودی» نشان داده می‌شود. */
  href?: string;
  active: boolean;
};

export const BADGES: TrustBadge[] = [
  { title: "نماد اعتماد الکترونیکی", subtitle: "اینماد", active: false },
  { title: "ساماندهی", subtitle: "وزارت فرهنگ و ارشاد", active: false },
  { title: "پرداخت امن", subtitle: "درگاه معتبر", active: false },
];
