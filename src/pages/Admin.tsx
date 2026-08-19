import { useState, useRef, useEffect } from 'react'
import { useProjects } from '../hooks/useProjects'
import { useAuth } from '../hooks/useAuth'
import { useSite } from '../hooks/useSite'
import { useNavigate } from 'react-router-dom'
import { CATEGORY_LABELS } from '../interfaces'
import type { ProjectFormData, ProjectCategory, ContactMethod, ProfileData } from '../interfaces'

const EMPTY_PROJECT: ProjectFormData = {
  title: '',
  description: '',
  technologies: [],
  category: 'web',
  githubUrl: '',
  liveUrl: '',
  featured: false,
}

const EMPTY_CONTACT: Omit<ContactMethod, 'id'> = {
  label: '',
  value: '',
  href: '',
  iconName: 'Mail',
  color: 'bg-blush-200'
}

type Tab = 'projects' | 'profile' | 'contacts'

function Admin() {
  const { projects, addProject, updateProject, deleteProject, resetProjects } = useProjects()
  const { profile, contacts, updateProfile, addContact, updateContact, deleteContact, resetSite } = useSite()
  const { logout } = useAuth()
  const nav = useNavigate()

  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [msg, setMsg] = useState('')

  // Project State
  const [projectForm, setProjectForm] = useState<ProjectFormData>(EMPTY_PROJECT)
  const [editProjectId, setEditProjectId] = useState<string | null>(null)
  const [techInput, setTechInput] = useState('')

  // Profile State
  const [profileForm, setProfileForm] = useState<ProfileData>(profile)
  const [profileTagsInput, setProfileTagsInput] = useState(profile.tags.join(', '))

  // Contact State
  const [contactForm, setContactForm] = useState<Omit<ContactMethod, 'id'>>(EMPTY_CONTACT)
  const [editContactId, setEditContactId] = useState<string | null>(null)

  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flash = (text: string) => {
    setMsg(text)
    if (flashTimeout.current) clearTimeout(flashTimeout.current)
    flashTimeout.current = setTimeout(() => setMsg(''), 2500)
  }

  useEffect(() => {
    return () => {
      if (flashTimeout.current) clearTimeout(flashTimeout.current)
    }
  }, [])

  // --- Profile Handlers ---
  const handleProfileSubmit = () => {
    updateProfile({
      ...profileForm,
      tags: profileTagsInput.split(',').map(t => t.trim()).filter(Boolean)
    })
    flash('Profil güncellendi ✓')
  }

  // --- Contact Handlers ---
  const handleContactSubmit = () => {
    if (!contactForm.label.trim() || !contactForm.value.trim()) return
    if (editContactId) {
      updateContact(editContactId, contactForm)
      flash('İletişim yöntemi güncellendi ✓')
    } else {
      addContact(contactForm)
      flash('İletişim yöntemi eklendi ✓')
    }
    setContactForm(EMPTY_CONTACT)
    setEditContactId(null)
  }

  const startEditContact = (c: ContactMethod) => {
    setEditContactId(c.id)
    setContactForm({
      label: c.label,
      value: c.value,
      href: c.href,
      iconName: c.iconName,
      color: c.color
    })
  }

  // --- Project Handlers ---
  const handleProjectSubmit = () => {
    if (!projectForm.title.trim() || !projectForm.description.trim()) return

    try {
      if (projectForm.githubUrl) new URL(projectForm.githubUrl)
      if (projectForm.liveUrl) new URL(projectForm.liveUrl)
    } catch {
      flash('Lütfen geçerli bir URL girin (Örn: https://...)')
      return
    }

    if (editProjectId) {
      updateProject(editProjectId, projectForm)
      flash('Proje güncellendi ✓')
    } else {
      addProject(projectForm)
      flash('Proje eklendi ✓')
    }
    setProjectForm(EMPTY_PROJECT)
    setEditProjectId(null)
    setTechInput('')
  }

  const startEditProject = (id: string) => {
    const p = projects.find((x) => x.id === id)
    if (!p) return
    setEditProjectId(id)
    setProjectForm({
      title: p.title,
      description: p.description,
      technologies: p.technologies,
      category: p.category,
      githubUrl: p.githubUrl ?? '',
      liveUrl: p.liveUrl ?? '',
      featured: p.featured,
    })
    setTechInput(p.technologies.join(', '))
  }

  const handleLogout = () => {
    logout()
    nav('/login', { replace: true })
  }

  return (
    <section className="py-16">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-display text-3xl text-ink-900">Admin Paneli</h1>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (window.confirm('Tüm site ve proje ayarlarını sıfırlamak istediğine emin misin?')) {
                resetProjects()
                resetSite()
                flash('Tüm ayarlar sıfırlandı ✓')
              }
            }}
            className="border-3 border-ink-900 bg-white px-4 py-2 text-sm text-ink-700 transition hover:bg-blush-50"
          >
            Sıfırla
          </button>
          <button onClick={handleLogout} className="border-3 border-ink-900 bg-blush-500 px-4 py-2 text-sm text-white transition hover:bg-blush-600">
            Çıkış
          </button>
        </div>
      </div>

      {msg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-xl border-3 border-ink-900 bg-blush-100 px-6 py-4 text-sm font-bold text-ink-900 shadow-[6px_6px_0_var(--color-ink-900)]">
          <span>{msg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b-3 border-ink-900">
        {(['projects', 'profile', 'contacts'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-display text-sm transition ${activeTab === tab ? 'bg-ink-900 text-white' : 'bg-white text-ink-900 hover:bg-blush-50'}`}
          >
            {tab === 'projects' && 'Projeler'}
            {tab === 'profile' && 'Hakkımda'}
            {tab === 'contacts' && 'İletişim'}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === 'projects' && (
          <div>
            {/* Project Form */}
            <div className="pixel-box rounded-2xl p-6">
              <h2 className="font-display text-base text-ink-900">{editProjectId ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="p-title" className="mb-1 block text-xs text-ink-500">Başlık *</label>
                  <input
                    id="p-title"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:bg-blush-50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="p-desc" className="mb-1 block text-xs text-ink-500">Açıklama *</label>
                  <textarea
                    id="p-desc"
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:bg-blush-50"
                  />
                </div>
                <div>
                  <label htmlFor="p-cat" className="mb-1 block text-xs text-ink-500">Kategori</label>
                  <select
                    id="p-cat"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm((f) => ({ ...f, category: e.target.value as ProjectCategory }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm text-ink-900 outline-none"
                  >
                    {(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((c) => (
                      <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="p-tech" className="mb-1 block text-xs text-ink-500">Teknolojiler (virgülle ayır)</label>
                  <input
                    id="p-tech"
                    value={techInput}
                    onChange={(e) => {
                      setTechInput(e.target.value)
                      setProjectForm(f => ({ ...f, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))
                    }}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:bg-blush-50"
                  />
                </div>
                <div>
                  <label htmlFor="p-github" className="mb-1 block text-xs text-ink-500">GitHub URL</label>
                  <input
                    id="p-github"
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm((f) => ({ ...f, githubUrl: e.target.value }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:bg-blush-50"
                  />
                </div>
                <div>
                  <label htmlFor="p-live" className="mb-1 block text-xs text-ink-500">Canlı Site URL</label>
                  <input
                    id="p-live"
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm((f) => ({ ...f, liveUrl: e.target.value }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:bg-blush-50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm((f) => ({ ...f, featured: e.target.checked }))}
                    className="h-4 w-4 accent-blush-500"
                  />
                  <label htmlFor="featured" className="text-sm text-ink-700">Öne çıkar (★)</label>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={handleProjectSubmit}
                  disabled={!projectForm.title.trim() || !projectForm.description.trim()}
                  className="border-3 border-ink-900 bg-blush-500 px-6 py-2 text-sm text-white transition hover:bg-blush-600 disabled:opacity-50"
                >
                  {editProjectId ? 'Güncelle' : 'Ekle'}
                </button>
                {editProjectId && (
                  <button onClick={() => { setEditProjectId(null); setProjectForm(EMPTY_PROJECT); setTechInput('') }} className="border-3 border-ink-900 bg-white px-6 py-2 text-sm text-ink-700 transition hover:bg-blush-50">
                    İptal
                  </button>
                )}
              </div>
            </div>

            {/* Project list */}
            <div className="mt-10 space-y-4">
              <h2 className="font-display text-base text-ink-900">Projeler ({projects.length})</h2>
              {projects.map((p) => (
                <div key={p.id} className="pixel-box flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm text-ink-900">{p.title}</span>
                        {p.featured && <span className="border-3 border-ink-900 bg-blush-200 px-1.5 py-0.5 text-xs text-ink-900">★</span>}
                        <span className="text-xs text-blush-600 uppercase tracking-wider">{CATEGORY_LABELS[p.category]}</span>
                      </div>
                      {p.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {p.technologies.map(t => <span key={t} className="bg-blush-100 px-2 py-0.5 text-xs text-ink-700">{t}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => startEditProject(p.id)} className="border-3 border-ink-900 bg-white px-4 py-1.5 text-xs text-ink-700 transition hover:bg-blush-50">
                      Düzenle
                    </button>
                    <button onClick={() => { if (window.confirm('Silinsin mi?')) deleteProject(p.id) }} className="border-3 border-ink-900 bg-white px-4 py-1.5 text-xs text-blush-600 transition hover:bg-blush-50">
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="pixel-box rounded-2xl p-6">
            <h2 className="font-display text-base text-ink-900">Profil Bilgileri</h2>
            <div className="mt-5 grid gap-4">
              <div>
                <label htmlFor="pr-name" className="mb-1 block text-xs text-ink-500">İsim Soyisim</label>
                <input
                  id="pr-name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label htmlFor="pr-title" className="mb-1 block text-xs text-ink-500">Unvan (Meslek vs.)</label>
                <input
                  id="pr-title"
                  value={profileForm.title}
                  onChange={(e) => setProfileForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label htmlFor="pr-greeting" className="mb-1 block text-xs text-ink-500">Karşılama Başlığı</label>
                <input
                  id="pr-greeting"
                  value={profileForm.greeting}
                  onChange={(e) => setProfileForm((f) => ({ ...f, greeting: e.target.value }))}
                  className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label htmlFor="pr-desc" className="mb-1 block text-xs text-ink-500">Açıklama (Hakkımda Metni)</label>
                <textarea
                  id="pr-desc"
                  rows={4}
                  value={profileForm.description}
                  onChange={(e) => setProfileForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label htmlFor="pr-tags" className="mb-1 block text-xs text-ink-500">Yetkinlik Etiketleri (virgülle ayır)</label>
                <input
                  id="pr-tags"
                  value={profileTagsInput}
                  onChange={(e) => setProfileTagsInput(e.target.value)}
                  className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={handleProfileSubmit}
                className="border-3 border-ink-900 bg-blush-500 px-6 py-2 text-sm text-white transition hover:bg-blush-600"
              >
                Kaydet
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <div className="pixel-box rounded-2xl p-6">
              <h2 className="font-display text-base text-ink-900">{editContactId ? 'İletişim Yöntemi Düzenle' : 'Yeni İletişim Ekle'}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-label" className="mb-1 block text-xs text-ink-500">Etiket (Platform) *</label>
                  <input
                    id="c-label"
                    value={contactForm.label}
                    onChange={(e) => setContactForm((f) => ({ ...f, label: e.target.value }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                    placeholder="Örn: LinkedIn"
                  />
                </div>
                <div>
                  <label htmlFor="c-val" className="mb-1 block text-xs text-ink-500">Değer (Kullanıcı Adı vb.) *</label>
                  <input
                    id="c-val"
                    value={contactForm.value}
                    onChange={(e) => setContactForm((f) => ({ ...f, value: e.target.value }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="c-href" className="mb-1 block text-xs text-ink-500">URL / Hedef *</label>
                  <input
                    id="c-href"
                    type="url"
                    value={contactForm.href}
                    onChange={(e) => setContactForm((f) => ({ ...f, href: e.target.value }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="c-icon" className="mb-1 block text-xs text-ink-500">İkon</label>
                  <select
                    id="c-icon"
                    value={contactForm.iconName}
                    onChange={(e) => setContactForm((f) => ({ ...f, iconName: e.target.value }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                  >
                    <option value="Mail">Mail</option>
                    <option value="Linkedin">LinkedIn</option>
                    <option value="Github">GitHub</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Globe">Web / Globe</option>
                    <option value="MessageCircle">Mesaj</option>
                    <option value="Phone">Telefon</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-color" className="mb-1 block text-xs text-ink-500">Arka Plan Rengi (Tailwind Sınıfı)</label>
                  <input
                    id="c-color"
                    value={contactForm.color}
                    onChange={(e) => setContactForm((f) => ({ ...f, color: e.target.value }))}
                    className="w-full border-3 border-ink-900 bg-white px-3 py-2 text-sm outline-none"
                    placeholder="Örn: bg-blush-200"
                  />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={handleContactSubmit}
                  disabled={!contactForm.label.trim() || !contactForm.value.trim()}
                  className="border-3 border-ink-900 bg-blush-500 px-6 py-2 text-sm text-white transition disabled:opacity-50"
                >
                  {editContactId ? 'Güncelle' : 'Ekle'}
                </button>
                {editContactId && (
                  <button onClick={() => { setEditContactId(null); setContactForm(EMPTY_CONTACT) }} className="border-3 border-ink-900 bg-white px-6 py-2 text-sm text-ink-700 transition">
                    İptal
                  </button>
                )}
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <h2 className="font-display text-base text-ink-900">İletişim Yöntemleri ({contacts.length})</h2>
              {contacts.map((c) => (
                <div key={c.id} className="pixel-box flex items-center justify-between rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className={`h-8 w-8 rounded ${c.color} border-2 border-ink-900 flex items-center justify-center font-bold text-xs`}>
                      {c.iconName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display text-sm">{c.label}</div>
                      <div className="text-xs text-ink-500">{c.value}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditContact(c)} className="border-3 border-ink-900 bg-white px-3 py-1 text-xs text-ink-700">Düzenle</button>
                    <button onClick={() => { if (window.confirm('Silinsin mi?')) deleteContact(c.id) }} className="border-3 border-ink-900 bg-white px-3 py-1 text-xs text-blush-600">Sil</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Admin
