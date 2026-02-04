"use client";

import { useEffect } from "react";

export default function IndexPage() {
  useEffect(() => {
    document.title = "P4 • Index";
  }, []);

  return (
    <main className="index-page">
      <div className="index-hero">
        <p className="index-eyebrow">P4 • Dev Index</p>
        <h1>Neurasense Pages</h1>
        <p>
          Internal navigation hub for development. Not intended for production.
        </p>
      </div>

      <div className="index-grid">
        <a className="index-tile" href="/p1">
          <h2>Landing • P1</h2>
          <p>Main entry experience.</p>
        </a>
        <a className="index-tile" href="/home">
          <h2>Home • P2</h2>
          <p>Core brand story and sections.</p>
        </a>
        <a className="index-tile" href="/p5">
          <h2>Alt Home • P5</h2>
          <p>Elegant, techy alternate layout.</p>
        </a>
        <a className="index-tile" href="/p6">
          <h2>Connected Pages • P6</h2>
          <p>Development routes hub.</p>
        </a>
        <a className="index-tile" href="/products">
          <h2>Products • P3</h2>
          <p>Product lineup and details.</p>
        </a>
        <a className="index-tile" href="/">
          <h2>Index • P4</h2>
          <p>This navigation hub.</p>
        </a>
      </div>
    </main>
  );
}
