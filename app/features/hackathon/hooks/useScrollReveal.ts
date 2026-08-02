/**
 * useScrollReveal - Intersection Observer hook for scroll-triggered animations
 * Returns isInView boolean and a ref to attach to the target element
 */
import { useState, useEffect, useRef } from "react";

export function useScrollReveal(threshold: number = 0.15, rootMargin: string = "0px") {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
