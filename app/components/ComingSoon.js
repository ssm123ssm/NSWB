import { ArrowIcon, BellIcon, DotsIcon } from "./Icons";

/**
 * The teaser for the seventh product — still unnamed, so this section only
 * ever hints at it: real flows from its own build (a community card with a
 * role and a member count, an invite notification, a share composer, the
 * community options menu, an event cover) drawn in its own accent
 * (`data-brand="indigo"`, added for this alone) rather than borrowing NSQR's
 * violet. No name, no logo — the composition is the announcement.
 *
 * Layout is heroui.pro's own "AI Builder" hero: an eyebrow, a two-line
 * headline with the second line muted, a centered lead, then a canvas of
 * floating cards — two in sharp focus up front, two blurred behind them for
 * depth — and a closing three-word tagline under it all.
 */
export default function ComingSoon() {
  return (
    <section className="section-tight" data-brand="indigo" id="coming-soon">
      <div className="shell flex flex-col items-center text-center">
        <p className="eyebrow">Coming soon</p>
        <h2 className="section-title max-w-2xl">
          A community, built
          <span className="display-tone block">around the people in it.</span>
        </h2>
        <p className="lead lead-center mt-3 max-w-xl">
          Circles for your university, lab or research group — a feed, a way in, and a
          profile you can just show up with.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="shell relative mt-14 h-[340px] sm:h-[390px] md:h-[440px]"
      >
        {/* Background pair, out of focus for depth, anchored to the bottom
            corners so they sit well clear of the composer below it. Hidden
            below sm — at that width there is no room for four cards to read
            as anything but noise. */}
        <div className="absolute bottom-0 left-[6%] hidden w-[190px] -rotate-2 opacity-70 blur-[1.5px] sm:block md:left-[9%] md:w-[210px]">
          <OptionsMenuCard />
        </div>
        <div className="absolute bottom-0 right-[6%] hidden w-[190px] rotate-2 opacity-80 blur-[1px] sm:block md:right-[9%] md:w-[220px]">
          <EventCard />
        </div>

        {/* Foreground pair, sharp, tucked into the top corners. */}
        <div className="absolute left-[9%] top-0 w-[170px] -rotate-3 sm:w-[190px] md:left-[13%] md:w-[210px]">
          <CommunityCard />
        </div>
        <div className="absolute right-[9%] top-0 w-[180px] rotate-2 sm:w-[200px] md:right-[13%] md:w-[220px]">
          <InviteCard />
        </div>

        {/* The composer, centred and level — the one thing here at rest,
            with clear air between it and every card around it. */}
        <div className="absolute left-1/2 top-[36%] w-[210px] -translate-x-1/2 sm:w-[235px] sm:top-[38%] md:w-[260px]">
          <span className="chip absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap sm:-top-9">
            Invited by Ann
          </span>
          <ComposerCard />
        </div>
      </div>

      <div className="shell mt-8 flex flex-col items-center text-center sm:mt-4">
        <p className="text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
          Join. Share. <span className="text-[color:var(--display-muted)]">Vibe.</span>
        </p>
        <p className="lead lead-center mt-2 max-w-md">A private space, coming soon.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   The cards. Plain chrome, no shadows or copy stolen from anywhere else on
   the site — each one is a hint at a real screen (per GH-V-1.0's README: the
   community list, the invite email, a community's own options menu, its
   event/feed rows), not a mockup of a mockup.
   ------------------------------------------------------------------------- */

function CommunityCard() {
  return (
    <div
      className="rounded-[18px] border p-3.5"
      style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-md)" }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[0.7rem] font-semibold"
          style={{ background: "var(--brand)", color: "#ffffff" }}
        >
          RC
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.8rem] font-semibold">Research Circle</p>
          <p className="text-[0.68rem]" style={{ color: "var(--text-faint)" }}>
            128 members
          </p>
        </div>
        <span className="shrink-0" style={{ color: "var(--text-faint)" }}>
          <DotsIcon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1.5 border-t pt-2.5" style={{ borderColor: "var(--border)" }}>
        <span
          className="rounded-full px-2 py-0.5 text-[0.62rem] font-medium"
          style={{ background: "var(--brand-soft)", color: "var(--brand-text)" }}
        >
          Member
        </span>
        <span className="text-[0.62rem]" style={{ color: "var(--text-faint)" }}>
          14 posts this week
        </span>
      </div>
    </div>
  );
}

function InviteCard() {
  return (
    <div
      className="rounded-[18px] border p-3.5"
      style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-md)" }}
    >
      <div className="flex items-start gap-2.5">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.65rem] font-semibold"
          style={{ background: "var(--brand-soft)", color: "var(--brand-text)" }}
        >
          JW
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[0.78rem] font-semibold">John Watson</p>
            <span className="shrink-0" style={{ color: "var(--text-faint)" }}>
              <BellIcon className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-0.5 text-[0.7rem] leading-snug" style={{ color: "var(--text-faint)" }}>
            invited you to join their circle
          </p>
        </div>
      </div>
      <button
        className="btn btn-gradient mt-3 h-7 w-full text-[0.68rem]"
        style={{ background: "var(--brand)" }}
        type="button"
        tabIndex={-1}
      >
        Accept
      </button>
    </div>
  );
}

function ComposerCard() {
  return (
    <div
      className="rounded-[20px] border p-4"
      style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-md)" }}
    >
      <p className="text-left text-[0.8rem] leading-[1.4]" style={{ color: "var(--text-faint)" }}>
        Share an update with your circle…
      </p>
      <div className="mt-3.5 flex items-center justify-between border-t pt-2.5" style={{ borderColor: "var(--border)" }}>
        <span className="text-[0.68rem] font-medium" style={{ color: "var(--brand-text)" }}>
          Research Circle
        </span>
        <span
          className="grid h-7 w-7 place-items-center rounded-full"
          style={{ background: "var(--brand)", color: "#ffffff" }}
        >
          <ArrowIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

function OptionsMenuCard() {
  const items = ["Invite members", "View members", "Community chat", "Leave group"];
  return (
    <div
      className="rounded-[16px] border p-2"
      style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
    >
      {items.map((item) => (
        <p
          className="rounded-[8px] px-2.5 py-1.5 text-left text-[0.7rem]"
          key={item}
          style={{ color: "var(--text-muted)" }}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

function EventCard() {
  return (
    <div
      className="overflow-hidden rounded-[16px] border"
      style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
    >
      <div
        className="h-16 w-full"
        style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-hover) 60%, #0f1419 100%)" }}
      />
      <div className="p-2.5">
        <p className="text-[0.72rem] font-semibold">Study session</p>
        <p className="text-[0.64rem]" style={{ color: "var(--text-faint)" }}>
          This week · 8 going
        </p>
      </div>
    </div>
  );
}
