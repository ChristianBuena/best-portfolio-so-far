import { useEffect, useRef, useState } from 'react';
import { useMode } from '../context/ModeContext';
import { AnimatePresence, motion } from 'motion/react';

export const OverviewSection = () => {
  const { mode, theme } = useMode();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const developerContent = {
    title: 'The Problem-Solving Approach',
    subtitle: 'Systems Thinking',
    points: [
      {
        label: 'Analyze',
        text: 'Break down complex problems into manageable components.',
      },
      {
        label: 'Design',
        text: 'Architect scalable solutions with clean, maintainable code.',
      },
      {
        label: 'Execute',
        text: 'Build robust systems that solve real-world challenges.',
      },
      {
        label: 'Iterate',
        text: 'Continuously improve through testing and practical feedback.',
      },
    ],
  };

  const editorContent = {
    title: 'The Creative Process',
    subtitle: 'Visual Storytelling',
    points: [
      {
        label: 'Envision',
        text: 'Find the story hidden inside raw footage and rough ideas.',
      },
      {
        label: 'Craft',
        text: 'Shape narrative rhythm through pacing, timing, and emotion.',
      },
      {
        label: 'Polish',
        text: 'Refine every cut and transition with purpose and clarity.',
      },
      {
        label: 'Deliver',
        text: 'Publish visual stories that connect with the intended audience.',
      },
    ],
  };

  const content = mode === 'developer' ? developerContent : editorContent;

  return (
    <motion.section
      id="overview"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--portfolio-bg)] px-6 py-24 md:px-8"
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background:
            theme === 'dark'
              ? 'linear-gradient(180deg, rgba(3,7,18,0.85) 0%, rgba(3,7,18,0) 100%)'
              : 'linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(248,250,252,0) 100%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <motion.div className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-slate-300/70 dark:bg-slate-700" />
          <motion.div
            className="absolute left-0 top-0 w-1 origin-top rounded-full"
            animate={{
              background:
                mode === 'developer'
                  ? 'linear-gradient(180deg, #06b6d4 0%, #3b82f6 100%)'
                  : 'linear-gradient(180deg, #f97316 0%, #fb7185 100%)',
              scaleY: inView ? 1 : 0,
            }}
            transition={{ duration: 1.15, ease: 'easeOut' }}
            style={{ height: '100%' }}
          />

          <div className="space-y-12 pl-12">
            <AnimatePresence mode="wait">
              {content.points.map((point, idx) => (
                <motion.div
                  key={`${mode}-${point.label}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
                  transition={{ delay: idx * 0.12, duration: 0.4 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -left-[50px] top-2 h-4 w-4 rounded-full border-4 border-white shadow-sm dark:border-slate-950"
                    animate={{
                      backgroundColor: mode === 'developer' ? '#06b6d4' : '#f97316',
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  <div>
                    <motion.h3
                      className="mb-2 font-semibold"
                      animate={{
                        color: mode === 'developer' ? '#06b6d4' : '#f97316',
                      }}
                    >
                      {point.label}
                    </motion.h3>
                    <p className="text-slate-600 dark:text-slate-300">{point.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 35 }}
          transition={{ duration: 0.65 }}
          className="space-y-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <motion.span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                animate={{
                  color: mode === 'developer' ? '#06b6d4' : '#f97316',
                }}
              >
                {content.subtitle}
              </motion.span>
              <h2 className="mt-4 text-balance text-4xl font-semibold text-slate-950 dark:text-slate-100 md:text-5xl">
                {content.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {mode === 'developer'
                  ? 'I treat software like architecture: clear foundations, practical details, and reliable outcomes. Each decision balances user needs, scalability, and maintainability.'
                  : 'I approach editing as intentional storytelling. Every transition, sound beat, and visual rhythm is designed to create emotional continuity without distracting from the message.'}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-4 pt-6">
            {mode === 'developer' ? (
              <>
                <SkillCard title="React + TypeScript" value="Proficient" mode={mode} />
                <SkillCard title="System Design" value="Proficient" mode={mode} />
                <SkillCard title="Node.js + APIs" value="Proficient" mode={mode} />
                <SkillCard title="Python" value="Proficient" mode={mode} />
              </>
            ) : (
              <>
                <SkillCard title="Capcut Pro" value="Advanced" mode={mode} />
                <SkillCard title="Canva" value="Advanced" mode={mode} />
                <SkillCard title="DaVinci Resolve" value="Proficient" mode={mode} />
                <SkillCard title="Film Making" value="Advanced" mode={mode} />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

interface SkillCardProps {
  title: string;
  value: string;
  mode: 'developer' | 'editor';
}

const SkillCard = ({ title, value, mode }: SkillCardProps) => {
  return (
    <motion.div
      className="rounded-xl border border-slate-300/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60"
      animate={{
        borderColor: mode === 'developer' ? 'rgba(6, 182, 212, 0.55)' : 'rgba(249, 115, 22, 0.55)',
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-sm text-slate-600 dark:text-slate-300">{title}</div>
      <motion.div
        className="mt-1 font-semibold"
        animate={{
          color: mode === 'developer' ? '#06b6d4' : '#f97316',
        }}
      >
        {value}
      </motion.div>
    </motion.div>
  );
};
