/**
 * تنظیمات فرم «ثبت پروژه».
 *
 * برای دریافت لیدها در ایمیل/داشبورد:
 *   1) در https://formspree.io یک حساب رایگان بسازید.
 *   2) یک فرم جدید (New form) بسازید.
 *   3) شناسه‌ی endpoint را کپی و جایگزین مقدار زیر کنید،
 *      مثل: "https://formspree.io/f/xdorwabc"
 *
 * تا وقتی این مقدار روی حالت پیش‌فرض بماند، فرم به‌صورت خودکار از طریق
 * «واتساپ» کار می‌کند (بدون هیچ سرویس ثالثی) تا سایت از همان ابتدا عملیاتی باشد.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/your_form_id";

export const isFormspreeConfigured = (): boolean =>
  /^https:\/\/formspree\.io\/f\/\w+$/.test(FORMSPREE_ENDPOINT) &&
  !FORMSPREE_ENDPOINT.includes("your_form_id");
