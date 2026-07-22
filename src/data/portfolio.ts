export type CaseStat = {
  /** برجسته‌ترین عدد نتیجه */
  big: string;
  /** توضیح عدد */
  label: string;
  /** مقدار مبنا/قبل (اختیاری) */
  note?: string;
};

export type CaseImage = {
  /** عنوان کوتاه تصویر */
  title: string;
  /** توضیح دقیق اینکه تصویر باید چه چیزی را نشان دهد */
  description: string;
  /** پرامپت آماده برای تولید عکس با هوش مصنوعی (انگلیسی، برای بهترین نتیجه) */
  prompt: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  emoji: string;
  /** نسبت طلایی برند حفظ شده؛ فقط یک ته‌رنگ ملایم برای تمایز */
  tint: string;
  tagline: string;
  shortDesc: string;
  duration: string;
  stats: CaseStat[];
  challenge: string;
  approach: string[];
  outcome: string;
  images: CaseImage[];
};

export const CASES: CaseStudy[] = [
  {
    slug: "nila-womens-fashion",
    name: "فروشگاه لباس زنانه نیلا",
    category: "پوشاک · اینستاگرام",
    emoji: "🛍️",
    tint: "#D6B25E",
    tagline: "از یک پیج کم‌رمق تا فروشگاهی پرفروش",
    shortDesc:
      "پیج اینستاگرامی نیلا محصولات باکیفیتی داشت اما بدون هویت بصری منسجم و استراتژی محتوا، فروش ثابت و پایینی را تجربه می‌کرد. ماهیر برند را از نو ساخت و مسیر فروش را فعال کرد.",
    duration: "۸ هفته",
    stats: [
      { big: "۱۹,۴۰۰", label: "فالوور اینستاگرام", note: "از ۲,۸۰۰" },
      { big: "۱۱ میلیون", label: "فروش روزانه (تومان)", note: "از ۴۰۰ هزار" },
      { big: "۳.۸ برابر", label: "رشد نرخ تبدیل" },
    ],
    challenge:
      "پیج نیلا با وجود محصولات باکیفیت، هویت بصری ضعیف و پراکنده‌ای داشت. محتوای بدون برنامه، نبود لحن برند و مسیر خرید نامشخص باعث شده بود بازدیدکننده‌ها به مشتری تبدیل نشوند و فروش وابسته به شانس باقی بماند.",
    approach: [
      "بازطراحی کامل هویت بصری پیج شامل پالت رنگ، قالب پست‌ها و استوری هایلایت‌ها",
      "تدوین استراتژی محتوای دو ماهه با تقویم انتشار منظم و لحن برند مشخص",
      "تولید عکاسی محصول حرفه‌ای و ویدیوهای کوتاه معرفی محصول",
      "راه‌اندازی کمپین تبلیغاتی هدفمند برای بانوان علاقه‌مند به مد و پوشاک",
      "طراحی مسیر خرید ساده و پاسخ‌گویی سریع برای افزایش نرخ تبدیل",
    ],
    outcome:
      "در کمتر از دو ماه، پیج نیلا به یک برند قابل‌اعتماد و پرمخاطب تبدیل شد. فروش روزانه بیش از ۲۷ برابر رشد کرد و جریان پایدار سفارش جایگزین فروش اتفاقی شد.",
    images: [
      {
        title: "قبل و بعد پیج اینستاگرام",
        description:
          "نمای گرید اینستاگرام قبل (نامنظم و کم‌کیفیت) در کنار بعد (منسجم، لوکس، با پالت هماهنگ) به‌صورت مقایسه‌ای کنار هم.",
        prompt:
          "Split before-and-after comparison of an Instagram feed grid for a women's fashion boutique. Left side: messy, inconsistent, amateur phone photos. Right side: elegant, cohesive, minimal luxury grid with warm gold and cream tones, professional product photography. Clean UI mockup, dark premium background, high detail.",
      },
      {
        title: "پست‌های طراحی‌شده",
        description:
          "چند نمونه پست و استوری با هویت بصری جدید نیلا؛ عکاسی محصول لباس زنانه با نورپردازی نرم و لوگوی ظریف.",
        prompt:
          "A set of three elegant Instagram post templates for a women's clothing brand named 'Nila'. Soft studio lighting, model wearing modern feminine outfits, warm neutral palette with subtle gold accents, minimal typography in Persian style, premium fashion editorial look.",
      },
      {
        title: "نمودار رشد فروش",
        description:
          "نمودار خطی صعودی رشد فروش روزانه از ۴۰۰ هزار تومان تا ۱۱ میلیون تومان طی ۸ هفته، در تم مشکی/طلایی.",
        prompt:
          "A sleek upward line chart showing daily sales growth over 8 weeks, dark background, glowing gold line, minimal premium dashboard UI, subtle grid, elegant data visualization.",
      },
    ],
  },
  {
    slug: "atousa-beauty-clinic",
    name: "کلینیک زیبایی آتوسا",
    category: "زیبایی و سلامت · برندینگ",
    emoji: "💎",
    tint: "#E4C27A",
    tagline: "برندی که اعتماد می‌سازد و ظرفیت را پر می‌کند",
    shortDesc:
      "کلینیک آتوسا خدمات تخصصی داشت اما حضور آنلاین ضعیف و برندینگ نامشخص، نرخ نوبت‌دهی را پایین نگه داشته بود. ماهیر با بازسازی برند و محتوای تخصصی، اعتماد مخاطب را جلب کرد.",
    duration: "۶ هفته",
    stats: [
      { big: "۶۲٪", label: "رشد درخواست نوبت", note: "در ماه اول" },
      { big: "۲ هفته", label: "پرشدن ظرفیت جلوتر" },
      { big: "۱۳,۷۰۰", label: "فالوور اینستاگرام", note: "از ۴,۱۰۰" },
    ],
    challenge:
      "کلینیک آتوسا در فضای رقابتی زیبایی، برند متمایزی نداشت. نبود محتوای تخصصی و اعتمادساز باعث می‌شد مخاطب مردد بماند و نرخ تبدیل بازدید به نوبت پایین باشد.",
    approach: [
      "طراحی هویت بصری آرام، لوکس و حرفه‌ای متناسب با حس اعتماد در حوزه زیبایی",
      "تولید محتوای آموزشی و تخصصی توسط تیم محتوا با تأیید کادر درمان",
      "تهیه ویدیوهای معرفی خدمات و رضایت مراجعان برای اثبات اجتماعی",
      "راه‌اندازی سیستم نوبت‌دهی آنلاین ساده و کمپین جذب مخاطب محلی",
      "بهینه‌سازی پاسخ‌گویی دایرکت و تبدیل پیام به نوبت قطعی",
    ],
    outcome:
      "کلینیک آتوسا به یک برند مرجع و قابل‌اعتماد در منطقه تبدیل شد. تنها در ماه اول، درخواست نوبت ۶۲٪ رشد کرد و ظرفیت کلینیک تا دو هفته جلوتر تکمیل شد.",
    images: [
      {
        title: "هویت بصری کلینیک",
        description:
          "مجموعه‌ای از لوگو، کارت ویزیت و قالب استوری کلینیک زیبایی با حس آرام، لوکس و طلایی/کرم.",
        prompt:
          "A luxury brand identity kit for a beauty clinic named 'Atousa'. Elegant minimal logo, business card, and Instagram story templates. Soft cream and gold palette, calming premium aesthetic, professional cosmetic branding mockup on dark background.",
      },
      {
        title: "پست‌های تخصصی و اعتمادساز",
        description:
          "نمونه پست‌های آموزشی درباره خدمات زیبایی با طراحی تمیز، آیکون‌های ظریف و متن فارسی خوانا.",
        prompt:
          "Three clean educational Instagram posts for a beauty clinic explaining skincare and cosmetic services. Soft pastel and gold tones, delicate line icons, elegant Persian typography, trustworthy medical-aesthetic look, premium minimal design.",
      },
      {
        title: "داشبورد نوبت‌دهی",
        description:
          "رابط سیستم نوبت‌دهی آنلاین که ظرفیت تکمیل‌شده تا دو هفته آینده را نشان می‌دهد، در تم مشکی/طلایی.",
        prompt:
          "A modern online appointment booking dashboard UI for a beauty clinic, showing a calendar fully booked two weeks ahead, dark theme with gold accents, clean minimal interface, elegant data visualization.",
      },
    ],
  },
  {
    slug: "avaye-novin-language-school",
    name: "آموزشگاه زبان آوای نوین",
    category: "آموزشی · جذب دانشجو",
    emoji: "🎓",
    tint: "#CBAE72",
    tagline: "ظرفیت کلاس‌ها، پر شده در کمتر از سه هفته",
    shortDesc:
      "آموزشگاه آوای نوین کیفیت آموزشی بالایی داشت اما در جذب آنلاین دانشجو ضعیف عمل می‌کرد. ماهیر با استراتژی محتوا و کمپین ثبت‌نام، ظرفیت کلاس‌ها را کامل پر کرد.",
    duration: "۳ هفته",
    stats: [
      { big: "۱۰۰٪", label: "تکمیل ظرفیت کلاس‌ها", note: "در ۱۸ روز" },
      { big: "۴.۲ برابر", label: "رشد ثبت‌نام آنلاین" },
      { big: "۱۱,۲۰۰", label: "فالوور اینستاگرام", note: "از ۳,۶۰۰" },
    ],
    challenge:
      "آموزشگاه آوای نوین با وجود کیفیت آموزشی بالا، در فضای آنلاین دیده نمی‌شد. فرآیند ثبت‌نام پیچیده و نبود محتوای جذاب، جذب دانشجوی جدید را کند کرده بود.",
    approach: [
      "تدوین استراتژی محتوای انگیزشی و آموزشی برای مخاطب علاقه‌مند به یادگیری زبان",
      "تولید ویدیوهای کوتاه از کلاس‌ها، اساتید و داستان موفقیت زبان‌آموزان",
      "طراحی صفحه ثبت‌نام آنلاین ساده و سریع با فراخوان واضح",
      "اجرای کمپین ثبت‌نام فصلی با پیشنهاد ویژه و شمارش معکوس ظرفیت",
      "بهینه‌سازی مسیر تبدیل از مشاهده تا ثبت‌نام قطعی",
    ],
    outcome:
      "کمپین ثبت‌نام آوای نوین چنان موفق بود که ظرفیت تمام کلاس‌ها تنها در ۱۸ روز تکمیل شد و ثبت‌نام آنلاین بیش از چهار برابر رشد کرد.",
    images: [
      {
        title: "کاور و پست‌های کمپین",
        description:
          "طرح کاور کمپین ثبت‌نام و چند پست با شمارش معکوس ظرفیت، در تم انرژتیک آموزشی با رنگ طلایی.",
        prompt:
          "A vibrant enrollment campaign design for a language school named 'Avaye Novin'. Cover banner and Instagram posts with a capacity countdown, energetic educational vibe, gold and dark palette, modern Persian typography, motivational learning theme, premium marketing design.",
      },
      {
        title: "صفحه ثبت‌نام آنلاین",
        description:
          "رابط صفحه ثبت‌نام آنلاین ساده و تمیز آموزشگاه با فرم کوتاه و دکمه فراخوان طلایی.",
        prompt:
          "A clean, simple online course registration landing page UI for a language school, short form, prominent gold call-to-action button, dark premium theme, minimal modern web design, Persian RTL layout.",
      },
      {
        title: "نمودار رشد ثبت‌نام",
        description:
          "نمودار میله‌ای رشد ۴.۲ برابری ثبت‌نام آنلاین طی دوره کمپین، در تم مشکی/طلایی.",
        prompt:
          "A sleek bar chart showing 4.2x growth in online course registrations during a campaign period, dark background, glowing gold bars, minimal premium analytics dashboard, elegant data visualization.",
      },
    ],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
