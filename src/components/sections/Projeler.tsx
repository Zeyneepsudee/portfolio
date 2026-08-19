import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, ExternalLink, ChevronDown, ChevronUp, Terminal } from 'lucide-react'
import { useProjects } from '../../hooks/useProjects'
import ScrollSection from '../ui/ScrollSection'

const allSkills = [
  'Vue 3', 'React', 'TypeScript', 'Flutter', 'Dart', 'Laravel', 'Django', 'Python', 'PostgreSQL', 'Git', 'TailwindCSS', 'REST API'
]

function GithubIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}



const INITIAL_COUNT = 3

function Projeler() {
  const { projects } = useProjects()
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT)
  const hasMore = projects.length > INITIAL_COUNT

  return (
    <ScrollSection id="projeler" className="scroll-mt-28 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="pixel-chip inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold">
          <Cpu className="h-3.5 w-3.5 text-blush-600" />
          <span>Çalışmalarım</span>
        </span>
        <h3 className="mt-4 font-display text-4xl text-ink-900 sm:text-5xl">
          Projelerim
        </h3>
      </motion.div>

      {/* Project Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % INITIAL_COUNT) * 0.1 }}
              layout
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="pixel-window flex flex-col justify-between"
            >
              <div className="pixel-window-header">
                <div className="window-dots">
                  <span className="window-dot window-dot-red"></span>
                  <span className="window-dot window-dot-yellow"></span>
                  <span className="window-dot window-dot-green"></span>
                </div>
                <span className="font-display text-[9px] text-ink-900 truncate max-w-[120px]">{p.title}</span>
                <span className="pixel-chip rounded px-2 py-0.5 text-[10px]">{p.category}</span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h4 className="font-display text-sm leading-snug text-ink-900">{p.title}</h4>

                <p className="mt-3 flex-1 text-xs leading-relaxed text-ink-700">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t-2 border-dashed border-ink-900/20 pt-4">
                  {p.technologies.map((t) => (
                    <span key={t} className="pixel-chip rounded px-2.5 py-0.5 text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="pixel-btn flex items-center gap-1.5 bg-white px-2.5 py-1 text-[11px] text-ink-900 hover:bg-blush-100">
                      <GithubIcon className="h-3 w-3" /> GitHub
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="pixel-btn flex items-center gap-1.5 bg-blush-500 px-2.5 py-1 text-[11px] text-white hover:bg-blush-600">
                      Canlı <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Tümünü Gör / Daralt Butonu */}
      {hasMore && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowAll(!showAll)}
            className="pixel-btn flex items-center gap-1.5 bg-white px-4 py-2 text-xs font-semibold text-ink-900 hover:bg-blush-100 transition-colors"
          >
            {showAll ? (
              <>Daralt <ChevronUp className="h-3.5 w-3.5" /></>
            ) : (
              <>Tümünü Gör <ChevronDown className="h-3.5 w-3.5" /></>
            )}
          </button>
        </div>
      )}


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pixel-box mt-8 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="h-4 w-4 text-blush-600" />
          <span className="text-xs font-bold text-ink-900 uppercase tracking-wider">Tüm Teknoloji Yığını:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((s) => (
            <span key={s} className="pixel-chip rounded-lg px-3.5 py-1.5 text-xs">
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </ScrollSection>
  )
}

export default Projeler
