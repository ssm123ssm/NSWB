"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const solutionTiles = [
  {
    title: "Encrypted File Sharing",
    description:
      "Share files with end-to-end encryption so only authorized recipients can read the content.",
    whoFor: "Teams handling confidential files across legal, finance, operations, and client delivery.",
  },
  {
    title: "Private Data Snapshots",
    description:
      "Protect sensitive snapshots and collaborate on intermediate research outputs with controlled visibility.",
    whoFor: "Research labs, principal investigators, and collaborators sharing intermediate experiment results.",
  },
  {
    title: "Encrypted Remote Repositories",
    description:
      "Encrypt and share remote repositories while preserving traceability and confidentiality across teams.",
    whoFor: "Distributed engineering teams building sensitive codebases and internal security tooling.",
  },
  {
    title: "Synced Local Encrypted Directories",
    description:
      "Sync local encrypted directories across devices without exposing plaintext in transit or at rest.",
    whoFor: "Researchers and hybrid teams who work locally first and need secure multi-device continuity.",
  },
  {
    title: "Hosted App Access Control",
    description:
      "Apply fine-grained access control for hosted web applications with policy-based permissions.",
    whoFor: "Platform admins and product owners managing role-based access for internal or external users.",
  },
];

const audienceProfiles = [
  {
    audience: "Research Labs & Investigators",
    productCount: 3,
    products:
      "Private Data Snapshots, Synced Local Encrypted Directories, Encrypted File Sharing",
  },
  {
    audience: "Engineering & Development Teams",
    productCount: 3,
    products:
      "Encrypted Remote Repositories, Hosted App Access Control, Synced Local Encrypted Directories",
  },
  {
    audience: "Operations & Governance Teams",
    productCount: 2,
    products: "Encrypted File Sharing, Hosted App Access Control",
  },
];

