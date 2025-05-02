import { useState, useEffect } from "react";
import "./loadingcounter.css";

const CounterLoadingComponent = () => {
  const [counter, setCounter] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Counter animation effect with different approach
  useEffect(() => {
    // Don't set up any more timeouts if we're already complete
    if (isComplete) {
      return;
    }

    // If counter reaches or exceeds 18, mark as complete
    if (counter > 7) {
      setIsComplete(true);
      return;
    }

    // More controlled incrementation to ensure we reach 18
    const timeout = setTimeout(
      () => {
        // Calculate remaining distance to 18
        const remaining = 7 - counter;

        // Different increment strategy:
        // - For early stages (0-6): increment by 2
        // - For middle stages (6-12): increment by 1 or 2
        // - For final stages (12-17): increment by 1
        let increment;
        if (counter < 7) {
          increment = Math.min(1, remaining);
        } else {
          increment = 1;
        }

        // Ensure we don't exceed 18
        const newCounter = Math.min(counter + increment, 7);

        console.log(
          `Incrementing counter from ${counter} by ${increment} to ${newCounter}`
        );
        setCounter(newCounter);
      },
      counter < 2 ? 100 : 200
    );

    // Clean up
    return () => clearTimeout(timeout);
  }, [counter, isComplete]);

  // Loading text animation

  return (
    <div className="container">
      <div className="content">
        {/* Animated Counter */}
        <div className="counterContainer">
          <div className="counter">
            {counter}
            <div className={`pageFlipContainer ${isComplete ? "hidden" : ""}`}>
              <div className="pageBase"></div>
              <div className="page"></div>
            </div>
            <span className="counterText">december</span>
          </div>
        </div>

        {/* Status text */}
        <p className="statusText">{isComplete ? "Save the date!" : ""}</p>

        {/* Additional info text */}
        <p className="infoText">
          {counter < 1 && "gathering stories..."}
          {counter >= 1 && counter < 4 && "preparing author details..."}
          {/* {counter >= 12 && counter < 18 && "finalizing festival schedule..."} */}
          {counter >= 7 && "save the date!"}
        </p>
      </div>
    </div>
  );
};

export default CounterLoadingComponent;
