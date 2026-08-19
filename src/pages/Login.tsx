import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const { login, tries, lockedUntil } = useAuth()
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const nav = useNavigate()

  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (lockedUntil <= now) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [lockedUntil, now])

  const locked = lockedUntil > now
  const mins = Math.max(0, Math.ceil((lockedUntil - now) / 60000))

  const submit = async () => {
    if (locked || busy) return
    setBusy(true)
    setErr('')
    const ok = await login(pw)
    setBusy(false)
    if (ok) {
      nav('/admin', { replace: true })
    } else {
      setPw('')
      setErr(tries >= 4 ? 'Son deneme — sonra kilitlenir' : 'Şifre hatalı')
    }
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center py-20">
      <div className="pixel-box w-full max-w-sm rounded-2xl p-8">
        <h1 className="font-display text-base leading-relaxed text-ink-900">GIRIS</h1>
        <p className="mt-3 text-sm text-ink-500">Yönetim paneline erişmek için şifre gir.</p>

        <label htmlFor="pw-input" className="sr-only">Şifre</label>
        <input
          id="pw-input"
          type="password"
          value={pw}
          disabled={locked || busy}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="••••••••"
          className="mt-6 w-full border-3 border-ink-900 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none focus:bg-blush-50 disabled:opacity-50"
        />


        {err && <p className="mt-3 text-xs text-blush-600">{err}</p>}
        {locked && <p className="mt-3 text-xs text-blush-600">Çok fazla deneme. {mins} dk sonra tekrar dene.</p>}

        <button onClick={submit} disabled={locked || busy || !pw} className="pixel-btn mt-6 w-full bg-blush-500 px-6 py-2.5 text-sm text-white disabled:opacity-50">
          {busy ? 'Kontrol ediliyor...' : 'Giriş yap'}
        </button>

        <Link to="/" className="mt-5 block text-center text-xs text-ink-500 hover:text-blush-600">
          Siteye dön
        </Link>
      </div>
    </section>
  )
}

export default Login
