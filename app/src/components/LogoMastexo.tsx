import React from 'react';

interface LogoMastexoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'horizontal' | 'icon' | 'mono';
  theme?: 'dark' | 'light';
  width?: number;
  height?: number;
}

export const LogoMastexo = ({
  variant = 'horizontal',
  theme = 'dark',
  width,
  height,
  ...rest
}: LogoMastexoProps) => {
  const gradId = React.useId();

  const showGradient = variant !== 'mono';

  const textColor =
    variant === 'mono' ? '#7C3AED'
    : theme === 'dark' ? '#FFFFFF'
    : '#0D0A1A';

  const iconFill = showGradient ? `url(#${gradId})` : '#7C3AED';

  const Gradient = () => (
    <defs>
      <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7C3AED" />
        <stop offset="1" stopColor="#A855F7" />
      </linearGradient>
    </defs>
  );

  if (variant === 'icon') {
    return (
      <svg
        width={width ?? 48}
        height={height ?? 48}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Mastexo"
        {...rest}
      >
        {showGradient && <Gradient />}
        <rect width="48" height="48" rx="12" fill={iconFill} />
        <g
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 36 L12 16 L24 28 L36 16 L41 11" />
          <path d="M41 11 L34.5 11 M41 11 L41 17.5" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      width={width ?? 200}
      height={height ?? 48}
      viewBox="0 0 200 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mastexo"
      {...rest}
    >
      {showGradient && <Gradient />}
      <rect x="4" y="4" width="40" height="40" rx="10" fill={iconFill} />
      <g
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 34 L14 17 L24 27 L34 17 L38.5 12.5" />
        <path d="M38.5 12.5 L33 12.5 M38.5 12.5 L38.5 18" />
      </g>
      <text
        x="56"
        y="32"
        fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.44"
        fill={textColor}
      >
        Mastexo
      </text>
    </svg>
  );
};

export default LogoMastexo;
