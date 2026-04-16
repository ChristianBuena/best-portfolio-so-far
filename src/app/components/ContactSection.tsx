import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMode } from '../context/ModeContext';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

export const ContactSection = () => {
  const { mode, theme } = useMode();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const timeoutRef = useRef<number | null>(null);
  const contactApiBaseUrl = import.meta.env.VITE_CONTACT_API_BASE_URL?.trim();
  const contactEndpoint = contactApiBaseUrl
    ? `${contactApiBaseUrl.replace(/\/$/, '')}/api/contact`
    : '/api/contact';

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setSubmitStatus('idle');
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message ?? 'Unable to send your message right now. Please try again shortly.');
      }

      setSubmitStatus('success');

      timeoutRef.current = window.setTimeout(() => {
        setSubmitStatus('idle');
        setFormState({ name: '', email: '', message: '' });
      }, 2500);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accent = mode === 'developer' ? '#06b6d4' : '#f97316';

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden px-6 py-24 md:px-8">
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background:
            theme === 'dark'
              ? mode === 'developer'
                ? 'linear-gradient(180deg, #020617 0%, #082f49 100%)'
                : 'linear-gradient(180deg, #09090b 0%, #431407 100%)'
              : mode === 'developer'
                ? 'linear-gradient(180deg, #f8fafc 0%, #ecfeff 100%)'
                : 'linear-gradient(180deg, #ffffff 0%, #fff7ed 100%)',
        }}
        transition={{ duration: 0.55 }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-8"
        >
          <div>
            <motion.span
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              animate={{ color: accent }}
            >
              Get In Touch
            </motion.span>
            <h2 className="mt-4 text-balance text-4xl font-semibold text-slate-950 dark:text-slate-100 md:text-5xl">Let&apos;s Work Together</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {mode === 'developer'
                ? 'Have a product idea or system challenge? Let us build something reliable and practical.'
                : 'Have a story to tell? Let us shape a visual narrative that feels precise and memorable.'}
            </p>
          </div>

          <div className="space-y-3">
            <ContactLink icon={<Mail className="h-4 w-4" />} label="Email" value="cmkbuena@gmail.com" href="mailto:cmkbuena@gmail.com" mode={mode} />
            <ContactLink icon={<Github className="h-4 w-4" />} label="GitHub" value="@christianbuena" href="https://github.com/ChristianBuena" mode={mode} />
            <ContactLink icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="Christian Buena" href="https://www.linkedin.com/in/mrtnztan/" mode={mode} />
          </div>

          <motion.div
            className="inline-flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium"
            animate={{
              borderColor: mode === 'developer' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(249, 115, 22, 0.5)',
              backgroundColor:
                mode === 'developer' ? 'rgba(236, 254, 255, 0.55)' : 'rgba(255, 237, 213, 0.55)',
            }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Available for new projects and collaborations
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-slate-300/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/65"
          >
            <FormField
              id="name"
              label="Name"
              value={formState.name}
              onChange={(value) => setFormState((current) => ({ ...current, name: value }))}
              accent={accent}
              disabled={isSubmitting}
            />
            <FormField
              id="email"
              label="Email"
              value={formState.email}
              onChange={(value) => setFormState((current) => ({ ...current, email: value }))}
              accent={accent}
              type="email"
              disabled={isSubmitting}
            />
            <FormField
              id="message"
              label="Message"
              value={formState.message}
              onChange={(value) => setFormState((current) => ({ ...current, message: value }))}
              accent={accent}
              isTextarea
              disabled={isSubmitting}
            />

            <motion.button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10"
              style={{ background: `linear-gradient(135deg, ${accent} 0%, ${mode === 'developer' ? '#2563eb' : '#fb7185'} 100%)` }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent' : 'Send Message'}
              {!isSubmitting && submitStatus !== 'success' && <Send className="h-4 w-4" />}
            </motion.button>

            {submitStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/35 dark:text-rose-200"
              >
                {submitError}
              </motion.p>
            )}
          </form>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex items-center justify-center rounded-2xl border border-slate-300/80 bg-white/95 p-6 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/90"
            >
              <div>
                <div className="mb-3 text-3xl">✓</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Thank you</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Your message was sent successfully.</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

interface ContactLinkProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  mode: 'developer' | 'editor';
}

const ContactLink = ({ icon, label, value, href, mode }: ContactLinkProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-slate-300 dark:hover:border-slate-600"
      whileHover={{ x: 4 }}
    >
      <div
        className="rounded-lg p-2"
        style={{
          backgroundColor: mode === 'developer' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(249, 115, 22, 0.15)',
          color: mode === 'developer' ? '#06b6d4' : '#f97316',
        }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
        <div className="font-medium text-slate-800 dark:text-slate-100">{value}</div>
      </div>
      <span className="opacity-0 transition-opacity group-hover:opacity-100" style={{ color: mode === 'developer' ? '#06b6d4' : '#f97316' }}>
        →
      </span>
    </motion.a>
  );
};

interface FormFieldProps {
  id: 'name' | 'email' | 'message';
  label: string;
  value: string;
  onChange: (value: string) => void;
  accent: string;
  type?: 'text' | 'email';
  isTextarea?: boolean;
  disabled?: boolean;
}

const FormField = ({ id, label, value, onChange, accent, type = 'text', isTextarea = false, disabled = false }: FormFieldProps) => {
  const sharedClassName =
    'w-full rounded-xl border border-slate-300 bg-white/85 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-current disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-950/75 dark:text-slate-100';

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          required
          disabled={disabled}
          className={`${sharedClassName} resize-none`}
          style={{ borderColor: value ? accent : undefined }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          disabled={disabled}
          className={sharedClassName}
          style={{ borderColor: value ? accent : undefined }}
        />
      )}
    </div>
  );
};
