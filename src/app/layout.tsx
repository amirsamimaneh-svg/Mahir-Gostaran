import type { Metadata } from "next";
import "@fontsource/vazirmatn/300.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ماهیر | مشاور رشد کسب‌وکار",
  description:
    "ماهیر — شریک هوشمند رشد کسب‌وکار شما. استراتژی، هویت برند و بازاریابی دیجیتال.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased min-h-full">{children}</body>
    </html>
  );
}
