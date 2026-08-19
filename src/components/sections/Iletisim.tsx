import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { useSite } from '../../hooks/useSite'
import ScrollSection from '../ui/ScrollSection'

function LinkedinIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function GithubIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

type IconComponent = React.ComponentType<{ className?: string }>

const CustomIcons: Record<string, IconComponent> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
}

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  if (CustomIcons[name]) {
    const Custom = CustomIcons[name]
    return <Custom className={className} />
  }
  const lucideMap = LucideIcons as unknown as Record<string, IconComponent>
  const LucideIcon = lucideMap[name] ?? LucideIcons.HelpCircle
  return <LucideIcon className={className} />
}


function Iletisim() {
  const { contacts } = useSite()

  return (
    <ScrollSection id="iletisim" className="scroll-mt-28 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="pixel-chip inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-blush-600" />
          <span>Bana Ulaşın</span>
        </span>
        <h2 className="mt-4 font-display text-4xl text-ink-900 sm:text-5xl">
          İletişim
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-500">
          Staj, yeni proje fırsatları veya teknik sohbetler için dilediğiniz kanaldan mesaj gönderebilirsiniz.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {contacts.map((method) => {
          return (
            <motion.a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pixel-window flex flex-col justify-between p-6 transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink-900 ${method.color} shadow-[2px_2px_0_var(--color-ink-900)]`}>
                  <DynamicIcon name={method.iconName} className="h-5 w-5 text-ink-900" />
                </div>
                <span className="pixel-chip rounded px-2 py-0.5 text-[10px] uppercase font-bold">
                  {method.label}
                </span>
              </div>

              <div className="mt-6">
                <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider block">{method.label}</span>
                <span className="font-display text-sm text-ink-900 mt-1 block truncate">{method.value}</span>
              </div>
            </motion.a>
          )
        })}
      </div>
    </ScrollSection>
  )
}

export default Iletisim

