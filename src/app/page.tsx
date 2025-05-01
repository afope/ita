"use client";

import EnhancedLoadingCounter from "./components/loadingcounter";
import { useEffect, useState } from "react";
import HomePage from "./components/homepage";
import SignUp from "./components/signup";
import HorizontalPageFlip from "./components/horizontaltransition";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Define the components you want to transition between
  const pages = [
    <HomePage key="home" />,
    <SignUp key="signup" />,
    // Add other components as needed
  ];

  useEffect(() => {
    // Simulate loading process or perform initialization tasks
    const timer = setTimeout(() => {
      setIsLoading(false); // Switch to homepage when loading is complete
    }, 3000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  // Conditionally render loader or homepage based on loading state
  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <EnhancedLoadingCounter />
    </div>
  ) : (
    <div>
      <HorizontalPageFlip pages={pages} />
    </div>
  );
}
