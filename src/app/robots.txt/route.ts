import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# SEO Landing Pages
Allow: /chiptuning/

# Sitemap
Sitemap: https://ziptuningnoord.nl/sitemap.xml

# Crawl delay
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

