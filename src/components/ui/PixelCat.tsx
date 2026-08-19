import { useEffect, useState } from 'react'

const P: Record<string, string> = {
  o: '#4a2a38',
  b: '#ffb5cc',
  l: '#ffe8f0',
  w: '#ffffff',
  p: '#ef5588',
}

const F1 = [
  '............o.o.',
  '...........obobo',
  '.o.........obbbo',
  '.o.......oooblbo',
  '.o......obbbwbwo',
  '.o.....obbbbpbbo',
  '.oooooobbbbbbbbo',
  'obbbbbbbbbbbbbbo',
  'obllllllllllllo.',
  '.obbbbbbbbbbbo..',
  '..oboo..oobo....',
  '..ooo....ooo....',
]

const F2 = [
  '............o.o.',
  '...........obobo',
  'o..........obbbo',
  '.o.......oooblbo',
  '.o......obbbwbwo',
  '.o.....obbbbpbbo',
  '.oooooobbbbbbbbo',
  'obbbbbbbbbbbbbbo',
  'obllllllllllllo.',
  '.obbbbbbbbbbbo..',
  '.oboo....oobo...',
  '.ooo......ooo...',
]

function PixelCat({ scale = 4 }: { scale?: number }) {
  const [f, setF] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setF((v) => (v === 0 ? 1 : 0)), 170)
    return () => clearInterval(id)
  }, [])

  const grid = f === 0 ? F1 : F2

  return (
    <svg width={16 * scale} height={12 * scale} viewBox="0 0 16 12" shapeRendering="crispEdges">
      {grid.map((row, y) =>
        row.split('').map((c, x) =>
          c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={P[c]} />
        )
      )}
    </svg>
  )
}

export default PixelCat
