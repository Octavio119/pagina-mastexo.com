import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeroPillProps {
  href: string
  announcement: string
  label: string
  className?: string
}

export function HeroPill({ href, announcement, label, className }: HeroPillProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 ring-1 transition-all duration-200 hover:ring-2 hover:scale-[1.02] cursor-pointer',
        className
      )}
    >
      {/* Announcement badge */}
      <div className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold leading-tight">
        {announcement}
      </div>

      {/* Label */}
      <p className="text-sm font-medium leading-tight">{label}</p>

      {/* Arrow icon — uses fill so [&_svg_path]:fill-* works */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      >
        <path d="M5.5 3L9.5 7L5.5 11V3Z" />
      </svg>
    </Link>
  )
}
