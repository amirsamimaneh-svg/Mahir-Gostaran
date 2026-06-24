"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const step = 16;
        const steps = duration / step;
        let current = 0;
        const inc = target / steps;
        const timer = setInterval(() => {
          current = Math.min(current + inc, target);
          setCount(Math.floor(current));
          if (current >= target) clearInterval(timer);
        }, step);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-2xl md:text-3xl font-extrabold text-amber-400">
      {count}{suffix}
    </div>
  );
}
