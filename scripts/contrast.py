#!/usr/bin/env python3
"""WCAG contrast checker for the neurasense palette.

The brand handoff asks for 4.5:1 on every text pair and says to check it
rather than assume. This derives the text-safe companion for each chart hue
and audits the semantic tokens in both themes.

Run: python3 scripts/contrast.py
"""

import colorsys

# --- ramps from the handoff ------------------------------------------------
VIOLET = {
    50: "#F7F5FE", 100: "#EDEAFD", 200: "#DAD2FF", 300: "#C0B0FE",
    400: "#9A73FF", 500: "#7C3AED", 600: "#6924D0", 700: "#5219A6",
    800: "#3B107A", 900: "#240C4D",
}
NEUTRAL = {
    50: "#F9FAFD", 100: "#F1F3F8", 200: "#E4E7ED", 300: "#D1D4DB",
    400: "#A0A5AE", 500: "#818691", 600: "#6B727F", 700: "#4C5360",
    800: "#2C3340", 900: "#0D1421",
}
# Five chart hues and one that is not: coLab's blue is the product's own colour
# and replaces chart-2 (#278BDB) in the palette, which sat six degrees of hue
# away from it. AES took chart-6 when that happened.
CHART = {
    "violet": "#8B72D7",   # chart-1  -> NSQR
    "blue":   "#0F81BC",   # coLab
    "cyan":   "#1697A3",   # chart-3  -> Vault
    "emerald":"#0C9F69",   # chart-4  -> Presence
    "amber":  "#9E8406",   # chart-5  -> Lipd Hub
    "clay":   "#D05F43",   # chart-6  -> AES
}
INK = "#1C2231"
# Off-ramp on purpose: neutral 600 does not clear the deepened subtle ground,
# and .section-subtle is a whole section of text sitting on exactly that.
FAINT = "#636976"
PAPER = "#F9FAFD"
WASH = "#F5F3FF"
WHITE = "#FFFFFF"


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def hexof(r, g, b):
    return "#" + "".join(f"{round(max(0,min(1,c))*255):02X}" for c in (r, g, b))


