import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://ziptuningnoord.nl'
  const lastModified = new Date().toISOString().split('T')[0]

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/dashboard', priority: '0.8', changefreq: 'monthly' },
    { url: '/login', priority: '0.7', changefreq: 'monthly' }
  ]

      const seoPages = [
        // Drenthe - Hoofdsteden (hoge prioriteit)
        { url: '/chiptuning/assen', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/emmen', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/hoogeveen', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/meppel', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/coevorden', priority: '0.9', changefreq: 'weekly' },
        // Overijssel - Hoofdsteden
        { url: '/chiptuning/zwolle', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/enschede', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/deventer', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/almelo', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/hengelo', priority: '0.9', changefreq: 'weekly' },
        // Groningen - Hoofdsteden
        { url: '/chiptuning/groningen', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/delfzijl', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/veendam', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/winschoten', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/stadskanaal', priority: '0.9', changefreq: 'weekly' },
        // Friesland - Hoofdsteden
        { url: '/chiptuning/leeuwarden', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/drachten', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/sneek', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/heerenveen', priority: '0.9', changefreq: 'weekly' },
        { url: '/chiptuning/harlingen', priority: '0.9', changefreq: 'weekly' },
        // Servicegebieden Assen
        { url: '/chiptuning/roden', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/norg', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/peelo', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/ubbena', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/loon', priority: '0.8', changefreq: 'monthly' },
        // Servicegebieden Emmen
        { url: '/chiptuning/klazienaveen', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/nieuw-amsterdam', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/erica', priority: '0.8', changefreq: 'monthly' },
        // Servicegebieden Hoogeveen
        { url: '/chiptuning/pesse', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/noordscheschut', priority: '0.8', changefreq: 'monthly' },
        // Servicegebieden Meppel
        { url: '/chiptuning/nijeveen', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/de-wijk', priority: '0.8', changefreq: 'monthly' },
        // Servicegebieden Coevorden
        { url: '/chiptuning/sleen', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/oosterhesselen', priority: '0.8', changefreq: 'monthly' },
        { url: '/chiptuning/zwinderen', priority: '0.8', changefreq: 'monthly' }
      ]

  const allPages = [...staticPages, ...seoPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
