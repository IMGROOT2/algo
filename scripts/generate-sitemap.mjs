import fs from 'fs'

// Regenerates public/sitemap.xml from data.json. Runs as part of `npm run build`
// so the sitemap can't drift out of date as problems are added.

const SITE_URL = 'https://algousaco.com'
const DATA_PATH = new URL('../src/assets/data/data.json', import.meta.url)
const OUTPUT_PATH = new URL('../public/sitemap.xml', import.meta.url)

// /profile is personal and gated, and the 404 catch-all isn't a real page,
// so neither belongs in the sitemap. Keep in sync with src/Router.js.
const STATIC_ROUTES = ['/', '/solve', '/mock', '/login', '/statistics', '/about']

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
const lastmod = new Date().toISOString().slice(0, 10)

const problemPaths = Object.values(data)
  .flat()
  .map((problem) => problem.id)
  .sort((a, b) => a - b)
  .map((id) => `/problem/${id}`)

const paths = [...STATIC_ROUTES, ...problemPaths]

const urls = paths
  .map(
    (path) =>
      `\t<url>\n\t\t<loc>${SITE_URL}${path}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t</url>`
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

fs.writeFileSync(OUTPUT_PATH, sitemap)
console.log(
  `Wrote ${paths.length} URLs to public/sitemap.xml (${STATIC_ROUTES.length} static, ${problemPaths.length} problems).`
)
