"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** delay in ms before the element animates in */
  delay?: number;
  /** direction the element travels from */
  dir?: "up" | "left" | "right" | "scale";
  className?: string;
  as?: ElementType;
  /** intersection threshold */
  threshold?: number;
};

/**
 * Lightweight scroll-reveal wrapper built on IntersectionObserver.
 * Adds the `is-visible` class (see globals.css) once the element scrolls
 * into view — no animation library required.
 */
export default function Reveal({
  children,
  delay = 0,
  dir = "up",
  className = "",
  as,
  threshold = 0.15,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-dir={dir === "up" ? undefined : dir}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
