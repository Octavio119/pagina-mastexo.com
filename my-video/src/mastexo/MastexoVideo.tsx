/**
 * MastexoVideo.tsx
 * Main composition — stitches all 8 scenes together.
 * Duration: 115s × 30fps = 3450 frames
 * Dimensions: 1080 × 1920 (portrait / Reels / TikTok)
 */
import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
} from 'remotion';
import { loadFont as loadCG } from '@remotion/google-fonts/CormorantGaramond';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { loadFont as loadSM } from '@remotion/google-fonts/SpaceMono';

import {
  SCENE_STARTS,
  SCENE_DUR,
  setFonts,
} from './constants';
import { NARRATIONS, AUDIO_DIR } from './narration';

import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';
import { Scene8 } from './scenes/Scene8';

// ── Load Google Fonts ────────────────────────────────────────────────
// loadFont(style?, options?) — style is 'normal' | 'italic'
const { fontFamily: CG_FAMILY } = loadCG('normal', { weights: ['300', '400', '700'], subsets: ['latin'] });
const { fontFamily: DM_FAMILY } = loadDM('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin'] });
const { fontFamily: SM_FAMILY } = loadSM('normal', { weights: ['400', '700'], subsets: ['latin'] });

// Inject font names into constants so all scenes pick them up
setFonts(CG_FAMILY, DM_FAMILY, SM_FAMILY);

// ── Scene registry ───────────────────────────────────────────────────
const SCENES = [
  Scene1,
  Scene2,
  Scene3,
  Scene4,
  Scene5,
  Scene6,
  Scene7,
  Scene8,
] as const;

// ── MastexoVideo ─────────────────────────────────────────────────────
export const MastexoVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* ── Narración por escena ────────────────────────────── */}
      {NARRATIONS.map((n) => {
        const src = `${AUDIO_DIR}/${n.filename}`;
        // Solo incluye el Audio si el archivo existe en public/
        // En preview sin audio el <Audio> simplemente no carga
        return (
          <Sequence key={`audio-${n.index}`} from={n.startFrame} name={`Audio-Scene${n.index + 1}`}>
            <Audio
              src={staticFile(src)}
              volume={1}
              // Remotion ignora el error si el archivo no existe en preview
            />
          </Sequence>
        );
      })}

      {/* ── Escenas visuales ────────────────────────────────── */}
      {SCENES.map((SceneComponent, i) => (
        <Sequence
          key={i}
          from={SCENE_STARTS[i]}
          durationInFrames={SCENE_DUR[i]}
          name={`Scene${i + 1}`}
        >
          <SceneComponent />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