export default function VaultPage() {
  const [activeTileIndex, setActiveTileIndex] = useState(null);
  const [bottomRowShiftPx, setBottomRowShiftPx] = useState(0);
  const [bottomRowLiftPx, setBottomRowLiftPx] = useState(0);
  const tilesGridRef = useRef(null);
  const tileRefs = useRef([]);

  const updateBottomRowAlignment = useCallback(() => {
    const tilesGrid = tilesGridRef.current;
    const tileOne = tileRefs.current[0];
    const tileTwo = tileRefs.current[1];
    const tileThree = tileRefs.current[2];
    const tileFour = tileRefs.current[3];

    if (!tilesGrid || !tileOne || !tileTwo || !tileFour) {
      return;
    }

    const rowGap = Number.parseFloat(getComputedStyle(tilesGrid).rowGap || "0") || 0;
    const shiftRightPx = tileTwo.offsetLeft - tileFour.offsetLeft;
    const shiftLeftPx = tileOne.offsetLeft - tileFour.offsetLeft;
    const tileOneBottom = tileOne.offsetTop + tileOne.offsetHeight;
    const tileTwoBottom = tileTwo.offsetTop + tileTwo.offsetHeight;
    const tileThreeBottom = tileThree ? tileThree.offsetTop + tileThree.offsetHeight : tileTwoBottom;
    const rowOneBottom = Math.max(tileOneBottom, tileTwoBottom, tileThreeBottom);
    const naturalRowTwoTop = rowOneBottom + rowGap;
    const shouldShiftBottomRow = activeTileIndex === 0 || activeTileIndex === 2;
    const horizontalShift =
      activeTileIndex === 0 ? shiftRightPx : activeTileIndex === 2 ? shiftLeftPx : 0;
    const targetTop =
      activeTileIndex === 0
        ? Math.max(tileTwoBottom, tileThreeBottom) + rowGap
        : activeTileIndex === 2
          ? Math.max(tileOneBottom, tileTwoBottom) + rowGap
          : naturalRowTwoTop;
    const verticalLift = shouldShiftBottomRow ? Math.max(0, naturalRowTwoTop - targetTop) : 0;

    setBottomRowShiftPx(horizontalShift);
    setBottomRowLiftPx(verticalLift);
  }, [activeTileIndex]);

  useLayoutEffect(() => {
    updateBottomRowAlignment();
  }, [updateBottomRowAlignment]);

  useEffect(() => {
    const tilesGrid = tilesGridRef.current;

    if (!tilesGrid) {
      return;
    }

    updateBottomRowAlignment();

    const resizeObserver = new ResizeObserver(updateBottomRowAlignment);
    resizeObserver.observe(tilesGrid);
    tileRefs.current.forEach((tile) => {
      if (tile) {
        resizeObserver.observe(tile);
      }
    });

    return () => resizeObserver.disconnect();
  }, [updateBottomRowAlignment]);

  const getTilePlacement = (index) => {
    const placements = [
      "lg:col-span-2 lg:col-start-1 lg:row-start-1",
      "lg:col-span-2 lg:col-start-3 lg:row-start-1",
      "lg:col-span-2 lg:col-start-5 lg:row-start-1",
      "lg:col-span-2 lg:col-start-2 lg:row-start-2",
      "lg:col-span-2 lg:col-start-4 lg:row-start-2",
    ];
    return placements[index] ?? "";
  };

  const shouldRepositionBottomRow = activeTileIndex === 0 || activeTileIndex === 2;

  const renderTile = (tile, index, layoutClass = "") => {
    const shouldShiftBottomTiles = shouldRepositionBottomRow && index >= 3;
    const detailsClassName =
      "mt-5 md:max-h-[5.5rem] md:translate-y-1 md:overflow-hidden md:opacity-55 md:[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_36%,rgba(0,0,0,0.5)_70%,transparent_100%)] md:[mask-image:linear-gradient(to_bottom,black_0%,black_36%,rgba(0,0,0,0.5)_70%,transparent_100%)] md:transition-all md:duration-300 md:ease-out md:group-hover:max-h-60 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:[-webkit-mask-image:none] md:group-hover:[mask-image:none]";
    const tileStyle = {
      animationDelay: `${index * 0.6}s`,
      "--bottom-row-shift-x": `${bottomRowShiftPx}px`,
      top: shouldShiftBottomTiles ? `${-bottomRowLiftPx}px` : undefined,
    };

    return (
      <article
        key={tile.title}
        ref={(node) => {
          tileRefs.current[index] = node;
        }}
        className={`group relative isolate min-h-[240px] overflow-hidden rounded-3xl border border-white/20 bg-white/[0.04] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-300 hover:-translate-y-1.5 hover:border-cyan-100/45 hover:bg-white/[0.06] md:h-[8rem] md:cursor-pointer md:hover:h-[25rem] lg:transition-transform lg:duration-500 lg:ease-[cubic-bezier(0.22,1,0.36,1)] ${
          shouldShiftBottomTiles ? "lg:translate-x-[var(--bottom-row-shift-x)]" : ""
        } ${layoutClass}`}
        style={tileStyle}
        onMouseEnter={() => setActiveTileIndex(index)}
        onMouseLeave={() => setActiveTileIndex(null)}
      >
        <div
          className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br blur-[95px] transition duration-300 group-hover:opacity-100 ${
            index % 2 === 0
              ? "from-cyan-300/30 via-sky-200/10 to-transparent opacity-80"
              : "from-indigo-300/25 via-cyan-200/10 to-transparent opacity-70"
          }`}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/45 to-transparent opacity-65" />
        <h3 className="text-2xl leading-tight text-white/95">{tile.title}</h3>
        <div className={detailsClassName}>
          <p className="text-base leading-relaxed text-white/65">{tile.description}</p>
          <div className="mt-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Who is it for</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{tile.whoFor}</p>
          </div>
        </div>
      </article>
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[rgb(6,7,10)] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-36 top-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[140px]" />
        <div className="absolute right-[-80px] top-32 h-[380px] w-[380px] rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-[-120px] left-1/3 h-[420px] w-[420px] rounded-full bg-sky-300/10 blur-[170px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-10 sm:px-12">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="p5v2-brand">
            <Image className="grayscale" src="/logo.svg" alt="Neurasense" width={24} height={24} />
            <span>Neurasense</span>
          </div>
          <a
            className="text-xs uppercase tracking-[0.3em] text-white/70 transition hover:text-white"
            href="/#p7-products"
          >
            Back to Products
          </a>
        </header>

        <section className="grid items-center gap-10">
          <div className="space-y-6">
            <p className="max-w-lg border-l border-cyan-200/45 pl-4 text-sm uppercase tracking-[0.24em] text-cyan-100/85">
              When your work matters most, keep every byte under your control.
            </p>
            <h1 className="text-balance text-4xl leading-tight sm:text-6xl">Vault</h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/70">
              Vault is a total security solution made by the Neurasense research team that brings
              trusted protection to every online workflow.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-white/65">
              Its capabilities range from simple encrypted file sharing to secure collaboration,
              repository protection, and policy-driven access for hosted applications.
            </p>
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="mt-3 text-3xl sm:text-4xl">Security capabilities in motion.</h2>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-[34%] hidden h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-100/25 to-transparent lg:block" />
            <div className="pointer-events-none absolute left-[33.3%] top-[34%] hidden h-[22%] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-100/25 to-transparent lg:block" />
            <div className="pointer-events-none absolute right-[33.3%] top-[34%] hidden h-[22%] w-px translate-x-1/2 bg-gradient-to-b from-cyan-100/25 to-transparent lg:block" />

            <div ref={tilesGridRef} className="relative grid items-start gap-6 md:grid-cols-2 lg:grid-cols-6">
              {solutionTiles.map((tile, index) => {
                const isLastOddTile =
                  solutionTiles.length % 2 === 1 && index === solutionTiles.length - 1;
                const mdCenterClass = isLastOddTile
                  ? "md:col-span-2 md:justify-self-center md:w-[calc(50%_-_0.75rem)] lg:w-auto"
                  : "";

                return renderTile(tile, index, `${getTilePlacement(index)} ${mdCenterClass}`);
              })}
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/14 bg-white/[0.03] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.42)] sm:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Who is it for</p>
          <div className="mt-6 grid gap-4 text-sm text-white/62">
            {audienceProfiles.map((item, index) => (
              <div
                key={item.audience}
                className={`flex items-center justify-between ${
                  index !== audienceProfiles.length - 1 ? "border-b border-white/10 pb-3" : ""
                }`}
              >
                <div className="pr-4">
                  <p className="text-white/78">{item.audience}</p>
                  <p className="mt-1 text-xs text-white/50">{item.products}</p>
                </div>
                <span className="whitespace-nowrap text-white/40">
                  {item.productCount} relevant{" "}
                  {item.productCount === 1 ? "capability" : "capabilities"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
