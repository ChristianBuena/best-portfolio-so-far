import { useMode } from '../context/ModeContext';
import { motion } from 'motion/react';

export const Footer = () => {
  const { mode } = useMode();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-300/80 px-6 py-8 dark:border-slate-700 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <motion.p
          className="text-sm text-slate-600 dark:text-slate-300"
          animate={{
            color: mode === 'developer' ? '#06b6d4' : '#f97316',
          }}
        >
          © {currentYear} Christian Buena. Designed and built with intention.
        </motion.p>

        <div className="flex items-center gap-6">
          <a
            href="#home"
            className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Back to Top
          </a>
          <a
            href="#contact"
            className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Contact
          </a>
          <motion.span
            className="text-sm font-medium"
            animate={{
              color: mode === 'developer' ? '#06b6d4' : '#f97316',
            }}
          >
            {mode === 'developer' ? '{ code }' : '[ edit ]'}
          </motion.span>
        </div>
      </div>
    </footer>
  );
};
