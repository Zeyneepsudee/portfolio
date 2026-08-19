import { useEffect } from 'react'

const SPRITES: Record<string, number[][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
}

function Oneko() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = document.createElement('div')
    el.id = 'oneko'
    el.setAttribute('aria-hidden', 'true')
    Object.assign(el.style, {
      width: '32px', height: '32px', position: 'fixed',
      pointerEvents: 'none', imageRendering: 'pixelated',
      left: '16px', top: '16px', zIndex: '45',
      backgroundImage: 'url(/oneko.gif)',
    })
    document.body.appendChild(el)

    let x = 32, y = 32, mx = 0, my = 0
    let frame = 0, idleTime = 0, idleAnim: string | null = null, idleFrame = 0
    const SPEED = 10

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    const setSprite = (name: string, f: number) => {
      const s = SPRITES[name][f % SPRITES[name].length]
      el.style.backgroundPosition = `${s[0] * 32}px ${s[1] * 32}px`
    }

    const resetIdle = () => { idleAnim = null; idleFrame = 0 }

    const doIdle = () => {
      idleTime += 1
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && !idleAnim) {
        idleAnim = ['sleeping', 'scratchSelf'][Math.floor(Math.random() * 2)]
      }
      if (idleAnim === 'sleeping') {
        if (idleFrame < 8) { setSprite('tired', 0) }
        else { setSprite('sleeping', Math.floor(idleFrame / 4)) }
        if (idleFrame > 192) resetIdle()
      } else if (idleAnim === 'scratchSelf') {
        setSprite('scratchSelf', idleFrame)
        if (idleFrame > 9) resetIdle()
      } else {
        setSprite('idle', 0)
        return
      }
      idleFrame += 1
    }

    const tick = () => {
      frame += 1
      const dx = x - mx
      const dy = y - my
      const dist = Math.hypot(dx, dy)

      if (dist < SPEED || dist < 48) { doIdle(); return }

      idleAnim = null
      idleFrame = 0
      if (idleTime > 1) idleTime = 0

      let dir = ''
      dir += dy / dist > 0.5 ? 'N' : ''
      dir += dy / dist < -0.5 ? 'S' : ''
      dir += dx / dist > 0.5 ? 'W' : ''
      dir += dx / dist < -0.5 ? 'E' : ''
      setSprite(dir || 'idle', frame)

      x -= (dx / dist) * SPEED
      y -= (dy / dist) * SPEED
      x = Math.min(Math.max(16, x), window.innerWidth - 16)
      y = Math.min(Math.max(16, y), window.innerHeight - 16)

      el.style.left = `${x - 16}px`
      el.style.top = `${y - 16}px`
    }

    const id = setInterval(tick, 100)

    return () => {
      clearInterval(id)
      document.removeEventListener('mousemove', onMove)
      el.remove()
    }
  }, [])

  return null
}

export default Oneko
