import { useState, useEffect } from "react";
import "./loadingcounter.css";

const CounterLoadingComponent = () => {
  const [counter, setCounter] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  console.log("counter", counter);

  // Counter animation effect
  useEffect(() => {
    // If we've reached 18, mark as complete
    if (counter >= 18) {
      setIsComplete(true);
      setLoadingText("save the date!");
      return;
    }

    // Set up the interval to increment the counter
    const timeout = setTimeout(
      () => {
        setCounter((prevCount) => {
          console.log("prevCount", prevCount);
          const increment = Math.max(1, Math.floor((18 - prevCount) / 6));
          console.log("increment", increment);
          return Math.min(prevCount + increment, 18);
        });
      },
      counter < 10 ? 200 : 300
    );

    return () => clearTimeout(timeout);
  }, [counter]);

  // Loading text animation
  useEffect(() => {
    console.log("isComplete", isComplete);
    if (isComplete) return;

    const ellipsisInterval = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText.endsWith("...")) return "";
        return prevText + ".";
      });
    }, 500);

    return () => clearInterval(ellipsisInterval);
  }, [isComplete]);

  const progressPercentage = (counter / 18) * 100;

  return (
    <div className="container">
      {/* Decorative books */}
      {/* <div className="book book1"></div>
      <div className="book book2"></div>
      <div className="book book3"></div>
      <div className="book book4"></div> */}

      <div className="content">
        {/* <h1 className="title">ita 2025</h1> */}

        {/* Animated Counter */}
        <div className="counterContainer">
          {/* <div className="counterBgOuter"></div>
          <div className="counterBgInner"></div> */}
          <div className="counter">
            {counter}
            <div className={`pageFlipContainer ${isComplete ? "hidden" : ""}`}>
              <div className="pageBase"></div>
              <div className="page"></div>
            </div>
            <span className="counterText">november</span>
          </div>
        </div>

        {/* Status text */}
        <p className="statusText">{isComplete ? "Save the date!" : ""}</p>

        {/* Progress bar */}
        {/* <div className="progressContainer">
          <div
            className="progressBar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div> */}

        {/* Additional info text */}
        <p className="infoText">
          {counter < 6 && "gathering stories..."}
          {counter >= 6 && counter < 12 && "preparing author details..."}
          {counter >= 12 && counter < 18 && "finalizing festival schedule..."}
          {counter >= 18 && "save the date!"}
        </p>
      </div>

      {/* Footer text */}
      {/* <div className="footer">
        <p className="footerText">ita 2025</p>
      </div> */}
    </div>
  );
};

export default CounterLoadingComponent;
