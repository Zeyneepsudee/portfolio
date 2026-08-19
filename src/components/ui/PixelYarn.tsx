const P: Record<string, string> = {
  o: '#4a2a38',
  y: '#ff94b6',
  l: '#ffd2e0',
  d: '#ef5588',
}

const G = [
  '..oooo..',
  '.oyyllo.',
  'oydyylyo',
  'oyydylyo',
  'olydyyyo',
  'oyylddyo',
  '.oyyyyo.',
  '..oooo..',
]

function PixelYarn({ scale = 4 }: { scale?: number }) {
  return (
    <svg width={8 * scale} height={8 * scale} viewBox="0 0 8 8" shapeRendering="crispEdges">
      {G.map((row, y) =>
        row.split('').map((c, x) =>
          c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={P[c]} />
        )
      )}
    </svg>
  )
}

export default PixelYarn
