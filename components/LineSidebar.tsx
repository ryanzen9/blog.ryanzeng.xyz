import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";

type Falloff = "linear" | "smooth" | "sharp";

export type LineSidebarItem = {
  id: string;
  label: string;
  href: string;
};

export interface LineSidebarProps {
  items: readonly LineSidebarItem[];
  activeIndex?: number | null;
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  onItemClick?: (index: number, item: LineSidebarItem) => void;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (progress: number) => number> = {
  linear: (progress) => progress,
  smooth: (progress) => progress * progress * (3 - 2 * progress),
  sharp: (progress) => progress * progress * progress,
};

const LineSidebar = ({
  items,
  activeIndex = null,
  accentColor = "var(--foreground)",
  textColor = "var(--muted-foreground)",
  markerColor = "var(--border)",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  onItemClick,
  className,
}: LineSidebarProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef<number | null>(activeIndex);
  const smoothingRef = useRef(smoothing);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback((now: number) => {
    const deltaTime = Math.min((now - lastRef.current) / 1000, 0.05);

    lastRef.current = now;

    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const smoothingFactor = 1 - Math.exp(-deltaTime / tau);

    let moving = false;

    for (let index = 0; index < itemRefs.current.length; index += 1) {
      const element = itemRefs.current[index];

      if (!element) {
        continue;
      }

      const pointerTarget = targetsRef.current[index] ?? 0;

      const activeTarget = activeRef.current === index ? 1 : 0;

      const target = Math.max(pointerTarget, activeTarget);

      const current = currentRef.current[index] ?? 0;
      const next = current + (target - current) * smoothingFactor;

      const settled = Math.abs(target - next) < 0.0015;

      const value = settled ? target : next;

      currentRef.current[index] = value;

      element.style.setProperty("--effect", value.toFixed(4));

      if (!settled) {
        moving = true;
      }
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) {
      return;
    }

    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;

      if (!list) {
        return;
      }

      const rect = list.getBoundingClientRect();
      const pointerY = event.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;

      for (let index = 0; index < itemRefs.current.length; index += 1) {
        const element = itemRefs.current[index];

        if (!element) {
          continue;
        }

        const center = element.offsetTop + element.offsetHeight / 2;

        const distance = Math.abs(pointerY - center);

        const progress = Math.max(0, 1 - distance / proximityRadius);

        targetsRef.current[index] = ease(progress);
      }

      startLoop();
    },
    [falloff, proximityRadius, startLoop],
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = itemRefs.current.map(() => 0);

    startLoop();
  }, [startLoop]);

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = null;
  }, []);

  useEffect(() => {
    return stopLoop;
  }, [stopLoop]);

  const tickClass = showMarker
    ? cn(
        "after:absolute",
        "after:left-[calc(-1*var(--marker-length)-var(--marker-gap))]",
        "after:top-[calc(100%+var(--item-gap)/2)]",
        "after:h-px after:opacity-50",
        "after:content-['']",
        "last:after:content-none",
        "after:[background-color:var(--marker-color)]",
        "after:[width:calc(var(--marker-length)*var(--tick-scale))]",
        scaleTick
          ? "after:origin-left after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]"
          : "after:-translate-y-1/2",
      )
    : undefined;

  return (
    <div
      className={cn(
        "relative flex justify-start",
        showMarker &&
          "[padding-left:calc(var(--marker-length)+var(--marker-gap))]",
        className,
      )}
      style={
        {
          "--accent-color": accentColor,
          "--text-color": textColor,
          "--marker-color": markerColor,
          "--marker-length": `${markerLength}px`,
          "--marker-gap": `${markerGap}px`,
          "--tick-scale": tickScale,
          "--max-shift": `${maxShift}px`,
          "--item-gap": `${itemGap}px`,
          "--font-size": `${fontSize}rem`,
        } as CSSProperties
      }
    >
      <ul
        ref={listRef}
        className="m-0 flex list-none flex-col py-4 [gap:var(--item-gap)]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <li
              key={item.id}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              className={cn("relative", tickClass)}
            >
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative block rounded-sm",
                  "before:absolute before:-inset-x-12 before:-inset-y-[6px] before:content-['']",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
                onClick={() => {
                  onItemClick?.(index, item);
                }}
              >
                {showMarker && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[calc(-1*var(--marker-length)-var(--marker-gap))] top-1/2 h-px w-[length:var(--marker-length)] origin-left [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]"
                  />
                )}

                <span className="relative inline-flex items-baseline leading-[1.2] [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] [font-size:var(--font-size)] [transform:translateX(calc(var(--effect,0)*var(--max-shift)))]">
                  {showIndex && (
                    <span className="mr-[0.6rem] font-mono text-[0.85em] [opacity:calc(0.55+var(--effect,0)*0.45)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}

                  <span>{item.label}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LineSidebar;
