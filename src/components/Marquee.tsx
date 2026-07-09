"use client";

const words = ["رشد", "برند", "هوش مصنوعی", "استراتژی", "موفقیت", "نوآوری", "دیجیتال", "ماهیر"];

export default function Marquee() {
  const items = [...words, ...words]; // duplicate for seamless loop
  return (
    <div className="w-full overflow-hidden border-y border-[#7C6FFF]/20 py-3 bg-[#7C6FFF]/5 my-0">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className="text-sm font-semibold text-[#7C6FFF]/70 tracking-widest uppercase flex items-center gap-8">
            {w}
            <span className="text-[#7C6FFF]/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
