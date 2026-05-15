---
name: Journaling Design System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#444748'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.2'
  journal-body-lg:
    fontFamily: Literata
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.7'
  journal-body-md:
    fontFamily: Literata
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  ui-label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  ui-label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 760px
  gutter: 24px
  section-padding: 64px
---

## Brand & Style

The core philosophy of this design system is **Digital Sanctuary**. It is designed to evoke a sense of calm, introspection, and intellectual clarity. By prioritizing the written word above all else, the UI recedes into the background, acting as a sophisticated frame for personal reflection.

The visual style is **Elevated Minimalism**. It leverages expansive whitespace to reduce cognitive load and focuses on high-quality typography to establish a rhythm of reading and writing. The aesthetic is "Airy," meaning every element has room to breathe, avoiding any sense of clutter or urgency. The design feels more like a premium linen notebook than a digital application.

## Colors

The palette is intentionally restrained to maintain focus. It utilizes a high-contrast relationship between deep inks and soft whites, supplemented by a range of slate greys that define structure without adding visual noise.

- **Light Mode:** Uses a base of `#FDFDFD` (off-white) to reduce eye strain compared to pure white. Primary text is `#1A1A1A` (charcoal). Borders use `#E2E8F0` for a "barely-there" appearance.
- **Dark Mode:** Transitions to a deep ink base (`#0F172A`). Secondary surfaces use `#1E293B`. Text shifts to `#F1F5F9` for maximum readability against the dark background.
- **Data Visualization:** Graphs should use monochromatic scales of the secondary color (Slate) or low-saturation earthy tones to ensure they do not distract from the journal entries themselves.

## Typography

This design system uses a dual-font strategy to distinguish between the "System" (UI) and the "Soul" (Content).

- **Hanken Grotesk (Sans-Serif):** Used for navigation, labels, buttons, and metadata. It provides a sharp, contemporary, and functional feel that keeps the interface feeling modern.
- **Literata (Serif):** Reserved exclusively for the journal entries and long-form reading. It is optimized for screen readability with a generous x-height and warm, bookish proportions that encourage deep focus.

Line heights are intentionally set wider than standard (1.6 to 1.7) for body text to enhance the "airy" feel of the page.

## Layout & Spacing

The layout philosophy follows a **Fixed Central Column** model. To foster focus, content is centered within a narrow maximum width (760px), mimicking the width of a physical page and preventing line lengths from becoming too long for comfortable reading.

- **Grid:** A simple 12-column grid is used for dashboard views, but the primary journaling interface is a single-column layout.
- **Margins:** Generous outer margins (64px+) on desktop create a sense of isolation from the rest of the OS.
- **Rhythm:** All spacing is derived from an 8px base unit. Component internal padding should lean toward "oversized" (e.g., 32px padding in cards) to maintain the minimalist aesthetic.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Subtle Ambient Shadows** rather than heavy 3D effects.

- **Surfaces:** Cards and containers use a subtle border (`1px solid`) instead of heavy shadows to define their bounds.
- **Shadows:** When used, shadows are extremely diffused (e.g., `0 10px 40px rgba(0,0,0,0.04)`). They should feel like a soft glow rather than a hard drop shadow.
- **Z-Index Strategy:** The "Writing Layer" always sits at the highest elevation, often appearing as a clean white sheet over a slightly greyed background.

## Shapes

The shape language is **Softened Geometric**. While the layout is structured and grid-aligned, corners are rounded to 8px-12px (Level 2) to prevent the UI from feeling "clinical" or "sharp."

- **Cards & Modals:** 12px corner radius.
- **Buttons & Inputs:** 8px corner radius.
- **Tags/Chips:** Fully pill-shaped to contrast with the more structured rectangular cards.

## Components

### Buttons
Primary buttons are solid charcoal (in light mode) with white text. Secondary buttons are outlined with a 1px border. Transitions should be slow and fluid (200ms ease-in-out).

### Cards
Cards are the primary container for "Past Experiences." They feature a 1px border (`#E2E8F0`), 32px internal padding, and no shadow unless hovered. On hover, a card should lift slightly with a soft ambient shadow.

### Input Fields
Journaling inputs are "borderless." The title field is a large `display-lg` font with no box, while the body field is a simple text area that expands vertically. UI inputs (settings/search) use a bottom-border-only style or a very light grey fill.

### Data Visualization
Charts must be minimalist. Line charts should use a thin 2px stroke without fill under the line. Bar graphs should have rounded tops. All labels for charts use the `ui-label-sm` typography level in a muted slate color.

### Navigation
A minimalist sidebar or a centered top-nav. Navigation items use `ui-label-md` with generous horizontal tracking (letter-spacing) to feel more "boutique."
