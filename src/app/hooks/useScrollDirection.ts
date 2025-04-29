import { useEffect, useRef, useState } from "react";

export const useScrollDirection = () => {
  const [slideClass, setSlideClass] = useState("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setSlideClass("slide-right");
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setSlideClass("slide-left");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return slideClass;
};
