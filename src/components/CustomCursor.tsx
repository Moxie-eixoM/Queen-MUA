"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const circleCoords = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;

      // Immediate dot placement
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // LERP animation loop for the outer circle
    let animationFrameId: number;
    const lerpCursor = () => {
      const targetX = mouseCoords.current.x;
      const targetY = mouseCoords.current.y;

      // LERP (0.15 interpolation rate for floating spatial feel)
      circleCoords.current.x += (targetX - circleCoords.current.x) * 0.15;
      circleCoords.current.y += (targetY - circleCoords.current.y) * 0.15;

      if (circleRef.current) {
        circleRef.current.style.left = `${circleCoords.current.x}px`;
        circleRef.current.style.top = `${circleCoords.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(lerpCursor);
    };

    animationFrameId = requestAnimationFrame(lerpCursor);

    // Dynamic hover bindings for interactive items
    const bindHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, .service-select-card, .portfolio-item, .timeslot-btn, .faq-trigger, .filter-btn"
      );

      const addHoverClass = () => {
        document.body.classList.add("hovering-interactive");
        isHovering.current = true;
      };

      const removeHoverClass = () => {
        document.body.classList.remove("hovering-interactive");
        isHovering.current = false;
      };

      interactives.forEach((el) => {
        el.addEventListener("mouseenter", addHoverClass);
        el.addEventListener("mouseleave", removeHoverClass);
      });

      return () => {
        interactives.forEach((el) => {
          el.removeEventListener("mouseenter", addHoverClass);
          el.removeEventListener("mouseleave", removeHoverClass);
        });
      };
    };

    // Bind initially and also observe DOM changes to re-bind dynamically loaded cards
    let unbindHovers = bindHoverListeners();

    const observer = new MutationObserver(() => {
      unbindHovers();
      unbindHovers = bindHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      unbindHovers();
      observer.disconnect();
      document.body.classList.remove("hovering-interactive");
    };
  }, []);

  return (
    <>
      <div
        ref={circleRef}
        className="custom-cursor-circle fixed w-10 h-10 border border-accent-copper rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] transition-[width,height,background-color,border-color] duration-smooth mix-blend-difference hidden md:block"
        style={{ left: "-100px", top: "-100px" }}
      />
      <div
        ref={dotRef}
        className="fixed w-1.5 h-1.5 bg-accent-copper rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[10000] hidden md:block"
        style={{ left: "-100px", top: "-100px" }}
      />
    </>
  );
}
