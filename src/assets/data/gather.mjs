import fs from 'fs'
import { JSDOM } from 'jsdom'

// Scrapes usaco.org problem pages by contest problem id (CPID) into data.json.
// Safe to re-run: problems already in data.json are skipped.
//
// Usage:
//   npm run gather              scan from the highest known CPID to +120
//   npm run gather 1527 1650    scan an explicit CPID range

const DATA_PATH = new URL('./data.json', import.meta.url)
const DIVISIONS = ['bronze', 'silver', 'gold', 'platinum']
const OLDEST_YEAR = 2015
const LOOKAHEAD = 120
const DELAY_MS = 250

const problemUrl = (id) => 'https://usaco.org/index.php?page=viewproblem2&cpid=' + id
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
const known = new Set(DIVISIONS.flatMap((division) => data[division].map((p) => p.id)))

const [fromArg, toArg] = process.argv.slice(2)
const from = fromArg ? Number(fromArg) : Math.max(...known) + 1
const to = toArg ? Number(toArg) : from + LOOKAHEAD

// usaco.org moved to HTTPS behind Cloudflare; older records still point at http://.
let normalized = 0
for (const division of DIVISIONS) {
  for (const p of data[division]) {
    if (p.url.startsWith('http://')) {
      p.url = problemUrl(p.id)
      normalized++
    }
  }
}

// Returns a problem record, or null when the CPID has no problem behind it.
// Throws on a page that looks like a problem but doesn't parse — a signal that
// usaco.org changed format again, which should be loud rather than swallowed.
function parseProblem(id, body) {
  const dom = new JSDOM(body)
  const headings = dom.window.document.getElementsByTagName('h2')
  const text = dom.window.document.getElementById('probtext-text')
  if (headings.length < 2 || !text) return null

  const subtitle = headings[0].textContent.trim()
  const title = headings[1].textContent.trim()

  const year = subtitle.match(/20\d\d/)
  const number = title.match(/Problem\s+(\d+)/)
  if (!year || !number) throw new Error(`could not parse "${subtitle}" / "${title}"`)

  // Since 2026 the US Open is a single undivisioned contest, so its pages carry
  // no division at all. Those problems are platinum-level; flag them so the UI
  // can label them as US Open rather than showing a plain platinum badge.
  const matchedDivision = subtitle.match(/Bronze|Silver|Gold|Platinum/i)
  const division = matchedDivision ? matchedDivision[0].toLowerCase() : 'platinum'

  return {
    title,
    subtitle,
    id,
    year: year[0],
    division,
    ...(matchedDivision ? {} : { usopen: true }),
    number: number[1],
    problem: text.innerHTML,
    url: problemUrl(id)
  }
}

console.log(`Scanning CPIDs ${from}-${to} (${known.size} problems already known).`)

const added = []
for (let id = from; id <= to; id++) {
  if (known.has(id)) continue

  let record
  try {
    const response = await fetch(problemUrl(id))
    record = parseProblem(id, await response.text())
  } catch (e) {
    console.error(`CPID ${id}: ${e.message}`)
    continue
  } finally {
    await sleep(DELAY_MS)
  }

  if (!record) continue
  if (Number(record.year) <= OLDEST_YEAR) {
    console.log(`CPID ${id}: skipped, too old (${record.year}).`)
    continue
  }

  data[record.division].push(record)
  added.push(record)
  console.log(
    `CPID ${id}: added to ${record.division}${record.usopen ? ' (US Open, no division)' : ''} - ${record.subtitle} / ${record.title}`
  )
}

if (added.length || normalized) {
  for (const division of DIVISIONS) data[division].sort((a, b) => a.id - b.id)
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 4))
}

console.log(`\nDone. Added ${added.length} problem(s); normalized ${normalized} URL(s) to HTTPS.`)
for (const division of DIVISIONS) console.log(`  ${division}: ${data[division].length}`)
