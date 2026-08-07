"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile, experience, education, projects } from "@/lib/data";
import { useRef, useState, useEffect } from "react";
import MarqueeAlongSvgPath from "@/components/MarqueeAlongSvgPath";
import KineticGrid from "@/components/KineticGrid";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import BackgroundGrid from "@/components/BackgroundGrid";
import WaveRibbon from "@/components/WaveRibbon";
import { 
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, 
  SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, SiGithub, 
  SiPytorch, SiTensorflow, SiDocker
} from "react-icons/si";
import { FaAws, FaRobot } from "react-icons/fa";

const skillItems = [
  { name: "Python", Icon: SiPython },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express.js", Icon: SiExpress },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "GitHub", Icon: SiGithub },
  { name: "PyTorch", Icon: SiPytorch },
  { name: "TensorFlow", Icon: SiTensorflow },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
  { name: "OpenAI", Icon: FaRobot },
];

/* ─── Reusable scroll-reveal wrapper ─── */
function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directionMap = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 80, y: 0 },
    right: { x: -80, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: directionMap[direction].y,
        x: directionMap[direction].x,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y: directionMap[direction].y, x: directionMap[direction].x }
      }
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scroll-linked 3D Card Reveal wrapper ─── */
function CardReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.4]);
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [10, 0, 0, -10]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, rotateX, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Text line reveal (clips overflow) ─── */
function TextLineReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "110%", rotate: 3 }}
        animate={isInView ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 3 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Infinite Marquee ─── */
function InfiniteMarquee({
  items,
  speed = 25,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap group/marquee">
      <div
        className="inline-flex items-center group-hover/marquee:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "marqueeReverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="inline-flex items-center flex-shrink-0">
            <span
              className="font-display text-[8vw] md:text-[6vw] font-bold uppercase tracking-tight mx-4 transition-all duration-300 cursor-default"
              style={{
                WebkitTextStroke: "1.5px #000",
                WebkitTextFillColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.webkitTextFillColor = "#000";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.webkitTextFillColor = "transparent";
              }}
            >
              {item}
            </span>
            <span className="w-12 md:w-16 h-2 bg-[#e8927c] rounded-full mx-4 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: footerScrollY } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const footerPathLength = useTransform(footerScrollY, [0.15, 0.95], [0, 1]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  /* Parallax transforms */
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const picScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.15]);
  const picY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  /* Stagger container for initial load */
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const textReveal = {
    hidden: { opacity: 0, y: 100, rotate: 2 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main
      ref={containerRef}
      className="relative bg-white text-black font-body overflow-x-hidden selection:bg-black selection:text-white"
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <BackgroundGrid />

      <Navbar />
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center py-20 md:py-0 px-6 md:px-16 lg:px-24">
        <WaveRibbon />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full relative z-10"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isLoading ? "hidden" : "show"}
            className="flex flex-col gap-2"
          >
            <div className="overflow-hidden">
              <motion.p
                variants={textReveal}
                className="font-mono text-sm md:text-base uppercase tracking-widest text-gray-500 mb-4"
              >
                {profile.role}
              </motion.p>
            </div>

            {/* Massive Typography + Profile Pic */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
              <div className="flex-1">
                <div className="overflow-hidden">
                  <motion.h1
                    variants={textReveal}
                    className="font-display text-[14vw] md:text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase"
                  >
                    Shariful
                  </motion.h1>
                </div>
                <div className="overflow-hidden flex items-end gap-4 md:gap-8">
                  <motion.h1
                    variants={textReveal}
                    className="font-display text-[14vw] md:text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase"
                  >
                    Islam
                  </motion.h1>
                  <motion.div
                    variants={fadeUp}
                    className="mb-2 md:mb-6 hidden sm:block"
                  >
                    <a
                      href="#about"
                      data-cursor-hover
                      className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-black flex items-center justify-center relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-black group-hover:text-white relative z-10 transition-colors duration-500" />
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Profile Picture */}
              <motion.div
                variants={fadeUp}
                style={{ scale: picScale, y: picY }}
                className="relative w-36 h-36 xs:w-40 xs:h-40 md:w-56 md:h-56 flex-shrink-0 self-end md:self-auto mb-2"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-black group">
                  <Image
                    src="/images/MyPic.jpg"
                    alt="MD Shariful Islam"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                {/* Decorative corner marks */}
                <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-black" />
                <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-black" />
                <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-black" />
                <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-black" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-6 md:left-16 flex flex-col items-center gap-4"
        >
          <span
            className="font-mono text-xs uppercase tracking-widest text-neutral-400"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-gray-300 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 w-full h-full bg-black"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════ */}
      <section id="about" className="py-32 md:py-44 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_0.6fr] gap-16 items-center">
          <div>
            <TextLineReveal>
              <h2 className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-12">
                [ 01 ] Intro
              </h2>
            </TextLineReveal>

<ScrollReveal>
  <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-medium tracking-tight">
    I build
    <span className="relative inline-block px-3">
      scalable
      <svg
        className="absolute -inset-x-3 -inset-y-1.5 w-[calc(100%+1.5rem)] h-[calc(100%+0.75rem)] pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 82,15 C 48,12 12,18 7,48 C 2,78 42,90 72,85 C 92,82 90,42 75,20 C 67,10 79,12 87,15"
          stroke="#ff5e3a"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.5,
          }}
        />
      </svg>
    </span>
    backend systems, AI-powered applications, and cloud infrastructure.
  </p>
</ScrollReveal>
<ScrollReveal delay={0.15}>
  <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-medium tracking-tight mt-4 text-gray-400">
    Turning complex ideas into fast, secure, and scalable products.
  </p>
</ScrollReveal>

            <ScrollReveal delay={0.3} className="mt-16 flex items-center gap-6">
              <a
                href={`mailto:${profile.email}`}
                data-cursor-hover
                className="inline-flex items-center gap-2 border-b-2 border-black pb-1 font-mono text-sm uppercase tracking-widest hover:text-gray-500 hover:border-gray-500 transition-colors"
              >
                <Mail size={16} /> Get in Touch
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              >
                <Github size={16} />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              >
                <Linkedin size={16} />
              </a>
            </ScrollReveal>
          </div>

          {/* About Image — larger portrait */}
          <ScrollReveal direction="right" className="hidden md:block">
            <div className="h-85 relative aspect-[3/4] w-full overflow-hidden group">
              <Image
                src="/images/MyPic.jpg"
                alt="MD Shariful Islam portrait"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-black" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROJECTS SECTION
      ═══════════════════════════════════════════ */}
      <section id="work" className="relative bg-[#000000] text-white overflow-hidden">
        <KineticGrid globalColor="monochrome" className="py-32 md:py-44 px-6 md:px-16 lg:px-24 bg-[#000000]">
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <TextLineReveal>
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase">
                Selected <br /> Works
              </h2>
            </TextLineReveal>
            <ScrollReveal direction="left">
              <span className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-2">
                [ 02 ]
              </span>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {projects.map((project, i) => (
              <CardReveal
                key={i}
                className={i % 2 !== 0 ? "md:mt-24" : ""}
              >
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative p-8 md:p-12 bg-white border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[300px] text-black overflow-hidden"
                >
                  {/* Subtle dark spotlight gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    <h3 className="font-display text-3xl mb-4 font-bold text-neutral-900">{project.title}</h3>
                    <p className="font-mono text-sm text-neutral-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-12 flex flex-wrap gap-10">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs border border-neutral-200 px-3 py-1 text-neutral-600 bg-neutral-50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="absolute top-8 right-8 w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-900 hover:bg-neutral-950 hover:text-white transition-all duration-300 shadow-sm"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  )}
                </motion.div>
              </CardReveal>
            ))}
          </div>
        </KineticGrid>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE BANNER — After Projects
      ═══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 border-t border-b border-black/10 overflow-hidden">
<InfiniteMarquee
  items={[
    "Backend Developer",
    "NestJS",
    "TypeScript",
    "Microservices",
    "System Design",
    "Scalable APIs"
  ]}
  speed={30}
/>

<div className="h-4" />

<InfiniteMarquee
  items={[
    "Redis",
    "Kafka",
    "Docker",
    "AWS",
    "MongoDB",
    "MySQL",
    "AI Integration"
  ]}
  speed={25}
  reverse
/>
      </section>

      {/* ═══════════════════════════════════════════
          EXPERIENCE SECTION
      ═══════════════════════════════════════════ */}
      <section id="experience" className="py-32 md:py-44 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto mb-16">
          <TextLineReveal>
            <h2 className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-8">
              [ 03 ] Experience
            </h2>
          </TextLineReveal>

          <div className="flex flex-col">
            {experience.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-black/10 hover:border-black transition-colors duration-300"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-3xl font-medium">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-sm text-gray-500 mt-2">
                      {exp.company} — {exp.description}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:text-right font-mono text-sm uppercase tracking-widest text-black flex-shrink-0">
                    {exp.period}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EDUCATION SECTION
      ═══════════════════════════════════════════ */}
      <section id="education" className="py-32 md:py-44 px-6 md:px-16 lg:px-24 border-t border-black/10">
        <div className="max-w-5xl mx-auto mb-16">
          <TextLineReveal>
            <h2 className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-8">
              [ 04 ] Education
            </h2>
          </TextLineReveal>

          <div className="flex flex-col">
            {education.map((edu, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-black/10 hover:border-black transition-colors duration-300"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-3xl font-medium">
                      {edu.degree}
                    </h3>
                    <p className="font-mono text-sm text-gray-500 mt-2">
                      {edu.school} — {edu.description}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:text-right font-mono text-sm uppercase tracking-widest text-black flex-shrink-0">
                    {edu.period}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SKILLS SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 border-t border-black/10 overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 mb-16">
          <TextLineReveal>
            <h2 className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-8">
              [ 05 ] Skills
            </h2>
          </TextLineReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] max-w-4xl text-black">
              Currently focused on building scalable, high-performance web applications using the MERN stack, React, Next.js, and modern web architectures.
            </p>
          </ScrollReveal>
        </div>

        <div className="w-full h-[240px] relative overflow-hidden flex items-center justify-center">
          <MarqueeAlongSvgPath
            path="M -200 100 C 150 0, 350 200, 600 100 C 850 0, 1050 200, 1400 100"
            viewBox="0 0 1200 200"
            width="120%"
            height={200}
            baseVelocity={1.5}
            slowdownOnHover={true}
            slowDownFactor={0.2}
            repeat={4}
            responsive={true}
            gap={12}
            className="w-[120%] h-full max-w-none flex items-center justify-center"
          >
            {skillItems.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300/40 rounded-full text-neutral-600 hover:text-black transition-all duration-300 shadow-sm cursor-default"
              >
                <skill.Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-mono text-xs md:text-sm font-semibold tracking-wide">
                  {skill.name}
                </span>
              </div>
            ))}
          </MarqueeAlongSvgPath>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer ref={footerRef} id="contact" className="relative bg-[#000000] text-white overflow-hidden">
        <KineticGrid globalColor="monochrome" className="min-h-screen flex flex-col justify-between py-16 px-6 md:px-16 lg:px-24 bg-[#000000]">
          <div className="flex justify-between items-start w-full">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              [ CONTACT ]
            </span>
          </div>

          <div className="relative flex-1 flex flex-col justify-center items-center py-12 md:py-20 w-full min-h-[350px]">
            {/* Curvy Orange SVG Line */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex justify-center items-center">
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full max-w-5xl"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 500,580 C 430,460 380,360 480,270 C 580,180 540,100 460,20"
                  stroke="#ff5e3a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: footerPathLength }}
                />
                {/* Decorative floating orange dot */}
                <circle
                  cx="685"
                  cy="510"
                  r="3.5"
                  fill="#ff5e3a"
                />
              </svg>
            </div>

            <h2 className="font-display text-[15vw] md:text-[11vw] font-bold leading-[0.85] tracking-tighter uppercase text-center select-none relative z-10 text-white">
              Let&apos;s <br /> Build.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end w-full z-10 mt-auto pt-8 border-t border-white/5">
            {/* Left Column */}
            <div className="max-w-xs text-neutral-400 font-mono text-xs md:text-sm leading-relaxed">
              Available for freelance work, startup collaborations, and ambitious product ideas.
            </div>

            {/* Center Column */}
            <div className="flex flex-col items-center justify-center">
              <a
                href={`mailto:${profile.email}`}
                data-cursor-hover
                className="font-display text-lg md:text-2xl font-bold tracking-tight hover:text-neutral-300 transition-colors text-white"
              >
                {profile.email}
              </a>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-end gap-1.5 font-display text-sm md:text-base font-bold text-white">
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="hover:text-neutral-300 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="hover:text-neutral-300 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </KineticGrid>
      </footer>
    </main>
  );
}
