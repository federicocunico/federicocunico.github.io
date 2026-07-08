export function formatAuthors(list) {
  const names = (list || []).map((a) => a.name)
  if (names.length > 8) return `${names.slice(0, 8).join(', ')}, et al.`
  return names.join(', ')
}

export async function fetchPublications(scholarAuthorName) {
  const name = encodeURIComponent(scholarAuthorName)
  const res = await fetch(
    `https://api.semanticscholar.org/graph/v1/author/search?query=${name}&fields=name,affiliations,paperCount`
  )
  if (!res.ok) return null

  const json = await res.json()
  const authors = (json.data || []).filter((a) => a.paperCount > 0)
  if (!authors.length) return null

  const author =
    authors.find((a) => (a.affiliations || []).join(' ').toLowerCase().includes('verona')) ||
    authors[0]

  const pres = await fetch(
    `https://api.semanticscholar.org/graph/v1/author/${author.authorId}/papers?fields=title,year,venue,citationCount,authors&limit=100`
  )
  if (!pres.ok) return null

  const pjson = await pres.json()
  const papers = (pjson.data || []).filter((p) => p.title && p.year)
  return papers.length ? papers : null
}

export function mapLivePublications(papers, lang, sort, count) {
  const sorted = [...papers].sort((a, b) =>
    sort === 'cited'
      ? (b.citationCount || 0) - (a.citationCount || 0)
      : (b.year || 0) - (a.year || 0)
  )

  return sorted.slice(0, count).map((p) => ({
    year: String(p.year),
    title: p.title,
    authors: formatAuthors(p.authors),
    venue: p.venue || '—',
    cites: `${p.citationCount ?? 0}${lang === 'it' ? ' citazioni' : ' citations'}`
  }))
}

export function mapStaticPublications(publications, count) {
  const sorted = [...publications].sort((a, b) => Number(b.year) - Number(a.year))
  return sorted.slice(0, count).map((p) => ({ ...p, cites: '' }))
}