def luminance(h):
    def chan(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (chan(c) for c in rgb(h))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(fg, bg):
    a, b = luminance(fg), luminance(bg)
    lo, hi = min(a, b), max(a, b)
    return (hi + 0.05) / (lo + 0.05)


def darken_to(h, bg, target=4.5):
    """Walk lightness down, hue and saturation held, until the pair passes."""
    r, g, b = rgb(h)
    hue, light, sat = colorsys.rgb_to_hls(r, g, b)
    while light > 0:
        cand = hexof(*colorsys.hls_to_rgb(hue, light, sat))
        if ratio(cand, bg) >= target:
            return cand
        light -= 0.005
    return "#000000"


def lighten_to(h, bg, target=4.5):
    """Same walk upward, for the dark theme."""
    r, g, b = rgb(h)
    hue, light, sat = colorsys.rgb_to_hls(r, g, b)
    while light < 1:
        cand = hexof(*colorsys.hls_to_rgb(hue, light, sat))
        if ratio(cand, bg) >= target:
            return cand
        light += 0.005
    return "#FFFFFF"


def show(label, fg, bg, need=4.5):
    r = ratio(fg, bg)
    print(f"  {'PASS' if r >= need else 'FAIL'}  {r:5.2f}:1  {label:<34} {fg} on {bg}")
    return r >= need


ok = True
print("\n=== LIGHT: text on paper / white / wash ===")
for label, fg in (("--text (ink)", INK), ("--text-muted n700", NEUTRAL[700]),
                  ("--text-faint (shipped)", FAINT)):
    for bgname, bg in (("paper", PAPER), ("white", WHITE)):
        ok &= show(f"{label} / {bgname}", fg, bg)
ok &= show("violet 600 link / paper", VIOLET[600], PAPER)
ok &= show("violet 600 link / wash", VIOLET[600], WASH)
ok &= show("white on violet 500 (button)", WHITE, VIOLET[500], 4.5)

print("\n=== LIGHT: product accents — chart fill + derived text companion ===")
light_text = {}
for name, fill in CHART.items():
    companion = darken_to(fill, PAPER)
    light_text[name] = companion
    print(f"  {name:<8} fill {fill}  ->  text {companion}", end="")
    print(f"   ({ratio(companion, PAPER):.2f}:1 paper, {ratio(companion, WHITE):.2f}:1 white)")

print("\n=== DARK: derived ground and text ===")
D_BG, D_SUBTLE = "#080D19", "#0E1524"
D_SURFACE, D_RAISED = "#161F2F", "#1C2637"
# Neutral 500 lands at 4.16:1 on the raised surface — the ramp's "600 and
# darker carries text" line is a light-theme rule and does not invert cleanly,
# so the dark theme's two muted steps move up one rung to 300/400.
for label, fg in (("--text n50", NEUTRAL[50]), ("--text-muted n300", NEUTRAL[300]),
                  ("--text-faint n400", NEUTRAL[400])):
    ok &= show(f"{label} / raised", fg, D_RAISED)
ok &= show("violet 400 accent / raised", VIOLET[400], D_RAISED)
ok &= show("ink on violet 400 (button)", D_BG, VIOLET[400])

print("\n=== DARK: product accents lifted off the raised surface ===")
for name, fill in CHART.items():
    companion = lighten_to(fill, D_RAISED)
    print(f"  {name:<8} text {companion}   ({ratio(companion, D_RAISED):.2f}:1 raised,"
          f" {ratio(companion, D_BG):.2f}:1 ground)")


# --- tinted grounds --------------------------------------------------------
# The pairs above all sit on paper or white. Two places on the site do not, and
# both were failing on the live pages while this script reported everything
# passing:
#
#   - .section-subtle lays text on --bg-subtle (neutral 100), which is darker
#     than paper, so the faint step loses the margin it had
#   - the hero product chips lay a product's own text colour on that product's
#     --brand-soft, which is darker still than paper for every hue
#
# A companion derived against paper is therefore not safe everywhere it is
# used. These are the real worst-case grounds, so this is what the companions
# have to be derived against.
# Deepened from neutral 100 so .section-subtle actually reads as a different
# ground: the old step off paper was 1.067 in relative luminance, which is at
# the edge of visible. This is 1.142, and --text-faint moved with it.
SUBTLE = "#E8ECF5"
SOFT = {
    "violet": "#F5F3FF", "blue": "#E4F2FD", "cyan": "#E6F6F7",
    "emerald": "#D9FAE3", "amber": "#FFEED2", "clay": "#FEEBE9",
}

print("\n=== LIGHT: muted text on the subtle ground (.section-subtle), as shipped ===")
# Shipped values again, not ramp steps: --text-faint sits just off neutral 600
# precisely because the ramp step did not clear this ground.
for label, fg in (("--text-muted", "#4C5360"), ("--text-faint", FAINT)):
    if not show(f"{label} / bg-subtle", fg, SUBTLE):
        ok = False
        print(f"        -> darken to {darken_to(fg, SUBTLE)}")

# The values app/globals.css actually ships for --brand-text in the light
# theme. Checked as shipped rather than re-derived, so this section fails when
# the stylesheet is wrong rather than when the derivation would have been —
# which is what makes it a regression check instead of a demonstration. Keep in
# step with the [data-brand] blocks in globals.css.
SHIPPED_BRAND_TEXT = {
    "violet": "#6924D0", "blue": "#0D72A7", "cyan": "#117A83",
    "emerald": "#0A7E53", "amber": "#816C05", "clay": "#B7492D",
}

print("\n=== LIGHT: accent text on its own soft chip (as shipped) ===")
for name, fg in SHIPPED_BRAND_TEXT.items():
    soft = SOFT[name]
    if not show(f"{name} brand-text / {name} soft", fg, soft):
        ok = False
        safe = darken_to(fg, soft)
        print(f"        -> darken to {safe}"
              f" ({ratio(safe, soft):.2f}:1 chip, {ratio(safe, PAPER):.2f}:1 paper)")

# --- semantic tokens -------------------------------------------------------
# Pass / warn / fail, kept separate from --accent and --brand so a state reads
# the same on all six products. They reuse the emerald, amber and clay
# companions rather than introducing hues, so the site stays at six.
SEMANTIC = {
    "light": {"ok": ("#0A7E53", "#D9FAE3"), "warn": ("#816C05", "#FFEED2"),
              "fail": ("#B7492D", "#FEEBE9")},
    "dark":  {"ok": ("#0CA16B", "#0C2419"), "warn": ("#A58A06", "#241E0C"),
              "fail": ("#D56F55", "#2B1A15")},
}

print("\n=== Semantic tokens on their own soft grounds, and on the page ground ===")
for theme, rows in SEMANTIC.items():
    ground = PAPER if theme == "light" else D_BG
    for name, (fg, soft) in rows.items():
        ok &= show(f"{theme} --{name} / soft", fg, soft)
        ok &= show(f"{theme} --{name} / ground", fg, ground)

print(f"\n{'ALL SEMANTIC PAIRS PASS' if ok else 'SOME PAIRS FAIL — see above'}\n")
