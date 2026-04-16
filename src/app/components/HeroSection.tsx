import { useEffect, useMemo } from 'react';
import { useMode } from '../context/ModeContext';
import { AnimatePresence, motion } from 'motion/react';

const DEVELOPER_PROFILE_IMAGE = '/developer-profile.svg';
const EDITOR_PROFILE_IMAGE = '/video-editor-profile.svg';
const PROFILE_MASK_STYLE = {
  WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)',
  maskImage: 'linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)',
};

export const HeroSection = () => {
  const { mode, theme } = useMode();

  const modeTagline = mode === 'developer' ? 'Developer Lens' : 'Editor Lens';
  const modeLabel = mode === 'developer' ? 'Problem Solver' : 'Visual Storyteller';

  const intro =
    mode === 'developer'
      ? 'I design and build products that are fast, stable, and clear for real users.'
      : 'I craft rhythm, pacing, and emotional flow so stories land with clarity.';

  const accent = mode === 'developer' ? '#06b6d4' : '#f97316';
  const desktopHeroBackground = theme === 'dark' ? '/background-dark.png' : '/background-light.png';
  const mobileHeroBackground = theme === 'dark' ? '/portrait-background-dark.jpeg' : '/portrait-background-light.jpeg';
  const lightModeTextShadow =
    theme === 'light' ? '0 1px 2px rgba(255,255,255,0.9), 0 6px 20px rgba(15,23,42,0.24)' : undefined;

  const overlayGradient = useMemo(() => {
    if (theme === 'dark') {
      return mode === 'developer'
        ? 'linear-gradient(110deg, rgba(2, 6, 23, 0.72) 0%, rgba(8, 47, 73, 0.52) 45%, rgba(2, 6, 23, 0.72) 100%)'
        : 'linear-gradient(110deg, rgba(9, 9, 11, 0.68) 0%, rgba(67, 20, 7, 0.5) 45%, rgba(9, 9, 11, 0.68) 100%)';
    }

    return mode === 'developer'
      ? 'linear-gradient(110deg, rgba(248, 250, 252, 0.68) 0%, rgba(236, 254, 255, 0.5) 45%, rgba(248, 250, 252, 0.7) 100%)'
      : 'linear-gradient(110deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 247, 237, 0.52) 45%, rgba(255, 255, 255, 0.72) 100%)';
  }, [mode, theme]);

  useEffect(() => {
    [DEVELOPER_PROFILE_IMAGE, EDITOR_PROFILE_IMAGE].forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  return (
    <section id="home" className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:px-8">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`hero-bg-mobile-${mobileHeroBackground}`}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: `url(${mobileHeroBackground})` }}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.25 }}
          transition={{ duration: 0.35 }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`hero-bg-desktop-${desktopHeroBackground}`}
          className="absolute inset-0 z-0 hidden bg-cover bg-center bg-no-repeat md:block"
          style={{ backgroundImage: `url(${desktopHeroBackground})` }}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.25 }}
          transition={{ duration: 0.35 }}
        />
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 z-10"
        animate={{ background: overlayGradient }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-20 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="space-y-7"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`hero-copy-${mode}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.34, ease: 'easeInOut' }}
              className="space-y-7"
            >
              <motion.span
                className="inline-flex rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em]"
                animate={{ color: accent, borderColor: `${accent}55` }}
                transition={{ duration: 0.4 }}
                style={{ textShadow: lightModeTextShadow }}
              >
                {modeTagline}
              </motion.span>

              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300" style={{ textShadow: lightModeTextShadow }}>
                  Christian Buena
                </p>
                <h1 className="text-balance text-5xl font-semibold leading-tight text-slate-950 dark:text-slate-100 md:text-7xl" style={{ textShadow: lightModeTextShadow }}>
                  Building and editing with intention.
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl" style={{ textShadow: lightModeTextShadow }}>
                  {intro}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <motion.a
                  href="#projects"
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15"
                  style={{ background: `linear-gradient(135deg, ${accent} 0%, ${mode === 'developer' ? '#2563eb' : '#fb7185'} 100%)` }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Work
                </motion.a>
                <motion.a
                  href="#contact"
                  className="rounded-xl border border-slate-300 bg-white/65 px-6 py-3 text-sm font-semibold text-slate-700 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/45 dark:text-slate-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Christian
                </motion.a>
              </div>

              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/60 px-3 py-1 text-xs text-slate-600 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/45 dark:text-slate-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.3 }}
                style={{ textShadow: lightModeTextShadow }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                {modeLabel}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-slate-300/70 bg-white/65 p-4 shadow-2xl shadow-slate-900/15 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/55"
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              background:
                mode === 'developer'
                  ? 'radial-gradient(circle at 18% 20%, rgba(6, 182, 212, 0.22), transparent 40%)'
                  : 'radial-gradient(circle at 18% 20%, rgba(249, 115, 22, 0.22), transparent 40%)',
            }}
            transition={{ duration: 0.45 }}
          />

          <div className="relative z-10">
            <div className="relative h-[480px] w-full overflow-hidden rounded-2xl">
              <motion.img
                src={DEVELOPER_PROFILE_IMAGE}
                alt="Christian Buena developer profile"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
                initial={false}
                animate={{
                  opacity: mode === 'developer' ? 1 : 0,
                  filter: mode === 'developer' ? 'blur(0px)' : 'blur(8px)',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={PROFILE_MASK_STYLE}
                aria-hidden={mode !== 'developer'}
              />

              <motion.img
                src={EDITOR_PROFILE_IMAGE}
                alt="Christian Buena video editor profile"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
                initial={false}
                animate={{
                  opacity: mode === 'editor' ? 1 : 0,
                  filter: mode === 'editor' ? 'blur(0px)' : 'blur(8px)',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={PROFILE_MASK_STYLE}
                aria-hidden={mode !== 'editor'}
              />

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`hero-profile-overlay-${mode}`}
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.28, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.52, ease: 'easeInOut' }}
                  style={{
                    background:
                      mode === 'developer'
                        ? 'linear-gradient(125deg, rgba(6,182,212,0.28) 0%, rgba(37,99,235,0.14) 55%, rgba(2,6,23,0) 100%)'
                        : 'linear-gradient(125deg, rgba(249,115,22,0.28) 0%, rgba(251,113,133,0.14) 55%, rgba(9,9,11,0) 100%)',
                  }}
                />
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.figcaption
                key={`hero-caption-${mode}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
                className="mt-4 flex items-center justify-between rounded-2xl border border-slate-300/80 bg-white/70 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
              >
                <span>{mode === 'developer' ? 'Shipping reliable systems' : 'Shaping compelling narratives'}</span>
                <span className="font-semibold" style={{ color: accent }}>
                  Christian Buena
                </span>
              </motion.figcaption>
            </AnimatePresence>
          </div>
        </motion.figure>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32"
        style={{
          background:
            theme === 'dark'
              ? 'linear-gradient(180deg, rgba(3,7,18,0) 0%, rgba(3,7,18,1) 100%)'
              : 'linear-gradient(180deg, rgba(248,250,252,0) 0%, rgba(248,250,252,1) 100%)',
        }}
      />
    </section>
  );
};
