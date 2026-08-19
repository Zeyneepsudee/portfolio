import type { SiteData } from '../interfaces'

export const seedSite: SiteData = {
  profile: {
    name: 'Zeynep Sude Bayram',
    title: 'Bilgisayar Mühendisliği Öğrencisi',
    greeting: 'Tanışalım 👋',
    description: 'Manisa Celal Bayar Üniversitesi Bilgisayar Mühendisliği 3. sınıf öğrencisiyim. Web ve mobil ekosisteminde kullanıcı odaklı, performanslı ve görsel kalitesi yüksek ürünler geliştirmeye odaklanıyorum.',
    tags: ['Bilgisayar Mühendisliği', 'Vue 3 & React', 'Flutter Mobil', 'İzmir, Türkiye'],
  },
  contacts: [
    {
      id: 'email-1',
      label: 'E-posta',
      value: 'zeynepsudeb83@gmail.com',
      href: 'mailto:zeynepsudeb83@gmail.com',
      iconName: 'Mail',
      color: 'bg-blush-200'
    },
    {
      id: 'linkedin-1',
      label: 'LinkedIn',
      value: 'Zeynep Sude Bayram',
      href: 'https://www.linkedin.com/in/zeynepsudebayram83/',
      iconName: 'Linkedin',
      color: 'bg-sky-200'
    },
    {
      id: 'github-1',
      label: 'GitHub',
      value: 'GitHub Profili',
      href: 'https://github.com/zeyneepsudee',
      iconName: 'Github',
      color: 'bg-emerald-200'
    }
  ]
}
