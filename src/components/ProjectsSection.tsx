"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = projects.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scales = projects.map((_, index) => {
    const targetScale = 1 - (totalCards - 1 - index) * 0.03;
    return useTransform(
      scrollYProgress,
      [index / totalCards, (index + 1) / totalCards],
      [targetScale, 1]
    );
  });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#0C0C0C] -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
    >
      <div className="pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-14 md:pb-20 text-center">
        <h1
          className="font-['Kanit'] font-black uppercase leading-none mx-auto"
          style={{
            fontSize: "clamp(3rem, 12vw, 160px)",
            background:
              "linear-gradient(180deg, #646973 0%, #BBCCD7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Project
        </h1>
      </div>

      <div
        ref={containerRef}
        className="relative px-4 sm:px-8 md:px-12 lg:px-16 pb-32"
        style={{ height: `${totalCards * 85}vh` }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="sticky"
            style={{
              top: `calc(6rem + ${index * 28}px)`,
              zIndex: totalCards - index,
            }}
          >
            <ProjectCard
              project={project}
              scale={scales[index]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
