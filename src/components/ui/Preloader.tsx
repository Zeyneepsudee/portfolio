import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Preloader() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(id)
          setTimeout(() => setDone(true), 350)
          return 100
        }
        return p + 2
      })
    }, 22)
    return () => clearInterval(id)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream" exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6, ease: [0.6, 0, 0.2, 1] }}>
          <span className="font-display text-7xl text-blush-500">{pct}</span>
          <div className="mt-6 h-px w-48 bg-blush-200">
            <div className="h-full bg-blush-500 transition-all duration-100" style={{ width: `${pct}%` }} />
          </div>
          <span className="mt-4 text-xs tracking-[0.3em] text-ink-300 uppercase">yükleniyor</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
