import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BG, GOLD } from './constants';

type OrbVariant = 'gold-tr' | 'teal-bl' | 'red-center' | 'gold-center';

interface SharedBgProps {
  orbs?: OrbVariant[];
}

export const SharedBg: React.FC<SharedBgProps> = ({ orbs = ['gold-tr', 'teal-bl'] }) => {
  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
      {/* Subtle golden grid */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path
              d="M 72 0 L 0 0 0 72"
              fill="none"
              stroke={GOLD}
              strokeWidth="0.5"
              strokeOpacity="0.12"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Orbs */}
      {orbs.map((orb) => {
        const styles = getOrbStyle(orb);
        return <div key={orb} style={styles} />;
      })}
    </AbsoluteFill>
  );
};

function getOrbStyle(variant: OrbVariant): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(140px)',
    pointerEvents: 'none',
  };
  switch (variant) {
    case 'gold-tr':
      return {
        ...base,
        width: 700,
        height: 700,
        background: `radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 70%)`,
        top: -150,
        right: -150,
      };
    case 'teal-bl':
      return {
        ...base,
        width: 600,
        height: 600,
        background: `radial-gradient(circle, rgba(45,212,191,0.14) 0%, transparent 70%)`,
        bottom: -120,
        left: -120,
      };
    case 'red-center':
      return {
        ...base,
        width: 600,
        height: 600,
        background: `radial-gradient(circle, rgba(248,113,113,0.10) 0%, transparent 70%)`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    case 'gold-center':
      return {
        ...base,
        width: 1000,
        height: 1000,
        background: `radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
  }
}
