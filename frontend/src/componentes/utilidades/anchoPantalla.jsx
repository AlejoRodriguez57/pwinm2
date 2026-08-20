import { useState, useEffect } from "react";

export default function useAnchoPantalla() {
  const [screenType, setScreenType] = useState("desktop");

  useEffect(() => {
    const updateScreenType = () => {
        if (window.innerWidth < 360) setScreenType("mobile-small");
        else if (window.innerWidth < 768) setScreenType("mobile");
        else if (window.innerWidth < 1024) setScreenType("tablet-portrait");
        else if (window.innerWidth < 1280) setScreenType("tablet-landscape");
        else if (window.innerWidth < 1336) setScreenType("laptop");
        else if (window.innerWidth < 1920) setScreenType("desktop");
        else if (window.innerWidth < 2560) setScreenType("desktop-large");
        else setScreenType("4k");
    };

    updateScreenType();
    window.addEventListener("resize", updateScreenType);

    return () =>
      window.removeEventListener("resize", updateScreenType);
  }, []);

  return screenType;
}