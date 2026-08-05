"use client";
import FuzzyText from "@/components/FuzzyText";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-full text-center">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
        className="mb-8 text-2xl font-semibold tracking-tighter w-fit mx-auto"
      >
        404
      </FuzzyText>

      <p className="mb-4 font-mono">Page Not Found</p>
    </section>
  );
}
