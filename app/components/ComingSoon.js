import { ArrowIcon, BellIcon, DotsIcon } from "./Icons";
import RequestAccessLink from "./RequestAccessLink";
import { comingSoon } from "../data/site";

/**
 * The teaser for the seventh product — still unnamed, so this section only
 * ever hints at it: real flows from its own build (a community card with a
 * role and a member count, an invite notification, a share composer, the
 * community options menu, an event cover) drawn in its own accent
 * (`data-brand="indigo"`, added for this alone) rather than borrowing NSQR's
 * violet. No name, no logo — the composition is the announcement.
 *
 * The composition tells one small, legible story: find a circle, be invited
 * into it, then contribute to it. The two sharp cards establish the first two
 * beats, the composer completes the third, and the blurred edge cards only
 * hint at the wider life of the group.
 */
export default function ComingSoon() {
  return (
    <section className="section-tight" data-brand="indigo" id="coming-soon">
      <div className="shell flex flex-col items-center text-center">
        <p className="eyebrow">{comingSoon.eyebrow}</p>
        <h2 className="section-title max-w-2xl">
          {comingSoon.headline.head}
          <span className="display-tone block">{comingSoon.headline.tail}</span>
        </h2>
        <p className="lead lead-center mt-3 max-w-xl">
          {comingSoon.lead}
        </p>
        <RequestAccessLink
          className="btn btn-gradient btn-lg mt-7"
          label={comingSoon.action.label}
          product={comingSoon.action.subject}
        />
      </div>

      <div
        aria-hidden="true"
        className="shell relative mt-14 h-[370px] sm:h-[390px] md:h-[440px]"
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
        <div className="absolute left-[4%] top-0 w-[36vw] max-w-[145px] -rotate-3 sm:left-[9%] sm:w-[190px] sm:max-w-none md:left-[13%] md:w-[210px]">
          <CommunityCard />
        </div>
        <div className="absolute right-[4%] top-0 w-[38vw] max-w-[150px] rotate-2 sm:right-[9%] sm:w-[200px] sm:max-w-none md:right-[13%] md:w-[220px]">
          <InviteCard />
        </div>

        {/* The composer, centred and level — the one thing here at rest,
            with clear air between it and every card around it. */}
        <div className="absolute left-1/2 top-1/2 w-[210px] -translate-x-1/2 sm:top-[38%] sm:w-[235px] md:w-[260px]">
          <span className="chip absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap sm:-top-9">
            {comingSoon.scene.invitationLabel}
          </span>
          <ComposerCard />
        </div>
      </div>

      <div className="shell mt-8 flex flex-col items-center text-center sm:mt-4">
        <p className="text-3xl font-medium tracking-[-0.01em] sm:text-4xl">
          {comingSoon.closing.lead}{" "}
          <span className="text-[color:var(--display-muted)]">
            {comingSoon.closing.tail}
          </span>
        </p>
        <p className="lead lead-center mt-2 max-w-md">
          {comingSoon.closing.body}
        </p>
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
      style={{ borderColor: "var(--border-strong)", background: "var(--bg)" }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[0.7rem] font-semibold"
          style={{ background: "var(--brand)", color: "var(--accent-on)" }}
        >
          {comingSoon.scene.circle.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.8rem] font-medium">{comingSoon.scene.circle.name}</p>
          <p className="text-[0.68rem]" style={{ color: "var(--text-faint)" }}>
            {comingSoon.scene.circle.members}
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
          {comingSoon.scene.circle.activity}
        </span>
      </div>
    </div>
  );
}

function InviteCard() {
  return (
    <div
      className="rounded-[18px] border p-3.5"
      style={{ borderColor: "var(--border-strong)", background: "var(--bg)" }}
    >
      <div className="flex items-start gap-2.5">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.65rem] font-semibold"
          style={{ background: "var(--brand-soft)", color: "var(--brand-text)" }}
        >
          {comingSoon.scene.invitation.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[0.78rem] font-medium">{comingSoon.scene.invitation.name}</p>
            <span className="shrink-0" style={{ color: "var(--text-faint)" }}>
              <BellIcon className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-0.5 text-[0.7rem] leading-snug" style={{ color: "var(--text-faint)" }}>
            {comingSoon.scene.invitation.message}
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
      style={{ borderColor: "var(--border-strong)", background: "var(--bg)" }}
    >
      <p className="text-left text-[0.8rem] leading-[1.4]" style={{ color: "var(--text-faint)" }}>
        {comingSoon.scene.composer.prompt}
      </p>
      <div className="mt-3.5 flex items-center justify-between border-t pt-2.5" style={{ borderColor: "var(--border)" }}>
        <span className="text-[0.68rem] font-medium" style={{ color: "var(--brand-text)" }}>
          {comingSoon.scene.circle.name}
        </span>
        <span
          className="grid h-7 w-7 place-items-center rounded-full"
          style={{ background: "var(--brand)", color: "var(--accent-on)" }}
        >
          <ArrowIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

function OptionsMenuCard() {
  return (
    <div
      className="rounded-[16px] border p-2"
      style={{ borderColor: "var(--border-strong)", background: "var(--bg)" }}
    >
      {comingSoon.scene.menu.map((item) => (
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
      style={{ borderColor: "var(--border-strong)", background: "var(--bg)" }}
    >
      <div
        className="h-16 w-full"
        style={{ background: "var(--brand)" }}
      />
      <div className="p-2.5">
        <p className="text-[0.72rem] font-medium">{comingSoon.scene.event.title}</p>
        <p className="text-[0.64rem]" style={{ color: "var(--text-faint)" }}>
          {comingSoon.scene.event.detail}
        </p>
      </div>
    </div>
  );
}
