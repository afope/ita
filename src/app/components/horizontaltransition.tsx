// components/HorizontalPageFlip.tsx
import React, { useState, useEffect, useRef, ReactNode, JSX } from "react";

interface HorizontalPageFlipProps {
  pages: ReactNode[];
}

export default function HorizontalPageFlip({
  pages,
}: HorizontalPageFlipProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Touch event handling
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const minSwipeDistance = 30; // Minimum distance required for a swipe (in pixels)

  // To prevent rapid multiple scrolls
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef<boolean>(false);

  // Set up the page refs array
  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, pages.length);
  }, [pages.length]);

  // Handle scroll events
  useEffect(() => {
    const handleWheel = (e: WheelEvent): void => {
      // Prevent default scroll behavior
      e.preventDefault();

      if (e.deltaY > 0 && currentPage < pages.length - 1) {
        // Scroll down/right - next page
        setCurrentPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        // Scroll up/left - previous page
        setCurrentPage(currentPage - 1);
      }
    };

    // Add event listener to the container
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Clean up event listener
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
  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    touchStartY.current = e.touches[0].clientY;
  };
  // Handle touch move event - prevent default to avoid scrolling the page
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  // Handle touch end event
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
    // Don't process touch events while we're already scrolling
    if (isScrollingRef.current) return;

    touchEndY.current = e.changedTouches[0].clientY;

    // Calculate distance (vertical scrolling)
    const distance = touchStartY.current - touchEndY.current;

    // Check if swipe distance exceeds minimum
    if (Math.abs(distance) > minSwipeDistance) {
      isScrollingRef.current = true;

      if (distance > 0 && currentPage < pages.length - 1) {
        // Swipe up - next page
        setCurrentPage(currentPage + 1);
      } else if (distance < 0 && currentPage > 0) {
        // Swipe down - previous page
        setCurrentPage(currentPage - 1);
      }

      // Reset scrolling flag after animation is complete
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 700); // Match this to your animation duration
    }
  };

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
            ref={(el: HTMLDivElement | null) => {
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
