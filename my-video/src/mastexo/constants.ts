// ── Brand Colors ──────────────────────────────────────
export const GOLD   = '#C9A84C';
export const TEAL   = '#2DD4BF';
export const TEXT   = '#f0ede8';
export const GREEN  = '#34d399';
export const RED    = '#f87171';
export const BG     = '#080c12';
export const CARD   = '#0e1420';
export const BORDER = 'rgba(201,168,76,0.18)';
export const BORDER_STRONG = 'rgba(201,168,76,0.35)';

// ── Font Families (loaded in MastexoVideo.tsx) ─────────
export let FONT_CG = 'serif';        // Cormorant Garamond
export let FONT_DM = 'sans-serif';   // DM Sans
export let FONT_SM = 'monospace';    // Space Mono

export function setFonts(cg: string, dm: string, sm: string) {
  FONT_CG = cg;
  FONT_DM = dm;
  FONT_SM = sm;
}

// ── Video Spec ─────────────────────────────────────────
export const FPS    = 30;
export const W      = 1080;
export const H      = 1920;
export const TOTAL_S = 115;
export const TOTAL_F = TOTAL_S * FPS; // 3450

// ── Scene start times (seconds → frames) ──────────────
export const SCENE_STARTS = [0, 10, 22, 35, 48, 68, 82, 98].map(s => s * FPS);
export const SCENE_ENDS   = [10, 22, 35, 48, 68, 82, 98, 115].map(s => s * FPS);

// Duration of each scene in frames
export const SCENE_DUR = SCENE_STARTS.map((s, i) => SCENE_ENDS[i] - s);

// ── Shared animation helpers ───────────────────────────
export const FADE_IN_F  = 18; // frames to fade in  (0.6s)
export const FADE_OUT_F = 20; // frames to fade out (0.67s)

// Stagger delay between animated elements (frames)
export const STAGGER = 7;
