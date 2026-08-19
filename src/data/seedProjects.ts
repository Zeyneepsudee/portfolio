import type { Project } from '../interfaces'

export const seedProjects: Project[] = [
  {
    id: 'seed-1',
    title: 'Türk Teknik 35',
    description: 'Teknik servis firması için kurumsal web sitesi. Hizmet tanıtımı, iletişim formu ve yönetilebilir içerik yapısı.',
    technologies: ['Vue 3', 'TypeScript', 'Laravel', 'MySQL'],
    category: 'web',
    liveUrl: 'https://turkteknik35.com',
    featured: true,
    createdAt: new Date('2025-06-01').toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Speed Teknik',
    description: 'Servis takip ve tanıtım platformu. Responsive arayüz ve dinamik içerik yönetimi.',
    technologies: ['Vue 3', 'Laravel', 'PostgreSQL'],
    category: 'web',
    liveUrl: 'https://speedteknik.com',
    featured: true,
    createdAt: new Date('2025-09-01').toISOString(),
  },
  {
    id: 'seed-3',
    title: 'Cisco Ağ Tasarımı',
    description: 'VLAN, Router-on-a-Stick, DHCP ve ACL yapılandırmalarını içeren Packet Tracer ağ projesi.',
    technologies: ['Cisco', 'Packet Tracer', 'Networking'],
    category: 'other',
    featured: false,
    createdAt: new Date('2026-02-10').toISOString(),
  },
  {
    id: 'seed-4',
    title: 'Araç Hasar Tespiti ve Görüntü İşleme',
    description: 'AutoML teknikleri ile en yüksek doğruluk oranına sahip model seçildi ve hasar tespit süreci otomatikleştirildi.',
    technologies: ['Python, AutoML, Pandas'],
    category: 'ml',
    featured: false,
    createdAt: new Date('2026-02-10').toISOString(),
  },
]
