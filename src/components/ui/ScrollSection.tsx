import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function ScrollSection({ children, id }: { children: ReactNode; id?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.9, 1, 1, 0.94])
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [70, 0, 0, -50])
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [8, 0, 0, 6])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <section id={id} ref={ref} className="py-28">
      <motion.div style={{ opacity, scale, y, filter }}>{children}</motion.div>
    </section>
  )
}

export default ScrollSection
