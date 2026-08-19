import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { href: '#beni-taniyin', label: 'Beni Tanıyın' },
  { href: '#projeler', label: 'Projeler' },
  { href: '#iletisim', label: 'İletişim' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const isHome = useLocation().pathname === '/'

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b-3 border-ink-900 bg-blush-50/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <div className="hidden justify-center gap-8 md:flex">
          {isHome && links.map((l) => (
            <a key={l.href} href={l.href} className="text-xs font-bold tracking-wide text-ink-700 transition-colors hover:text-blush-600">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {!isHome && (
            <Link to="/" className="pixel-btn hidden bg-blush-500 px-4 py-1.5 text-xs font-semibold text-white sm:block">
              Siteye dön
            </Link>
          )}
          <Link to="/login" title="Yönetim paneli" className="pixel-btn w-fit bg-blush-300 px-3 py-1.5 font-display text-[11px] text-ink-900">
            zsb
          </Link>
          <button onClick={() => setOpen(!open)} className="pixel-btn bg-white px-3 py-1 text-xs font-bold text-ink-700 md:hidden">
            {open ? 'Kapat' : 'Menü'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-3 border-t-3 border-ink-900 bg-white/95 px-6 py-4 md:hidden">
          {isHome && links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-xs font-bold text-ink-700 hover:text-blush-600">
              {l.label}
            </a>
          ))}
          <Link to={isHome ? '/admin' : '/'} onClick={() => setOpen(false)} className="text-xs font-bold text-blush-600">
            {isHome ? 'Yönetim Paneli' : 'Siteye Dön'}
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar




