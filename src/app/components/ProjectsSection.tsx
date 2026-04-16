import { memo, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useMode } from '../context/ModeContext';
import { AnimatePresence, motion } from 'motion/react';
import { Clapperboard, Code2, Database, Film, Globe, Palette, Video, Workflow } from 'lucide-react';
import developerProjectsData from '../data/developer-projects.json';
import editorProjectsData from '../data/editor-projects.json';

interface DeveloperProject {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  stack: string[];
  highlight: string;
  url: string;
}

interface EditorProject {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  tools: string[];
  highlight: string;
  url: string;
}

interface DisplayProject {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  details: string[];
  highlight: string;
  url: string;
}

const developerProjects = developerProjectsData as DeveloperProject[];
const editorProjects = editorProjectsData as EditorProject[];

export const ProjectsSection = () => {
  const { mode } = useMode();

  const modeProjects = useMemo<DisplayProject[]>(() => {
    if (mode === 'developer') {
      return developerProjects.map((project) => ({
        id: project.id,
        title: project.title,
        year: project.year,
        type: project.type,
        description: project.description,
        details: project.stack,
        highlight: project.highlight,
        url: project.url,
      }));
    }

    return editorProjects.map((project) => ({
      id: project.id,
      title: project.title,
      year: project.year,
      type: project.type,
      description: project.description,
      details: project.tools,
      highlight: project.highlight,
      url: project.url,
    }));
  }, [mode]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => modeProjects[0]?.id ?? '');

  useEffect(() => {
    setSelectedProjectId(modeProjects[0]?.id ?? '');
  }, [modeProjects]);

  const selectedProject = useMemo(
    () => modeProjects.find((project) => project.id === selectedProjectId) ?? modeProjects[0],
    [modeProjects, selectedProjectId]
  );

  if (!selectedProject) {
    return null;
  }

  return (
    <section id="projects" className="min-h-screen bg-[var(--portfolio-bg)] px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <motion.span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            animate={{ color: mode === 'developer' ? '#06b6d4' : '#f97316' }}
          >
            {mode === 'developer' ? 'Systems Built' : 'Stories Told'}
          </motion.span>
          <h2 className="mt-4 text-balance text-4xl font-semibold text-slate-950 dark:text-slate-100 md:text-5xl">Featured Work</h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="relative">
            <div className="h-[520px] overflow-y-auto pr-2">
              <div className="space-y-3 py-3">
                {modeProjects.map((project, idx) => (
                  <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.3 }}
                onClick={() => setSelectedProjectId(project.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    setSelectedProjectId(project.id);
                  }
                }}
                role="button"
                tabIndex={0}
                className={`min-h-[118px] w-full rounded-xl border p-4 text-left transition-colors ${
                  selectedProject.id === project.id
                    ? mode === 'developer'
                      ? 'border-cyan-500/60 bg-cyan-50/70 dark:bg-cyan-950/25'
                      : 'border-orange-500/60 bg-orange-50/70 dark:bg-orange-950/25'
                    : 'border-slate-300/80 bg-white/65 hover:border-slate-500 dark:border-slate-700 dark:bg-slate-900/55 dark:hover:border-slate-400'
                } cursor-pointer`}
              >
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{project.year}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{project.type}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="mt-3 inline-flex items-center text-xs font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
                  style={{ color: mode === 'developer' ? '#0e7490' : '#c2410c' }}
                >
                  Open project ↗
                </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[var(--portfolio-bg)] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--portfolio-bg)] to-transparent" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${mode}-${selectedProject.id}`}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.26 }}
            >
              {mode === 'developer' ? (
                <DeveloperPreview project={selectedProject} />
              ) : (
                <EditorPreview project={selectedProject} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

interface ProjectPreviewProps {
  project: DisplayProject;
}

const DeveloperPreview = ({ project }: ProjectPreviewProps) => {
  return (
    <div className="min-h-[520px] rounded-2xl border border-cyan-400/35 bg-gradient-to-br from-cyan-50/90 to-blue-50/90 p-8 shadow-sm dark:border-cyan-700/60 dark:from-cyan-950/30 dark:to-blue-950/20">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-cyan-500 p-3 text-white">
          <Code2 className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-950 dark:text-slate-100">{project.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{project.year}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Problem Solved</h4>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">{project.description}</p>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.details.map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="rounded-full border border-cyan-400/45 bg-white/85 px-3 py-1 text-sm font-medium text-cyan-700 dark:border-cyan-700/60 dark:bg-slate-900/70 dark:text-cyan-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="border-t border-cyan-200/80 pt-5 dark:border-cyan-900/70">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">Key Achievement</h4>
          <p className="font-medium text-slate-700 dark:text-slate-200">{project.highlight}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center text-sm font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
          >
            View project ↗
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-3">
          <SystemBlock icon={<Globe className="h-4 w-4" />} label="Frontend" />
          <SystemBlock icon={<Database className="h-4 w-4" />} label="Backend" />
          <SystemBlock icon={<Workflow className="h-4 w-4" />} label="DevOps" />
        </div>
      </div>
    </div>
  );
};

const EditorPreview = ({ project }: ProjectPreviewProps) => {
  return (
    <div className="min-h-[520px] rounded-2xl border border-orange-400/35 bg-gradient-to-br from-orange-50/95 to-rose-50/90 p-8 shadow-sm dark:border-orange-700/60 dark:from-orange-950/30 dark:to-rose-950/25">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-orange-500 to-rose-500 p-3 text-white">
            <Film className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-slate-950 dark:text-slate-100">{project.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{project.year}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">Creative Vision</h4>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">{project.description}</p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">Tools & Techniques</h4>
            <div className="flex flex-wrap gap-2">
              {project.details.map((tool, idx) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="rounded-full border border-orange-400/45 bg-white/85 px-3 py-1 text-sm font-medium text-orange-700 dark:border-orange-700/60 dark:bg-slate-900/70 dark:text-orange-300"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="border-t border-orange-200/80 pt-5 dark:border-orange-900/70">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">Impact</h4>
            <p className="font-medium text-slate-700 dark:text-slate-200">{project.highlight}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-sm font-semibold text-orange-700 hover:underline dark:text-orange-300"
            >
              View project ↗
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-3">
            <CreativeBlock icon={<Video className="h-4 w-4" />} label="Editing" />
            <CreativeBlock icon={<Clapperboard className="h-4 w-4" />} label="Direction" />
            <CreativeBlock icon={<Palette className="h-4 w-4" />} label="Color" />
          </div>
        </div>
    </div>
  );
};

const SystemBlock = memo(({ icon, label }: { icon: ReactNode; label: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-cyan-300/80 bg-white/80 p-4 text-center dark:border-cyan-900 dark:bg-slate-900/70">
      <div className="text-cyan-600 dark:text-cyan-300">{icon}</div>
      <span className="text-xs text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
});

const CreativeBlock = memo(({ icon, label }: { icon: ReactNode; label: string }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 rounded-xl border border-orange-300/80 bg-white/80 p-4 text-center dark:border-orange-900 dark:bg-slate-900/70"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-orange-600 dark:text-orange-300">{icon}</div>
      <span className="text-xs text-slate-600 dark:text-slate-300">{label}</span>
    </motion.div>
  );
});
