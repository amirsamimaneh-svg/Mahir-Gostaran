"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

    function tick() {
      rx = lerp(rx, x, 0.12);
      ry = lerp(ry, y, 0.12);
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    }

    const onEnter = () => ring.current?.classList.add("scale-150");
    const onLeave = () => ring.current?.classList.remove("scale-150");

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* dot */}
      <div ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2
          rounded-full bg-amber-400"
        style={{ willChange: "transform" }}
      />
      {/* ring */}
      <div ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8
          rounded-full border border-amber-400/60 transition-transform duration-200"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
