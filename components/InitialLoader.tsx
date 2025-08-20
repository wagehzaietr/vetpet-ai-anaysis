"use client";

import { useEffect, useState } from "react";
import DynamicText from "@/components/ui/dynamic-text";

/**
 * InitialLoader
 * Shows a splash overlay on the first visit, then hides.
 * Uses sessionStorage to avoid re-showing on subsequent navigations.
 */
export default function InitialLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only show on the first visit per tab session
    const seen = sessionStorage.getItem("__petcare_seen_splash__");
    if (seen) {
      // If already seen in this session, don't show the splash
      setShow(false);
      return;
    }
    // Keep showing, then hide after a short delay; adjust as desired
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("__petcare_seen_splash__", "1");
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <DynamicText />
    </div>
  );
}
