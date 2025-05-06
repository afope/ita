"use client";

// components/HorizontalPageFlip.tsx
import React, { useState, useEffect, useRef } from "react";
import "./horizontaltransition.css";

interface HorizontalPageFlipProps {
  pages: React.ReactNode[];
}

export default function HorizontalPageFlip({ pages }: HorizontalPageFlipProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  // const [touchStartY, setTouchStartY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const preventDefaultScroll = (e: WheelEvent | TouchEvent) =>
      e.preventDefault();
    document.addEventListener("wheel", preventDefaultScroll, {
      passive: false,
    });
    document.addEventListener("touchmove", preventDefaultScroll, {
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", preventDefaultScroll);
      document.removeEventListener("touchmove", preventDefaultScroll);
    };
  }, []);

  // Handle scroll events
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();

      setIsScrolling(true);

      if (e.deltaY > 0 && currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };

    // const handleTouchStart = (e: TouchEvent) => {
    //   setTouchStartY(e.touches[0].clientY);
    // };

    // const handleTouchMove = (e: TouchEvent) => {
    //   const touchY = e.touches[0].clientY;

    //   setIsScrolling(true);

    //   if (touchY > 0 && currentPage < pages.length - 1) {
    //     setCurrentPage((prevPage) => prevPage + 1);
    //   } else if (touchY < 0 && currentPage > 0) {
    //     setCurrentPage((prevPage) => prevPage - 1);
    //   }

    //   setTouchStartY(touchY);

    //   scrollTimeout = setTimeout(() => {
    //     setIsScrolling(false);
    //   }, 800);
    // };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      // window.addEventListener("touchstart", handleTouchStart, {
      //   passive: true,
      // });
      // window.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        // window.removeEventListener("touchstart", handleTouchStart);
        // window.removeEventListener("touchmove", handleTouchMove);
        clearTimeout(scrollTimeout);
      }
    };
  }, [currentPage, isScrolling, pages.length]);

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
    <div ref={containerRef} className="horizontal-transition-container">
      <div
        className="horizontal-transition-content"
        style={{
          transform: `translate3d(-${currentPage * 100}%, 0, 0)`,
          WebkitTransform: `translate3d(-${currentPage * 100}%, 0, 0)`,
        }}
      >
        {pages.map((page, index) => (
          <div
            key={index}
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            className="page-container"
          >
            <div className="page-content">{page}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
