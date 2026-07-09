export type Post = {
  slug: string;
  emoji: string;
  category_fa: string;
  category_en: string;
  title_fa: string;
  title_en: string;
  excerpt_fa: string;
  excerpt_en: string;
  body_fa: string[];
  body_en: string[];
  date: string;
  readMin: number;
};

export const posts: Post[] = [
  {
    slug: "brand-identity-101",
    emoji: "✦",
    category_fa: "برندینگ",
    category_en: "Branding",
    title_fa: "هویت برند چیست و چرا کسب‌وکار شما به آن نیاز دارد؟",
    title_en: "What Is Brand Identity and Why Does Your Business Need It?",
    excerpt_fa: "هویت برند فراتر از لوگو است — سیستمی است که مشتریان را به شما وفادار می‌کند.",
    excerpt_en: "Brand identity goes beyond a logo — it's the system that builds customer loyalty.",
    body_fa: [
      "هویت برند مجموعه‌ای از عناصر بصری و کلامی است که کسب‌وکار شما را در ذهن مخاطب می‌سازد: از رنگ و تایپوگرافی تا لحن پیام‌ها و شخصیت برند.",
      "وقتی مشتری برای اولین بار با کسب‌وکار شما روبرو می‌شود — چه در اینستاگرام، چه روی بسته‌بندی، چه در وب‌سایت — هویت برند تصمیم می‌گیرد که آیا اعتماد می‌کند یا نه.",
      "تحقیقات نشان می‌دهد برندهایی که هویت منسجم دارند تا ۲۳٪ درآمد بیشتری نسبت به رقبا کسب می‌کنند. این عدد برای کسب‌وکارهای کوچک که هنوز در حال ساخت اعتماد هستند، اهمیت دوچندانی دارد.",
      "در ماهیر، فرآیند ساخت هویت برند را از کشف ارزش‌های اصلی شما شروع می‌کنیم، نه از انتخاب رنگ. چون رنگ باید روایت‌گر ارزش‌ها باشد، نه برعکس.",
    ],
    body_en: [
      "Brand identity is the collection of visual and verbal elements that shape how your audience perceives you — from color and typography to message tone and brand personality.",
      "When a customer first encounters your business — whether on Instagram, packaging, or your website — brand identity determines whether they trust you or scroll past.",
      "Research shows that brands with consistent identities earn up to 23% more revenue than competitors. For small businesses still building trust, this number is even more significant.",
      "At Mahir, we start the brand identity process from discovering your core values, not choosing colors. Because color should tell the story of your values — not the other way around.",
    ],
    date: "۱۴۰۴/۰۴/۱۰",
    readMin: 4,
  },
  {
    slug: "instagram-growth-strategy",
    emoji: "📱",
    category_fa: "بازاریابی دیجیتال",
    category_en: "Digital Marketing",
    title_fa: "۵ استراتژی که اینستاگرام کسب‌وکارت را در ۹۰ روز متحول می‌کند",
    title_en: "5 Strategies to Transform Your Business Instagram in 90 Days",
    excerpt_fa: "بیشتر کسب‌وکارها اینستاگرام را اشتباه استفاده می‌کنند. این راهکارها عوضش می‌کنند.",
    excerpt_en: "Most businesses use Instagram wrong. These strategies will change that.",
    body_fa: [
      "اینستاگرام برای اکثر کسب‌وکارهای ایرانی قوی‌ترین کانال فروش است — اما تنها ۱۲٪ از صفحات کسب‌وکاری الگوریتم را درست می‌فهمند.",
      "اول: محتوای ارزش‌محور به جای محتوای تبلیغاتی. مخاطب قبل از اینکه بخرد، باید چیزی یاد بگیرد. نسبت ۸۰/۲۰ را رعایت کنید — ۸۰٪ آموزشی، ۲۰٪ فروش.",
      "دوم: زمان‌بندی انتشار. بهترین ساعت برای بازار ایران ۲۰:۰۰ تا ۲۲:۰۰ است. در این بازه الگوریتم پست شما را به بیشترین تعداد فالوور نشان می‌دهد.",
      "سوم: استوری هر روز، پست ۳ بار در هفته. الگوریتم اینستاگرام به فعالیت مستمر بیشتر از کیفیت گاه‌به‌گاه اهمیت می‌دهد.",
      "چهارم: کال‌تو‌اکشن واضح. هر پست باید یک کار مشخص از مخاطب بخواهد: کامنت بذار، ذخیره کن، به دوستت بفرست.",
      "پنجم: تحلیل ماهانه. هر ماه ۳ پست برتر را شناسایی کنید و همان قالب را تکرار کنید.",
    ],
    body_en: [
      "For most Iranian businesses, Instagram is the most powerful sales channel — but only 12% of business accounts truly understand the algorithm.",
      "First: value-driven content over promotional content. Your audience needs to learn something before they buy. Follow the 80/20 rule — 80% educational, 20% sales.",
      "Second: post timing. The best window for the Iranian market is 8–10 PM. The algorithm shows your content to the most followers during this window.",
      "Third: daily Stories, posts 3 times per week. Instagram's algorithm rewards consistent activity over occasional high quality.",
      "Fourth: clear calls to action. Every post should ask for one specific action: comment, save, or share with a friend.",
      "Fifth: monthly analytics review. Identify your top 3 posts each month and replicate their format.",
    ],
    date: "۱۴۰۴/۰۴/۰۵",
    readMin: 5,
  },
  {
    slug: "ai-for-small-business",
    emoji: "🤖",
    category_fa: "هوش مصنوعی",
    category_en: "AI",
    title_fa: "هوش مصنوعی برای کسب‌وکار کوچک: از کجا شروع کنیم؟",
    title_en: "AI for Small Business: Where to Start?",
    excerpt_fa: "هوش مصنوعی دیگر ابزار شرکت‌های بزرگ نیست — هر کسب‌وکاری می‌تواند از آن سود ببرد.",
    excerpt_en: "AI is no longer just for big companies — every business can benefit from it now.",
    body_fa: [
      "در سال ۱۴۰۳، کسب‌وکارهایی که از ابزارهای هوش مصنوعی استفاده کردند به طور میانگین ۳۲٪ در زمان تولید محتوا صرفه‌جویی کردند.",
      "شروع با محتوا: ابزارهایی مثل ChatGPT می‌توانند اولین پیش‌نویس پست‌ها، ایمیل‌ها و توضیحات محصول را بنویسند. شما فقط ویرایش می‌کنید.",
      "چت‌بات پشتیبانی: ۶۰٪ سوال‌های مشتریان تکراری هستند. یک چت‌بات ساده می‌تواند ۲۴/۷ پاسخگو باشد بدون اینکه نیروی انسانی نیاز داشته باشید.",
      "تحلیل داده: ابزارهای هوشمند می‌توانند از داده‌های فروش شما الگوهایی بیابند که با چشم غیرمسلح دیده نمی‌شوند.",
      "در ماهیر، به کسب‌وکارها کمک می‌کنیم ابزارهای هوش مصنوعی را متناسب با بودجه و نیاز خاصشان انتخاب و پیاده‌سازی کنند.",
    ],
    body_en: [
      "In 2024, businesses using AI tools saved an average of 32% of their content creation time.",
      "Start with content: tools like ChatGPT can write first drafts of posts, emails, and product descriptions. You just edit.",
      "Support chatbot: 60% of customer questions are repetitive. A simple chatbot can respond 24/7 without needing human staff.",
      "Data analysis: smart tools can find patterns in your sales data that are invisible to the naked eye.",
      "At Mahir, we help businesses select and implement AI tools tailored to their specific budget and needs.",
    ],
    date: "۱۴۰۴/۰۳/۲۸",
    readMin: 4,
  },
  {
    slug: "growth-strategy-fundamentals",
    emoji: "🎯",
    category_fa: "استراتژی رشد",
    category_en: "Growth Strategy",
    title_fa: "پایه‌های استراتژی رشد: چطور یک نقشه‌راه واقعی بسازیم؟",
    title_en: "Growth Strategy Fundamentals: How to Build a Real Roadmap?",
    excerpt_fa: "بیشتر کسب‌وکارها بدون نقشه‌راه حرکت می‌کنند. این مقاله نشان می‌دهد چطور یکی بسازید.",
    excerpt_en: "Most businesses move without a roadmap. This article shows you how to build one.",
    body_fa: [
      "استراتژی رشد یعنی دانستن اینکه کجا هستید، کجا می‌خواهید بروید، و چه مسیری کمترین منابع و بیشترین نتیجه را دارد.",
      "اول وضعیت فعلی را بسنجید: درآمد ماهانه، تعداد مشتریان فعال، نرخ بازگشت، میانگین ارزش سفارش. این چهار عدد واقعیت کسب‌وکار شما را می‌سازند.",
      "سپس یک هدف ۶ ماهه واقع‌بینانه تعریف کنید. نه رویا، نه آرزو — یک عدد مشخص که با تلاش جدی قابل دستیابی است.",
      "بین وضعیت فعلی و هدف، موانع اصلی را شناسایی کنید. معمولاً ۲-۳ مانع اصلی وجود دارد که رفع آن‌ها ۸۰٪ مسیر را هموار می‌کند.",
      "هر مانع را به اقدام‌های هفتگی کوچک بشکنید. استراتژی بدون اجرای هفتگی فقط یک سند است.",
    ],
    body_en: [
      "Growth strategy means knowing where you are, where you want to go, and which path requires the least resources for the most results.",
      "First, measure your current state: monthly revenue, active customers, return rate, average order value. These four numbers build the reality of your business.",
      "Then define a realistic 6-month goal. Not a dream, not a wish — a specific number achievable with serious effort.",
      "Between your current state and goal, identify the main obstacles. Usually there are 2-3 main blockers whose removal clears 80% of the path.",
      "Break each obstacle into small weekly actions. Strategy without weekly execution is just a document.",
    ],
    date: "۱۴۰۴/۰۳/۲۰",
    readMin: 5,
  },
];
