import { useMemo, useState } from 'react';
import { useMode } from '../context/ModeContext';
import { AnimatePresence, motion } from 'motion/react';
import { Award, Star, Trophy, X } from 'lucide-react';
import developerCertificationsData from '../data/developer-certifications.json';
import editorCertificationsData from '../data/editor-certifications.json';

interface Certification {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  highlight: string;
  focus: string;
  url: string;
}

const developerCertifications = developerCertificationsData as Certification[];
const editorCertifications = editorCertificationsData as Certification[];

export const AchievementsSection = () => {
  const { mode, theme } = useMode();
  const [selectedCertificationId, setSelectedCertificationId] = useState<string | null>(null);

  const certifications = useMemo(
    () => (mode === 'developer' ? developerCertifications : editorCertifications),
    [mode]
  );

  const selectedCertification = useMemo(
    () => certifications.find((item) => item.id === selectedCertificationId) ?? null,
    [certifications, selectedCertificationId]
  );

  return (
    <section id="achievements" className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8">
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background:
            theme === 'dark'
              ? mode === 'developer'
                ? 'linear-gradient(180deg, #030712 0%, #082f49 100%)'
                : 'linear-gradient(180deg, #0b0b10 0%, #431407 100%)'
              : mode === 'developer'
                ? 'linear-gradient(180deg, #f8fafc 0%, #ecfeff 100%)'
                : 'linear-gradient(180deg, #ffffff 0%, #fff7ed 100%)',
        }}
        transition={{ duration: 0.55 }}
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <motion.span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            animate={{ color: mode === 'developer' ? '#06b6d4' : '#f97316' }}
          >
            Certifications
          </motion.span>
          <h2 className="mt-4 text-balance text-4xl font-semibold text-slate-950 dark:text-slate-100 md:text-5xl">
            {mode === 'developer' ? 'Technical Certifications' : 'Creative Certifications'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Curated credentials and recognitions specific to each discipline.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((certification, idx) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              mode={mode}
              delay={idx * 0.08}
              onClick={() => setSelectedCertificationId(certification.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCertification && (
          <CertificationModal
            certification={selectedCertification}
            mode={mode}
            onClose={() => setSelectedCertificationId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

interface CertificationCardProps {
  certification: Certification;
  mode: 'developer' | 'editor';
  delay: number;
  onClick: () => void;
}

const CertificationCard = ({ certification, mode, delay, onClick }: CertificationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative h-full rounded-2xl border border-slate-300/80 bg-white/75 p-6 text-left shadow-sm backdrop-blur-sm transition-colors dark:border-slate-700 dark:bg-slate-900/65"
      style={{
        borderColor:
          mode === 'developer'
            ? isHovered
              ? 'rgba(6, 182, 212, 0.65)'
              : 'rgba(6, 182, 212, 0.35)'
            : isHovered
              ? 'rgba(249, 115, 22, 0.65)'
              : 'rgba(249, 115, 22, 0.35)',
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className="rounded-xl p-3"
          style={{
            background:
              mode === 'developer'
                ? 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(59,130,246,0.22))'
                : 'linear-gradient(135deg, rgba(249,115,22,0.18), rgba(251,113,133,0.22))',
          }}
        >
          {mode === 'developer' ? (
            <Award className="h-5 w-5 text-cyan-600" />
          ) : (
            <Trophy className="h-5 w-5 text-orange-500" />
          )}
        </div>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{certification.year}</span>
      </div>

      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{certification.title}</h3>
      <p className="mt-1 text-sm font-medium" style={{ color: mode === 'developer' ? '#06b6d4' : '#f97316' }}>
        {certification.category}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{certification.description}</p>

      <motion.div
        className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300"
        animate={{ opacity: isHovered ? 1 : 0.6 }}
      >
        <Star className="h-4 w-4" style={{ color: mode === 'developer' ? '#06b6d4' : '#f97316' }} />
        Click to view details
      </motion.div>
    </motion.button>
  );
};

interface CertificationModalProps {
  certification: Certification;
  mode: 'developer' | 'editor';
  onClose: () => void;
}

const CertificationModal = ({ certification, mode, onClose }: CertificationModalProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl rounded-2xl border border-slate-300/80 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-950"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
            animate={{
              background:
                mode === 'developer'
                  ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
                  : 'linear-gradient(135deg, #f97316 0%, #fb7185 100%)',
            }}
          >
            <Award className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">{certification.year}</span>
          </motion.div>

          <h2 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">{certification.title}</h2>
          <p className="mt-1 text-lg text-slate-600 dark:text-slate-300">{certification.category}</p>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">Overview</h3>
            <p className="text-slate-600 dark:text-slate-300">{certification.description}</p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">Key Highlight</h3>
            <p className="text-slate-600 dark:text-slate-300">{certification.highlight}</p>
          </div>

          <div>
            <motion.h3
              className="mb-1 font-semibold"
              animate={{ color: mode === 'developer' ? '#06b6d4' : '#f97316' }}
            >
              {mode === 'developer' ? 'Technical Focus' : 'Creative Focus'}
            </motion.h3>
            <p className="text-slate-600 dark:text-slate-300">{certification.focus}</p>
          </div>

          <div>
            <a
              href={certification.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold hover:underline"
              style={{ color: mode === 'developer' ? '#06b6d4' : '#f97316' }}
            >
              View certificate overview ↗
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
