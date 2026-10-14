// One-and-a-half-column CV: a narrow left column for section names, dates and
// headings, a wide right column for the content. Monochrome; hierarchy comes
// from font weight and grey levels only.

const INK = '#111111'
const SOFT = '#3A3A3A'
const MUTED = '#6B6B6B'
const RULE = '#111111'

const PAGE_WIDTH = 595.28 // A4
const MARGIN_X = 42
const LEFT = 108 // left column width
const GAP = 12
const RIGHT = PAGE_WIDTH - 2 * MARGIN_X - LEFT - GAP

function row(left, right, marginBottom = 9) {
  return {
    columns: [
      { width: LEFT, stack: [].concat(left ?? ''), alignment: 'right' },
      { width: RIGHT, stack: [].concat(right) }
    ],
    columnGap: GAP,
    margin: [0, 0, 0, marginBottom],
    unbreakable: true
  }
}

function section(title) {
  return {
    ...row(
      { text: title.toUpperCase(), style: 'section' },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: RIGHT, y2: 0, lineWidth: 0.8, lineColor: RULE }], margin: [0, 5.5, 0, 0] },
      7
    ),
    margin: [0, 8, 0, 7]
  }
}

function entry({ period, title, subtitle, body }) {
  return row({ text: period, style: 'period' }, [
    { text: title, style: 'title' },
    { text: subtitle, style: 'subtitle', margin: [0, 1, 0, 0] },
    { text: body, style: 'body', margin: [0, 2, 0, 0] }
  ])
}

function headed(heading, body) {
  return row({ text: heading, style: 'heading' }, { text: body, style: 'body' }, 6)
}

const strip = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

export function buildCvDocDefinition({ t, links, config, publications, profile, photo }) {
  const contacts = [
    [t.field.place, config.location],
    ['Web', strip(links.site), links.site],
    ['LinkedIn', strip(links.linkedin), links.linkedin],
    ['GitHub', strip(links.github), links.github],
    ['Scholar', 'Google Scholar profile', links.scholar],
    ['ORCID', strip(links.orcid).replace('orcid.org/', ''), links.orcid]
  ]

  const header = {
    columns: [
      {
        width: LEFT,
        stack: photo ? [{ image: photo, width: 84, alignment: 'right' }] : [{ text: '' }]
      },
      {
        width: RIGHT,
        stack: [
          { text: `${profile.name}, ${profile.suffix}`, style: 'name' },
          { text: t.heroRole, style: 'role', margin: [0, 3, 0, 9] },
          {
            table: {
              widths: [46, '*'],
              body: contacts.map(([label, value, link]) => [
                { text: label, style: 'contactLabel' },
                { text: value, style: 'contact', ...(link ? { link } : {}) }
              ])
            },
            layout: { defaultBorder: false, paddingLeft: () => 0, paddingRight: () => 6, paddingTop: () => 0.6, paddingBottom: () => 0.6 }
          }
        ]
      }
    ],
    columnGap: GAP,
    margin: [0, 0, 0, 6]
  }

  const pubs = [...publications].sort((a, b) => Number(b.year) - Number(a.year))

  const content = [
    header,

    section(t.cvProfileTitle),
    row(null, { text: t.heroIntro, style: 'body' }, 2),

    section(t.experienceTitle),
    ...t.experience.map((job) => entry({ period: job.period, title: job.role, subtitle: job.org, body: job.text })),

    section(t.educationTitle),
    ...t.education.map((edu) => entry({ period: edu.period, title: edu.degree, subtitle: edu.org, body: edu.text })),

    section(t.researchTitle),
    ...t.researchTopics.map((topic) => headed(topic.title, topic.text)),

    section(t.pubsTitle),
    ...pubs.map((pub) =>
      row({ text: pub.year, style: 'period' }, [
        { text: pub.title, style: 'pubTitle' },
        { text: pub.authors, style: 'small', margin: [0, 1, 0, 0] },
        { text: pub.venue, style: 'smallItalic', margin: [0, 1, 0, 0] }
      ], 7)
    ),
    row(null, { text: `${t.pubsNote}: ${strip(links.scholar)}`, link: links.scholar, style: 'smallItalic' }, 2),

    section(t.cvInterestsTitle),
    headed(t.astroTitle, t.astroText),
    headed(t.musicTitle, t.musicText)
  ]

  return {
    info: {
      title: `${profile.name} — CV`,
      author: profile.name,
      subject: 'Curriculum Vitae'
    },
    pageSize: 'A4',
    pageMargins: [MARGIN_X, 36, MARGIN_X, 36],
    defaultStyle: { font: 'Roboto', fontSize: 9, color: INK, lineHeight: 1.22 },
    styles: {
      name: { fontSize: 21, bold: true, characterSpacing: -0.2 },
      role: { fontSize: 10, color: SOFT },
      contactLabel: { fontSize: 8.3, bold: true, color: INK },
      contact: { fontSize: 8.3, color: SOFT },
      section: { fontSize: 9, bold: true, characterSpacing: 1 },
      period: { fontSize: 8.5, italics: true, color: MUTED },
      heading: { fontSize: 9, bold: true },
      title: { fontSize: 10, bold: true },
      subtitle: { fontSize: 9, italics: true, color: SOFT },
      body: { fontSize: 9, color: SOFT },
      pubTitle: { fontSize: 9, bold: true },
      small: { fontSize: 8.3, color: MUTED },
      smallItalic: { fontSize: 8.3, italics: true, color: MUTED }
    },
    content
  }
}
