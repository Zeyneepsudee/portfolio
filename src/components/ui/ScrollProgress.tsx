import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-blush-500"
      style={{ scaleX: width }}
    />
  )
}

export default ScrollProgress
