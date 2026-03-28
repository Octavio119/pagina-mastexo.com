"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

interface CircleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  idx: number;
  style?: React.CSSProperties;
}

export const Circle = ({ className, idx, ...rest }: CircleProps) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.3 }}
      className={twMerge(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
        className
      )}
    />
  );
};

export const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
        className
      )}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 10s linear infinite;
        }
      `}</style>

      {/* Rotating sweep */}
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[500px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      </div>

      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            border: `1px solid rgba(212, 168, 83, ${0.18 - idx * 0.018})`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  delay,
}: {
  icon?: React.ReactNode;
  text?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: delay ?? 0, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-50 flex flex-col items-center justify-center gap-2"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4A853]/20 bg-[#111] shadow-inner transition-all duration-300 hover:border-[#D4A853]/50 hover:bg-[#1a1a1a]">
        {icon || (
          <svg className="h-6 w-6 text-[#D4A853]/50" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div className="px-2 py-0.5">
        <p className="text-center text-[11px] font-semibold tracking-wide text-[#888] uppercase">
          {text}
        </p>
      </div>
    </motion.div>
  );
};
