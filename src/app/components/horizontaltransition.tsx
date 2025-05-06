"use client";

// components/HorizontalPageFlip.tsx
import React, { useState, useEffect, useRef } from "react";

interface HorizontalPageFlipProps {
  pages: React.ReactNode[];
}

export default function HorizontalPageFlip({ pages }: HorizontalPageFlipProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  // const [touchStartY, setTouchStartY] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();

      if (e.deltaY > 0 && currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleTouch = (e: TouchEvent): void => {
      e.preventDefault();

      if (e.touches[0].clientY > 0 && currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.touches[0].clientY < 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouch, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentPage, pages.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "ArrowDown" && currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.key === "ArrowUp" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, pages.length]);

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {pages.map((page, index) => (
          <div
            key={index}
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            className="page-container"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="h-full w-full bg-white shadow-lg">{page}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
