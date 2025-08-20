"use client";

import { useEffect, useState } from "react";
import DynamicText from "@/components/ui/dynamic-text";

/**
 * InitialLoader
 * Shows a splash overlay on the first visit, then hides.
 * Uses sessionStorage to avoid re-showing on subsequent navigations.
 */
export default function InitialLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on the first visit per tab session
    const seen = sessionStorage.getItem("__petcare_seen_splash__");
    if (!seen) {
      setShow(true);
      // Hide after a short delay; adjust as desired
      const t = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("__petcare_seen_splash__", "1");
      }, 4500);
      return () => clearTimeout(t);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <DynamicText />
    </div>
  );
}
