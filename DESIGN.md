---
name: "2OY Website"
description: "Minimal institutional design for a twenty-year digital asset fund."
colors:
  brand-black: "#1a1a1a"
  brand-mid: "#4a4a4a"
  brand-light: "#7a7a7a"
  brand-border: "#e5e5e5"
  surface: "#ffffff"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(28px, 5vw, 40px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "Inter, Helvetica Neue, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Inter, Helvetica Neue, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.brand-black}"
    rounded: "{rounded.none}"
    padding: "10px 18px"
  button-outline-hover:
    backgroundColor: "{colors.brand-black}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "10px 18px"
  input-minimal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.brand-black}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  principle-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.brand-mid}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "8px 0 8px 24px"
---

# Design System: 2OY Website

## 1. Overview

**Creative North Star: "The Quiet Investment Thesis"**

The 2OY visual system should feel like an institutional thesis presented with mathematical restraint. It is deliberately sparse: white surface, black type, ruled separators, and enough space for conviction to land without theatrics. The page should feel composed by someone who expects the reader to be intelligent.

Visual richness comes from structure, pacing, hierarchy, and editorial compression, not decoration. The system rejects SaaS and AI-startup cliches, crypto hype, and bank-brochure blandness. It should never look like a template trying to look expensive; it should look like a fund with a worldview.

**Key Characteristics:**
- Minimal, high-contrast, and text-led.
- Serif display type for thesis-level statements; sans body type for analysis and action.
- Flat surfaces with borders and rules instead of shadows.
- Sparse accent use; black and white carry the institution.
- Copy blocks should be shortened until each line has a job.

## 2. Colors

The palette is institutional monochrome: white surface, black thesis, gray analysis, pale rule lines.

### Primary
- **Thesis Black**: The main brand ink, used for headings, primary links, button borders, hover fills, and decisive structural lines.

### Neutral
- **Institutional White**: The default page surface. It should stay clean, untinted, and free of decorative background effects.
- **Analyst Gray**: The body-copy color for sustained reading. It is dark enough for readable contrast while staying quieter than headings.
- **Archive Gray**: Secondary metadata, footer text, and low-priority supporting labels.
- **Rule Gray**: Borders, dividers, and quiet structural separation.

### Named Rules

**The Monochrome Conviction Rule.** Black and white are not placeholders; they are the identity. Add color only when it clarifies meaning better than type, spacing, or structure.

**The No-Signal-Noise Rule.** Gradients, glows, neon accents, and decorative color fields are prohibited because they compete with the fund's thesis.

## 3. Typography

**Display Font:** Cormorant Garamond, with Georgia and serif fallbacks.
**Body Font:** Inter, with Helvetica Neue and sans-serif fallbacks.
**Label/Mono Font:** None. Do not introduce monospace as a shortcut for technical seriousness.

**Character:** The pairing is classical and analytical: a literary serif for conviction, a neutral sans for precision. It should feel calm and serious, not academic cosplay.

### Hierarchy
- **Display** (400, clamp(28px, 5vw, 40px), 1.2): Page-level theses and primary headings.
- **Headline** (500, 24px, 1.25): Principle headings and important section titles.
- **Title** (500, 18px-20px, 1.35): Compact headings in navigation-adjacent or repeated content.
- **Body** (400, 16px, 1.75): Explanatory copy, capped at readable line lengths around 65-75ch.
- **Label** (500, 14px, 1.4): Navigation, buttons, form labels, metadata, and small interface text.

### Named Rules

**The Thesis First Rule.** Use the serif only when the text is carrying a real idea. Do not spend display type on filler labels.

**The No-Tracking Reflex Rule.** Avoid repeated tiny uppercase tracked labels above every section. One deliberate label can work; repeating them becomes AI scaffolding.

## 4. Elevation

This system is flat by default. Depth is communicated through whitespace, borders, typographic hierarchy, and vertical rhythm. Shadows are not part of the current identity and should not be introduced for ordinary cards, buttons, or sections.

### Named Rules

**The Flat Institution Rule.** Surfaces do not float. If something needs emphasis, use position, type scale, a rule line, or a full border before reaching for a shadow.

## 5. Components

### Buttons
- **Shape:** Rectangular and precise (0px radius by default).
- **Primary:** White background, black text, 1px black border, compact horizontal padding.
- **Hover / Focus:** Invert to black background with white text. Keep the interaction sober and fast.
- **Secondary / Ghost:** Text links can be underlined black text when the action is navigational rather than transactional.

### Cards / Containers
- **Corner Style:** No rounding for principle blocks and editorial sections.
- **Background:** White on white; differentiation comes from borders, rules, and spacing.
- **Shadow Strategy:** No shadows.
- **Border:** Thin gray dividers and 1px borders only. Avoid thick side-stripe accents.
- **Internal Padding:** Use restrained spacing steps, typically 24px left padding for structured blocks and 32-48px between major ideas.

### Inputs / Fields
- **Style:** White field, black or gray text, 1px border, square corners.
- **Focus:** Increase border clarity; do not add glow.
- **Error / Disabled:** Use copy and border treatment, not color alone.

### Navigation
- **Style:** Quiet sans-serif links, black on white, with enough spacing to feel institutional rather than dense.
- **Hover / Active:** Underline or weight shift. Avoid pills, badges, and decorative nav backgrounds.
- **Mobile:** Preserve clarity over cleverness; menu states must be readable and keyboard-accessible.

### Principle Blocks

Principle blocks are thesis containers, not decorative cards. Use serif headings, body copy beneath, clear dividers between items, and restrained structural rules. The block should make the idea easier to scan without making it feel packaged.

## 6. Do's and Don'ts

### Do:
- **Do** lead with thesis-level hierarchy before explanation.
- **Do** preserve the white, black, and gray institutional palette.
- **Do** use borders and dividers as structure, not decoration.
- **Do** keep line lengths readable and shorten copy until every paragraph is load-bearing.
- **Do** design multilingual layouts that tolerate English, Spanish, and Chinese text length differences.

### Don't:
- **Don't** use SaaS and AI-startup cliches: purple gradients, glowing blobs, rounded icon tiles, endless card grids, generic hero metrics, or decorative motion.
- **Don't** use crypto hype: neon palettes, black-and-gold wealth signals, moonshot language, token-pumping visuals, or anything that implies fast money.
- **Don't** use bank-brochure blandness: generic financial copy, stock-photo trust signals, empty prestige language, or belief-free polish.
- **Don't** add shadows to bordered cards or buttons.
- **Don't** use thick `border-left` stripes as accents on cards or callouts.
- **Don't** turn every idea into an identical card. Structure the argument instead.
