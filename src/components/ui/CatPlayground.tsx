import { useEffect, useRef, useState } from 'react'
import PixelCat from './PixelCat'
import PixelYarn from './PixelYarn'

const FLOOR = 14
const YARN = 32
const CATW = 64
const GRAV = 0.55
const FRIC = 0.985
const BOUNCE = 0.62
const SPEED = 2.6

function CatPlayground() {
  const catRef = useRef<HTMLDivElement>(null)
  const yarnRef = useRef<HTMLDivElement>(null)
  const zoneRef = useRef<HTMLDivElement>(null)
  const [hearts, setHearts] = useState<number[]>([])

  const s = useRef({
    catX: 120, face: 1, yx: 320, yy: 0, vx: 2.4, vy: 0,
    drag: false, lastPx: 0, lastPy: 0, cool: 0, still: 0,
  })

  useEffect(() => {
    let raf = 0

    const step = () => {
      const st = s.current
      const w = zoneRef.current?.clientWidth ?? window.innerWidth

      if (!st.drag) {
        st.vy -= GRAV
        st.yy += st.vy
        if (st.yy <= 0) {
          st.yy = 0
          st.vy = Math.abs(st.vy) * BOUNCE
          if (st.vy < 1) st.vy = 0
        }
        st.yx += st.vx
        st.vx *= FRIC

        if (st.yx < 8) { st.yx = 8; st.vx = Math.abs(st.vx) * 0.7 }
        if (st.yx > w - YARN - 8) { st.yx = w - YARN - 8; st.vx = -Math.abs(st.vx) * 0.7 }

        if (Math.abs(st.vx) < 0.2 && st.yy === 0) {
          st.still += 1
          if (st.still > 110) {
            st.vx = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2)
            st.still = 0
          }
        } else {
          st.still = 0
        }
      }

      const target = st.yx - CATW / 2 + YARN / 2
      const dx = target - st.catX
      if (Math.abs(dx) > 3) {
        st.catX += Math.sign(dx) * Math.min(SPEED, Math.abs(dx) * 0.14)
        st.face = Math.sign(dx)
      }
      st.catX = Math.max(0, Math.min(w - CATW, st.catX))

      if (st.cool > 0) st.cool -= 1
      if (!st.drag && st.cool === 0 && Math.abs(target - st.catX) < 16 && st.yy < 26) {
        st.vx = (Math.random() > 0.5 ? 1 : -1) * (3.5 + Math.random() * 3)
        st.vy = 5 + Math.random() * 3
        st.cool = 34
        const id = Date.now()
        setHearts((h) => [...h, id])
        setTimeout(() => setHearts((h) => h.filter((x) => x !== id)), 1000)
      }

      if (catRef.current) {
        catRef.current.style.transform = `translateX(${st.catX}px) scaleX(${st.face})`
      }
      if (yarnRef.current) {
        yarnRef.current.style.transform = `translate(${st.yx}px, ${-st.yy}px)`
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const down = (e: React.PointerEvent) => {
    const st = s.current
    st.drag = true
    st.lastPx = e.clientX
    st.lastPy = e.clientY
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const move = (e: React.PointerEvent) => {
    const st = s.current
    if (!st.drag) return
    const zone = zoneRef.current
    if (!zone) return
    const r = zone.getBoundingClientRect()
    st.yx = Math.max(8, Math.min(r.width - YARN - 8, e.clientX - r.left - YARN / 2))
    st.yy = Math.max(0, Math.min(120, r.bottom - FLOOR - e.clientY - YARN / 2))
    st.vx = (e.clientX - st.lastPx) * 0.55
    st.vy = (st.lastPy - e.clientY) * 0.4
    st.lastPx = e.clientX
    st.lastPy = e.clientY
  }

  const up = () => { s.current.drag = false }

  return (
    <div ref={zoneRef} className="pointer-events-none fixed bottom-0 left-0 z-40 h-[150px] w-full overflow-hidden">
      {hearts.map((id) => (
        <span key={id} className="heart-pop absolute bottom-20 left-1/2 text-sm">✦</span>
      ))}

      <div ref={catRef} className="absolute" style={{ bottom: FLOOR, left: 0 }}>
        <PixelCat scale={4} />
      </div>

      <div
        ref={yarnRef}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        className="pointer-events-auto absolute cursor-grab touch-none active:cursor-grabbing"
        style={{ bottom: FLOOR, left: 0 }}
      >
        <PixelYarn scale={4} />
      </div>

      <div className="absolute bottom-0 h-[14px] w-full border-t-3 border-ink-900 bg-blush-200" />
    </div>
  )
}

export default CatPlayground
