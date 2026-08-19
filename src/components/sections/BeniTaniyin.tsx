import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useSite } from '../../hooks/useSite'
import ScrollSection from '../ui/ScrollSection'

function BeniTaniyin() {
  const { profile } = useSite()

  return (
    <ScrollSection id="beni-taniyin" className="scroll-mt-28 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="pixel-chip inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-blush-600" />
        </span>
        <h2 className="mt-4 font-display text-4xl text-ink-900 sm:text-5xl">
          {profile.name}
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-500">
          {profile.title}
        </p>
      </motion.div>

      {/* Main Profile Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="pixel-window mt-8 shadow-[8px_8px_0_var(--color-ink-900)]"
      >
        <div className="pixel-window-header">
          <div className="window-dots">
            <span className="window-dot window-dot-red"></span>
            <span className="window-dot window-dot-yellow"></span>
            <span className="window-dot window-dot-green"></span>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-display text-2xl text-ink-900 sm:text-3xl">
                {profile.greeting}
              </h3>
              <p className="text-base leading-relaxed text-ink-700">
                {profile.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.tags.map((tag) => (
                  <span key={tag} className="pixel-chip rounded-lg px-3 py-1 text-xs">{tag}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="#projeler"
                className="pixel-btn flex items-center justify-center gap-2 bg-blush-500 px-6 py-3 text-xs font-bold text-white transition hover:bg-blush-600"
              >
                <span>Projelerim</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#iletisim"
                className="pixel-btn flex items-center justify-center gap-2 bg-white px-6 py-3 text-xs font-bold text-ink-900 transition hover:bg-blush-100"
              >
                <span>İletişime Geç</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

    </ScrollSection>
  )
}

export default BeniTaniyin

