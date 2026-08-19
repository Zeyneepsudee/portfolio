import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { href: '#beni-taniyin', label: 'Beni Tanıyın' },
  { href: '#projeler', label: 'Projeler' },
  { href: '#iletisim', label: 'İletişim' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const isHome = useLocation().pathname === '/'

  useEffect(() => {
    if (!isHome) return
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3
      let current = ''
      links.forEach(l => {
        const id = l.href.slice(1)
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = id
        }
      })
      setActive(current || links[0].href.slice(1))
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b-3 border-ink-900 bg-blush-50/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <button onClick={() => setOpen(!open)} className="pixel-btn bg-white px-3 py-1 text-xs font-bold text-ink-700 md:hidden">
          {open ? 'Kapat' : 'Menü'}
        </button>

        <div className="hidden justify-center gap-8 md:flex">
          {isHome && links.map((l) => (
            <a 
              key={l.href} 
              href={l.href} 
              className={`text-xs font-bold tracking-wide transition-colors ${
                active === l.href.slice(1) ? 'text-blush-600' : 'text-ink-700 hover:text-blush-600'
              }`}
            >
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
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-3 border-t-3 border-ink-900 bg-white/95 px-6 py-4 md:hidden">
          {isHome && links.map((l) => (
            <a 
              key={l.href} 
              href={l.href} 
              onClick={() => setOpen(false)} 
              className={`text-xs font-bold transition-colors ${
                active === l.href.slice(1) ? 'text-blush-600' : 'text-ink-700 hover:text-blush-600'
              }`}
            >
              {l.label}
            </a>
          ))}
          {!isHome && (
            <Link to="/" onClick={() => setOpen(false)} className="text-xs font-bold text-blush-600">
              Siteye Dön
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar




