import { useEffect, useState } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBreakpoint("mobile");
      } else if (width < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { breakpoint };
};
