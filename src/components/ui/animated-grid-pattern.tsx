"use client";

import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimatedGridPatternProps
  extends ComponentPropsWithoutRef<"svg"> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number | string;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

interface Square {
  id: number;
  pos: [number, number];
  key: number; // Force re-animation by changing key
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Square[]>([]);

  // Generate random position based on current dimensions
  const getPos = useCallback(
    (containerWidth: number, containerHeight: number): [number, number] => {
      return [
        Math.floor((Math.random() * containerWidth) / width),
        Math.floor((Math.random() * containerHeight) / height),
      ];
    },
    [width, height]
  );

  // Generate array of squares with random positions
  const generateSquares = useCallback(
    (count: number): Square[] => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(dimensions.width, dimensions.height),
        key: 0,
      }));
    },
    [dimensions.width, dimensions.height, getPos]
  );

  // Update a single square's position and trigger re-animation
  const updateSquarePosition = useCallback(
    (squareId: number) => {
      setSquares((currentSquares) =>
        currentSquares.map((sq) =>
          sq.id === squareId
            ? {
                ...sq,
                pos: getPos(dimensions.width, dimensions.height),
                key: sq.key + 1, // Increment key to force re-animation
              }
            : sq
        )
      );
    },
    [dimensions.width, dimensions.height, getPos]
  );

  // Initialize squares when dimensions are available
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions.width, dimensions.height, numSquares, generateSquares]);

  // Resize observer to track container dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [posX, posY], id: squareId, key: animKey }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatDelay,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateSquarePosition(squareId)}
            key={`${squareId}-${animKey}`}
            width={width - 1}
            height={height - 1}
            x={posX * width + 1}
            y={posY * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}