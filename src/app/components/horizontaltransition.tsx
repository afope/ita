// components/ComponentTransition.tsx
import React, { useState, useEffect, useRef, ReactNode } from "react";

interface TransitionComponentProps {
  component: React.ComponentType;
  id: string;
}

interface HorizontalTransitionProps {
  components: TransitionComponentProps[];
  initialComponent?: number;
}

const HorizontalTransition: React.FC<HorizontalTransitionProps> = ({
  components,
  initialComponent = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialComponent);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [transitionPercentage, setTransitionPercentage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration
  const scrollSensitivity = 0.25; // Lower = slower transitions

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    // Determine scroll direction
    const direction = e.deltaY > 0 ? "down" : "up";
    setScrollDirection(direction);

    // Calculate how much to move based on scroll intensity
    const scrollAmount = Math.abs(e.deltaY) * scrollSensitivity;

    // Update transition percentage based on direction
    let newPercentage = transitionPercentage;

    if (direction === "down") {
      // Can only go forward if not at last component
      if (currentIndex < components.length - 1) {
        newPercentage += scrollAmount;
        console.log("newPercentage down", newPercentage);

        // Complete transition if we reach 100%
        if (newPercentage >= 100) {
          setCurrentIndex(currentIndex + 1);
          setTransitionPercentage(0);
        } else {
          setTransitionPercentage(newPercentage);
        }
      }
    } else {
      // direction === 'up'
      // Can only go backward if not at first component
      if (currentIndex > 0) {
        console.log("currentindex", currentIndex);
        newPercentage += scrollAmount;
        console.log("newPercentage up", newPercentage);

        // Complete transition if we go below 0%
        if (newPercentage < 0) {
          setCurrentIndex(currentIndex - 1);
          setTransitionPercentage(100 + newPercentage); // Remaining percentage
        } else {
          setTransitionPercentage(newPercentage);
        }
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel as EventListener, {
        passive: false,
      });
      return () =>
        container.removeEventListener("wheel", handleWheel as EventListener);
    }
  }, [currentIndex, transitionPercentage]);

  // Calculate styles for current and next/prev components
  const getComponentStyle = (index: number) => {
    if (index === currentIndex) {
      // Current component sliding out
      if (scrollDirection === "down") {
        return {
          transform: `translateX(-${transitionPercentage}%)`,
          zIndex: 10,
        };
      } else {
        return {
          transform: `translateX(${transitionPercentage}%)`,
          zIndex: 10,
        };
      }
    } else if (index === currentIndex + 1 && scrollDirection === "down") {
      // Next component sliding in
      return {
        transform: `translateX(${100 - transitionPercentage}%)`,
        zIndex: 5,
      };
    } else if (index === currentIndex - 1 && scrollDirection === "up") {
      // Previous component sliding in
      return {
        transform: `translateX(-${100 - transitionPercentage}%)`,
        zIndex: 5,
      };
    } else {
      // Hidden components
      return {
        transform:
          index < currentIndex ? "translateX(-100%)" : "translateX(100%)",
        zIndex: 1,
      };
    }
  };

  return (
    <div ref={containerRef} className="home-container">
      {components.map((comp, index) => {
        const Component = comp.component;

        return (
          <div
            key={comp.id}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              ...getComponentStyle(index),
              transition: "none", // Remove automatic transitions for direct control
            }}
          >
            <Component />
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalTransition;
