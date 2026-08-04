"use client"

import React, { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const shouldReduceMotion = useReducedMotion()
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  )

  useEffect(() => {
    if (shouldReduceMotion) {
      setMeteorStyles([])
      return
    }

    const createStyles = () => {
      const styles = [...new Array(number)].map(() => ({
        "--angle": -angle + "deg",
        top: "-5%",
        left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
        animationDelay:
          Math.random() * (maxDelay - minDelay) + minDelay + "s",
        animationDuration:
          Math.floor(
            Math.random() * (maxDuration - minDuration) + minDuration
          ) + "s",
      }))
      setMeteorStyles(styles)
    }

    let resizeFrame: number | undefined
    const handleResize = () => {
      if (resizeFrame !== undefined) cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(createStyles)
    }

    createStyles()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeFrame !== undefined) cancelAnimationFrame(resizeFrame)
    }
  }, [
    number,
    minDelay,
    maxDelay,
    minDuration,
    maxDuration,
    angle,
    shouldReduceMotion,
  ])

  if (shouldReduceMotion) return null

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          aria-hidden="true"
          className={cn(
            "animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10] motion-reduce:hidden",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent" />
        </span>
      ))}
    </>
  )
}
