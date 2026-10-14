// CV layout: large name and accent role on top with the portrait on the right,
// then sections separated by thin rules, with the section name in a narrow left
// column and the content (bulleted where it fits) on the right.
// Colours follow the site tokens in src/style.css; the font is Instrument Sans.

export const CV_FONT = 'InstrumentSans'

const INK = '#111113'
const SOFT = '#3B3C40'
const MUTED = '#75767B'
const ACCENT = '#E0472F'
const RULE = '#EBD3CD' // light tint of the accent

const PAGE_WIDTH = 595.28 // A4
const MARGIN_X = 46
const CONTENT = PAGE_WIDTH - 2 * MARGIN_X
const LEFT = 104 // section-name column
const GAP = 16
const RIGHT = CONTENT - LEFT - GAP
const PHOTO_W = 92

const strip = (url) => url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')

const rule = (width, color, lineWidth, margin) => ({
  canvas: [{ type: 'line', x1: 0, y1: 0, x2: width, y2: 0, lineWidth, lineColor: color }],
  margin
})

function section(title, body, first = false) {
  return [
    first ? null : rule(CONTENT, RULE, 0.8, [0, 12, 0, 12]),
    {
      columns: [
        { width: LEFT, text: title, style: 'section' },
        { width: RIGHT, stack: [].concat(body) }
      ],
      columnGap: GAP,
      unbreakable: true // never split a section across pages
    }
  ].filter(Boolean)
}

const bullets = (items) => ({ ul: items, style: 'body', markerColor: ACCENT, margin: [2, 3, 0, 0] })

function entry({ head, sub, period, body }, last) {
  return {
    stack: [
      { text: head, style: 'entryHead' },
      { text: [sub, { text: `  |  ${period}`, color: MUTED }], style: 'entrySub', margin: [0, 1, 0, 0] },
      bullets([body])
    ],
    margin: [0, 0, 0, last ? 0 : 9],
    unbreakable: true
  }
}

const labelled = (label, text) => ({ text: [{ text: `${label}: `, style: 'strong' }, text] })

export function buildCvDocDefinition({ t, links, config, publications, profile, photo }) {
  const contact = (label, value, link) => [
    { text: `${label}: `, color: ACCENT, style: 'strong' },
    link ? { text: value, link } : value
  ]
  const sep = { text: '   |   ', color: RULE }
  const contactLines = [
    [contact('Web', strip(links.site), links.site), sep, contact(t.field.place, config.cvLocation)],
    [contact('GitHub', strip(links.github), links.github), sep, contact('Scholar', 'Google Scholar', links.scholar)]
  ].map((parts) => ({ text: parts.flat(), style: 'contact', margin: [0, 0, 0, 2] }))

  const header = {
    columns: [
      {
        width: '*',
        stack: [
          { text: profile.name, style: 'name' },
          { text: `${profile.suffix} · ${t.homeRole}`, style: 'role', margin: [0, 4, 0, 10] },
          ...contactLines,
          rule(64, ACCENT, 1.2, [0, 10, 0, 0])
        ]
      },
      photo ? { width: PHOTO_W, image: photo, fit: [PHOTO_W, PHOTO_W * 1.15] } : { width: 0, text: '' }
    ],
    columnGap: GAP,
    margin: [0, 0, 0, 18]
  }

  const pubs = [...publications].sort((a, b) => Number(b.year) - Number(a.year))

  const content = [
    header,

    ...section(t.cvProfileTitle, { text: t.heroIntro, style: 'body', alignment: 'justify' }, true),

    ...section(
      t.experienceTitle,
      t.experience.map((job, i) =>
        entry({ head: job.org, sub: job.role, period: job.period, body: job.text }, i === t.experience.length - 1)
      )
    ),

    ...section(
      t.educationTitle,
      t.education.map((edu, i) =>
        entry({ head: edu.org, sub: edu.degree, period: edu.period, body: edu.text }, i === t.education.length - 1)
      )
    ),

    ...section(t.researchTitle, bullets(t.researchTopics.map((topic) => labelled(topic.title, topic.text)))),

    ...section(t.pubsTitle, [
      bullets(
        pubs.map((pub) => ({
          stack: [
            { text: pub.title, style: 'strong' },
            { text: pub.authors, style: 'small' },
            { text: `${pub.venue} · ${pub.year}`, style: 'smallItalic', margin: [0, 0, 0, 4] }
          ]
        }))
      ),
      { text: `${t.pubsNote}: ${strip(links.scholar)}`, link: links.scholar, style: 'smallItalic', margin: [0, 2, 0, 0] }
    ]),

    ...section(t.cvInterestsTitle, bullets([labelled(t.astroTitle, t.astroText), labelled(t.musicTitle, t.musicText)]))
  ]

  return {
    info: {
      title: `${profile.name} — CV`,
      author: profile.name,
      subject: 'Curriculum Vitae'
    },
    pageSize: 'A4',
    pageMargins: [MARGIN_X, 40, MARGIN_X, 40],
    defaultStyle: { font: CV_FONT, fontSize: 9.5, color: SOFT, lineHeight: 1.28 },
    styles: {
      name: { fontSize: 32, color: INK, characterSpacing: -0.6, lineHeight: 1 },
      role: { fontSize: 12.5, color: ACCENT, bold: true },
      contact: { fontSize: 9, color: SOFT },
      section: { fontSize: 11.5, bold: true, color: INK, lineHeight: 1.1 },
      entryHead: { fontSize: 10.5, bold: true, color: INK },
      entrySub: { fontSize: 9.5, italics: true, color: SOFT },
      body: { fontSize: 9.5, color: SOFT },
      strong: { bold: true, color: INK },
      small: { fontSize: 8.8, color: MUTED },
      smallItalic: { fontSize: 8.8, italics: true, color: MUTED }
    },
    content
  }
}
