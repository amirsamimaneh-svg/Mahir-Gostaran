export type Project = {
  slug: string;
  category_fa: string;
  category_en: string;
  title_fa: string;
  title_en: string;
  desc_fa: string;
  desc_en: string;
  tags: string[];
  emoji: string;
  color: string; // gradient stop color
  details_fa: string[];
  details_en: string[];
  result_fa: string;
  result_en: string;
};

export const projects: Project[] = [
  {
    slug: "brand-identity-cafe",
    category_fa: "هویت برند",
    category_en: "Brand Identity",
    title_fa: "کافه رزتا",
    title_en: "Rosetta Café",
    desc_fa: "طراحی هویت بصری کامل برای یک کافه مدرن در تهران — از لوگو تا منو و بسته‌بندی.",
    desc_en: "Full visual identity for a modern Tehran café — from logo to menu and packaging.",
    tags: ["لوگو", "بسته‌بندی", "منو", "رنگ‌بندی"],
    emoji: "☕",
    color: "#d97706",
    details_fa: [
      "طراحی لوگوتایپ با فونت سفارشی",
      "پالت رنگی گرم و مدرن",
      "طراحی منوی دیجیتال و چاپی",
      "بسته‌بندی فنجان، کیسه و جعبه شیرینی",
    ],
    details_en: [
      "Custom logotype design with tailored typography",
      "Warm modern color palette",
      "Digital and print menu design",
      "Cup sleeve, bag, and pastry box packaging",
    ],
    result_fa: "۴۰٪ افزایش مشتری در ماه اول راه‌اندازی",
    result_en: "40% increase in customers in the first month",
  },
  {
    slug: "growth-strategy-ecommerce",
    category_fa: "استراتژی رشد",
    category_en: "Growth Strategy",
    title_fa: "دیجی‌استایل",
    title_en: "DigiStyle",
    desc_fa: "طراحی نقشه‌راه رشد ۶ ماهه برای یک فروشگاه اینترنتی پوشاک با هدف دو برابر کردن فروش.",
    desc_en: "6-month growth roadmap for an online clothing store targeting 2× revenue.",
    tags: ["استراتژی", "فروش", "دیجیتال مارکتینگ", "SEO"],
    emoji: "📈",
    color: "#7c3aed",
    details_fa: [
      "تحلیل کامل رقبا و بازار هدف",
      "طراحی قیف فروش و بهینه‌سازی نرخ تبدیل",
      "کمپین اینستاگرام و اینفلوئنسر مارکتینگ",
      "استراتژی محتوا و SEO فنی",
    ],
    details_en: [
      "Full competitor and target market analysis",
      "Sales funnel design and conversion rate optimization",
      "Instagram campaign and influencer marketing",
      "Content strategy and technical SEO",
    ],
    result_fa: "۱۱۵٪ رشد فروش در ۶ ماه",
    result_en: "115% sales growth in 6 months",
  },
  {
    slug: "ai-automation-clinic",
    category_fa: "هوش مصنوعی",
    category_en: "AI Solutions",
    title_fa: "کلینیک دکتر سپهری",
    title_en: "Dr. Sepehri Clinic",
    desc_fa: "پیاده‌سازی سیستم نوبت‌دهی و پاسخ‌گوی هوشمند برای یک کلینیک پزشکی با ۳ شعبه.",
    desc_en: "Smart appointment and chatbot system for a 3-branch medical clinic.",
    tags: ["AI", "اتوماسیون", "چت‌بات", "CRM"],
    emoji: "🤖",
    color: "#0891b2",
    details_fa: [
      "چت‌بات هوشمند برای پاسخ به سوالات رایج",
      "سیستم نوبت‌دهی آنلاین با یادآوری خودکار",
      "داشبورد مدیریت بیماران",
      "یکپارچه‌سازی با اینستاگرام و واتساپ",
    ],
    details_en: [
      "AI chatbot for answering common patient questions",
      "Online scheduling with automated reminders",
      "Patient management dashboard",
      "Integration with Instagram and WhatsApp",
    ],
    result_fa: "۶۵٪ کاهش تماس‌های تلفنی، ۳۰٪ کاهش نوبت‌های فراموش‌شده",
    result_en: "65% drop in phone calls, 30% fewer missed appointments",
  },
  {
    slug: "digital-marketing-restaurant",
    category_fa: "بازاریابی دیجیتال",
    category_en: "Digital Marketing",
    title_fa: "رستوران آرارات",
    title_en: "Ararat Restaurant",
    desc_fa: "مدیریت کامل شبکه‌های اجتماعی و کمپین تبلیغاتی برای رستوران ارمنی در تهران.",
    desc_en: "Full social media management and ad campaign for an Armenian restaurant in Tehran.",
    tags: ["اینستاگرام", "تبلیغات", "محتوا", "عکاسی"],
    emoji: "🍽️",
    color: "#dc2626",
    details_fa: [
      "تولید محتوای روزانه و عکاسی غذا",
      "مدیریت اینستاگرام و پاسخ به کامنت‌ها",
      "کمپین تبلیغات هدفمند در اینستاگرام",
      "همکاری با فودبلاگرها",
    ],
    details_en: [
      "Daily content creation and food photography",
      "Instagram management and comment responses",
      "Targeted Instagram ad campaigns",
      "Collaboration with food bloggers",
    ],
    result_fa: "از ۸۰۰ به ۱۲,۰۰۰ فالوور در ۴ ماه",
    result_en: "From 800 to 12,000 followers in 4 months",
  },
  {
    slug: "brand-strategy-startup",
    category_fa: "استراتژی برند",
    category_en: "Brand Strategy",
    title_fa: "استارتاپ فین‌پی",
    title_en: "FinPay Startup",
    desc_fa: "ساخت هویت برند از صفر برای یک استارتاپ فین‌تک از ایده تا لانچ.",
    desc_en: "Building a brand identity from scratch for a fintech startup — from idea to launch.",
    tags: ["برندینگ", "فین‌تک", "استراتژی", "لانچ"],
    emoji: "💳",
    color: "#059669",
    details_fa: [
      "تحقیق بازار و تعریف پرسونای مشتری",
      "نام‌گذاری، شعار و داستان برند",
      "طراحی هویت بصری کامل",
      "استراتژی لانچ و PR",
    ],
    details_en: [
      "Market research and customer persona definition",
      "Naming, tagline, and brand story",
      "Full visual identity design",
      "Launch strategy and PR",
    ],
    result_fa: "جذب ۵,۰۰۰ کاربر در هفته اول لانچ",
    result_en: "5,000 users acquired in the first launch week",
  },
  {
    slug: "seo-real-estate",
    category_fa: "سئو و محتوا",
    category_en: "SEO & Content",
    title_fa: "مشاور املاک آریا",
    title_en: "Arya Real Estate",
    desc_fa: "بهینه‌سازی موتور جستجو و تولید محتوای تخصصی برای یک آژانس املاک.",
    desc_en: "Search engine optimization and expert content production for a real estate agency.",
    tags: ["SEO", "محتوا", "بلاگ", "گوگل"],
    emoji: "🏠",
    color: "#ea580c",
    details_fa: [
      "آدیت کامل فنی سایت",
      "تحقیق کلمات کلیدی و استراتژی محتوا",
      "تولید ۲۴ مقاله تخصصی در ۶ ماه",
      "بهینه‌سازی صفحات محصول",
    ],
    details_en: [
      "Full technical site audit",
      "Keyword research and content strategy",
      "24 expert articles produced in 6 months",
      "Product page optimization",
    ],
    result_fa: "صفحه اول گوگل برای ۳۸ کلمه کلیدی هدف",
    result_en: "Page 1 Google ranking for 38 target keywords",
  },
];
