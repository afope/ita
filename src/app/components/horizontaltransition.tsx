"use client";

// components/HorizontalPageFlip.tsx
import React, { useState, useEffect, useRef } from "react";

interface HorizontalPageFlipProps {
  pages: React.ReactNode[];
}

export default function HorizontalPageFlip({ pages }: HorizontalPageFlipProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Minimum swipe distance required to trigger page change
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
    } else if (isRightSwipe) {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

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

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
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
      if (e.key === "ArrowRight" && currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.key === "ArrowLeft" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, pages.length]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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

      {/* Optional navigation indicators */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-2">
        {pages.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentPage ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentPage(index)}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
