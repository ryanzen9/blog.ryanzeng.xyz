"use client";
import FuzzyText from "@/components/FuzzyText";

export default function NotFound() {
  return (
    <section>
      {/* <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
          404
        </FuzzyText>
      </h1> */}

      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
        className="mb-8 text-2xl font-semibold tracking-tighter w-fit mx-auto"
      >
        404
      </FuzzyText>

      <p className="mb-4">Page Not Found</p>
    </section>
  );
}
