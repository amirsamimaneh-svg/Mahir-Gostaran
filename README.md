# ماهیر — سایت رسمی

وب‌سایت شرکت **ماهیر** ساخته‌شده با Next.js 15، Tailwind CSS و Anthropic API.

---

## پیش‌نیازها

- Node.js 18 یا بالاتر
- npm یا yarn
- کلید API آنتروپیک (رایگان از [console.anthropic.com](https://console.anthropic.com))

---

## نصب و راه‌اندازی

### ۱. کلون پروژه

```bash
git clone https://github.com/amirsamimaneh-svg/Mahir-Gostaran.git
cd Mahir-Gostaran
```

### ۲. نصب وابستگی‌ها

```bash
npm install
```

### ۳. تنظیم کلید API

ابتدا فایل `.env.example` را به `.env.local` کپی کنید:

```bash
cp .env.example .env.local
```

سپس فایل `.env.local` را باز کنید و کلید خود را جایگزین کنید:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxx
```

> کلید API را از [console.anthropic.com](https://console.anthropic.com) → **API Keys** بگیرید.  
> **هرگز** این فایل را به Git push نکنید.

### ۴. اجرای محیط توسعه

```bash
npm run dev
```

سایت روی [http://localhost:3000](http://localhost:3000) در دسترس است.

---

## ساختار پروژه

```
src/
├── app/
│   ├── api/
│   │   └── idea/
│   │       └── route.ts      # API route امن برای تولید ایده با Claude
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # صفحه‌ی اصلی
└── components/
    └── IdeaCard.tsx          # کارت هوش مصنوعی با typewriter effect
```

---

## دیپلوی روی Vercel

### روش سریع

1. به [vercel.com](https://vercel.com) بروید و با GitHub وارد شوید.
2. روی **New Project** کلیک کنید و ریپوزیتوری `Mahir-Gostaran` را انتخاب کنید.
3. در بخش **Environment Variables** متغیر زیر را اضافه کنید:
   - `ANTHROPIC_API_KEY` = کلید API آنتروپیک شما
4. روی **Deploy** کلیک کنید.

### اتصال دامنه‌ی mahir.ir

بعد از دیپلوی موفق:

1. در داشبورد Vercel → **Settings** → **Domains** بروید.
2. دامنه `mahir.ir` و `www.mahir.ir` را اضافه کنید.
3. رکوردهای DNS زیر را در پنل مدیریت دامنه تنظیم کنید:

| نوع | نام | مقدار |
|-----|-----|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## ویژگی‌های امنیتی

- کلید API **فقط** در سمت سرور و در متغیر محیطی نگهداری می‌شود.
- محدودیت نرخ: حداکثر **۱۰ درخواست** per IP در هر دقیقه.
- هیچ داده‌ای از کاربر ذخیره نمی‌شود.

---

## تماس

ایمیل: [hello@mahir.ir](mailto:hello@mahir.ir)
