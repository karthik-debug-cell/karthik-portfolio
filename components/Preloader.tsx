'use client'
import React, { forwardRef } from 'react'

export interface PreloaderProps {
  className?: string
}

export const Preloader = forwardRef<HTMLDivElement, PreloaderProps>(function Preloader(
  { className = '' },
  ref
) {
  return (
    <div
      ref={ref}
      className={`pre-frame ${className}`.trim()}
      aria-label="Loading portfolio experience"
      aria-live="polite"
      role="status"
    >
      {/* Asymmetric architectural grid lines */}
      <div className="frame-lines" aria-hidden="true">
        {/* Top horizontal line */}
        <div className="frame-line frame-line-h frame-line-h-top" />

        {/* Outer left vertical line (near left edge) */}
        <div className="frame-line frame-line-v frame-line-v-left-outer" />

        {/* Inner left vertical line (approximately one-fifth from left) */}
        <div className="frame-line frame-line-v frame-line-v-left-inner" />

        {/* Inner right vertical line (near right side) */}
        <div className="frame-line frame-line-v frame-line-v-right-inner" />

        {/* Outer right vertical line (near right edge) */}
        <div className="frame-line frame-line-v frame-line-v-right-outer" />

        {/* Bottom horizontal line */}
        <div className="frame-line frame-line-h frame-line-h-bottom" />
      </div>

      {/* Central wordmark */}
      <div className="frame-center" aria-hidden="true">
        <span className="frame-wordmark">KARTHIK</span>
      </div>
    </div>
  )
})

export default Preloader
