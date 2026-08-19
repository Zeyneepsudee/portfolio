import { useRef, useState, type ReactNode } from 'react'

function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [t, setT] = useState('rotateX(0deg) rotateY(0deg)')

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setT(`rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(8px)`)
  }

  return (
    <div className="scene h-full">
      <div ref={ref} onMouseMove={move} onMouseLeave={() => setT('rotateX(0deg) rotateY(0deg)')} style={{ transform: t, transition: 'transform 350ms cubic-bezier(0.2,0.8,0.2,1)' }} className={className}>
        {children}
      </div>
    </div>
  )
}

export default TiltCard
