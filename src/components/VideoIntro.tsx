import { INTRO_VIDEO } from "@/data/media";
import { IconPlay, IconVideo } from "./icons";

/**
 * باکس ویدیوی معرفی ماهیر.
 * - اگر در `src/data/media.ts` مقدار `INTRO_VIDEO` تنظیم شده باشد، ویدیو پخش می‌شود.
 * - در غیر این صورت، یک باکس حرفه‌ای «به‌زودی» نمایش داده می‌شود.
 * برای افزودن ویدیو کافی است فقط فایل media.ts را ویرایش کنید.
 */
export default function VideoIntro({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-3xl ${className}`}>
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          aspectRatio: "16 / 9",
          background:
            "radial-gradient(120% 120% at 50% 0%, rgba(212, 175, 55,0.16), transparent 55%), linear-gradient(160deg, var(--surface-2), var(--bg))",
          border: "1px solid var(--border-strong)",
          boxShadow: "0 30px 70px -40px var(--gold-glow)",
        }}
      >
        {INTRO_VIDEO ? (
          INTRO_VIDEO.type === "iframe" ? (
            <iframe
              src={INTRO_VIDEO.url}
              title="ویدیو معرفی ماهیر"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={INTRO_VIDEO.url}
              poster={INTRO_VIDEO.poster}
              controls
              playsInline
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "cover" }}
            />
          )
        ) : (
          <Placeholder />
        )}
      </div>

      {/* caption زیر باکس */}
      <p className="mt-4 text-center text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
        در این ویدیو کوتاه، با ماهیر و مسیری که کسب‌وکار شما را رشد می‌دهد آشنا می‌شوید.
      </p>
    </div>
  );
}

function Placeholder() {
  return (
    <button
      type="button"
      className="group absolute inset-0 w-full h-full cursor-pointer text-center"
      aria-label="ویدیو معرفی ماهیر — به‌زودی"
    >
      <span className="absolute inset-0 grid-lines opacity-40" aria-hidden />

      {/* لوگوی کم‌رنگ به‌عنوان واترمارک تصویر شاخص */}
      <span
        className="absolute -bottom-6 -start-4 text-[9rem] leading-none font-extrabold select-none opacity-[0.06]"
        style={{ color: "var(--gold-bright)" }}
        aria-hidden
      >
        م
      </span>

      {/* برچسب بالا */}
      <span
        className="absolute top-4 end-4 inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(15,23,42,0.6)",
          border: "1px solid var(--border-strong)",
          color: "var(--gold-bright)",
        }}
      >
        <IconVideo width={14} height={14} />
        ویدیو معرفی
      </span>

      {/* برچسب مدت‌زمان — حس تصویر شاخص ویدیو */}
      <span
        className="absolute bottom-4 start-4 text-[11px] font-bold px-2 py-1 rounded-md"
        style={{ background: "rgba(15,23,42,0.7)", color: "var(--fg-muted)" }}
        dir="ltr"
      >
        ● HD
      </span>

      {/* مرکز */}
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
        <span className="relative flex items-center justify-center">
          {/* حلقه‌ی نبض */}
          <span
            className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full anim-pulse"
            style={{ boxShadow: "0 0 0 2px var(--gold-soft)" }}
            aria-hidden
          />
          <span
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(140deg, var(--gold-deep), var(--gold-bright))",
              color: "#14100A",
              boxShadow: "0 12px 40px -8px var(--gold-glow)",
            }}
          >
            <IconPlay width={34} height={34} />
          </span>
        </span>

        <span className="block">
          <span className="block text-base md:text-lg font-extrabold" style={{ color: "var(--fg)" }}>
            ویدیو معرفی ماهیر به‌زودی
          </span>
          <span
            className="mt-2 inline-block text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: "var(--gold-soft)",
              border: "1px solid var(--border-strong)",
              color: "var(--gold-bright)",
            }}
          >
            منتشر می‌شود
          </span>
        </span>
      </span>
    </button>
  );
}
