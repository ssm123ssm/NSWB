"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const enteredRef = useRef(false);

  useEffect(() => {
    document.title = "P1 • Landing";
  }, []);

  const handleEnter = () => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    router.push("/home");
  };

  useEffect(() => {
    const onWheel = () => handleEnter();
    const onTouch = () => handleEnter();
    const onTouchStart = () => handleEnter();
    const onKey = (event) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === "PageUp" ||
        event.key === " "
      ) {
        handleEnter();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <main className="landing-page" onClick={handleEnter}>
      <div className="landing-bg" />
      <Image
        className="landing-logo"
        src="/logo.svg"
        alt="Neurasense"
        width={520}
        height={520}
        priority
      />
      <div className="landing-content">
        <p className="landing-label">P1</p>
        <p className="landing-title">TECH REVOLUTIONIZED</p>
      </div>
      <button className="landing-subtle" onClick={handleEnter} type="button">
        scroll to discover
      </button>
    </main>
  );
}
