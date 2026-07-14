import { motion } from "framer-motion";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  scale: number;
}

export default function ProjectCard({ project, scale }: ProjectCardProps) {
  return (
    <motion.div
      style={{ scale }}
      className="bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 will-change-transform"
    >
      <div className="flex flex-col gap-6">
        {/* TOP ROW */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
            <span
              className="font-['Kanit'] font-black leading-none text-[#D7E2EA]"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 5rem)",
              }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA]/60 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
                {project.category}
              </span>
              <span
                className="font-['Kanit'] font-bold text-[#D7E2EA] leading-tight mt-1"
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.75rem)",
                }}
              >
                {project.title}
              </span>
            </div>
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] text-sm sm:text-base font-medium transition-all duration-300 hover:bg-[rgba(215,226,234,0.1)]"
          >
            Live Project
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="sm:w-[18px] sm:h-[18px]"
            >
              <path
                d="M3.333 12.667L12.667 3.333M12.667 3.333H5.333M12.667 3.333V10.667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* BOTTOM GRID */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">
          {/* LEFT COLUMN — 40% */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full sm:w-[40%]">
            <img
              src={project.images.leftTop}
              alt={`${project.title} top`}
              loading="lazy"
              className="w-full object-cover rounded-[40px] transition-transform duration-500 hover:scale-[1.02]"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            <img
              src={project.images.leftBottom}
              alt={`${project.title} bottom`}
              loading="lazy"
              className="w-full object-cover rounded-[40px] transition-transform duration-500 hover:scale-[1.02]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>

          {/* RIGHT COLUMN — 60% */}
          <div className="w-full sm:w-[60%]">
            <img
              src={project.images.rightTall}
              alt={`${project.title} full`}
              loading="lazy"
              className="w-full h-full object-cover rounded-[40px] transition-transform duration-500 hover:scale-[1.02]"
              style={{
                minHeight: "clamp(300px, 38vw, 580px)",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
