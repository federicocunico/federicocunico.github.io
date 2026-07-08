const ACCENT = '#8B7355'
const INK = '#1C1A17'
const MUTED = '#5C574F'

function sectionTitle(text) {
  return {
    text: text.toUpperCase(),
    style: 'sectionHeader',
    margin: [0, 16, 0, 8]
  }
}

function timelineEntry({ period, title, subtitle, body }) {
  return {
    columns: [
      { width: 72, text: period, style: 'period' },
      {
        width: '*',
        stack: [
          { text: title, style: 'entryTitle' },
          { text: subtitle, style: 'entrySub' },
          { text: body, style: 'entryBody', margin: [0, 3, 0, 0] }
        ]
      }
    ],
    columnGap: 12,
    margin: [0, 0, 0, 10]
  }
}

function publicationEntry(pub, index) {
  return {
    margin: [0, 0, 0, 8],
    stack: [
      {
        text: `${index + 1}. ${pub.title}`,
        style: 'pubTitle'
      },
      { text: pub.authors, style: 'pubAuthors', margin: [0, 2, 0, 0] },
      {
        text: `${pub.venue} · ${pub.year}`,
        style: 'pubVenue',
        margin: [0, 2, 0, 0]
      }
    ]
  }
}

export function buildCvDocDefinition({ t, links, config, publications, profile }) {
  const contactLine = [
    config.location,
    links.linkedin,
    links.scholar,
    links.github,
    links.orcid
  ].join('  ·  ')

  const content = [
    {
      columns: [
        {
          width: '*',
          stack: [
            { text: profile.name, style: 'name' },
            { text: profile.suffix, style: 'suffix' },
            { text: t.heroRole, style: 'role', margin: [0, 6, 0, 0] },
            { text: t.heroTag, style: 'tag', margin: [0, 4, 0, 0] }
          ]
        }
      ]
    },
    { text: contactLine, style: 'contact', margin: [0, 10, 0, 0] },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 495, y2: 0, lineWidth: 1, lineColor: ACCENT }], margin: [0, 12, 0, 0] },

    sectionTitle(t.researchTitle),
    { text: t.heroIntro, style: 'body', margin: [0, 0, 0, 8] },
    ...t.researchTopics.map((topic) => ({
      margin: [0, 0, 0, 6],
      stack: [
        { text: topic.title, style: 'topicTitle' },
        { text: topic.text, style: 'topicBody', margin: [0, 2, 0, 0] }
      ]
    })),

    sectionTitle(t.experienceTitle),
    ...t.experience.map((job) =>
      timelineEntry({
        period: job.period,
        title: job.role,
        subtitle: job.org,
        body: job.text
      })
    ),

    sectionTitle(t.educationTitle),
    ...t.education.map((edu) =>
      timelineEntry({
        period: edu.period,
        title: edu.degree,
        subtitle: edu.org,
        body: edu.text
      })
    ),

    sectionTitle(t.pubsTitle),
    ...publications.map((pub, index) => publicationEntry(pub, index)),
    {
      text: `${t.pubsNote}: ${links.scholar}`,
      style: 'footnote',
      margin: [0, 4, 0, 0]
    }
  ]

  return {
    info: {
      title: `${profile.name} — CV`,
      author: profile.name,
      subject: 'Curriculum Vitae'
    },
    pageSize: 'A4',
    pageMargins: [48, 48, 48, 48],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 9.5,
      color: INK,
      lineHeight: 1.25
    },
    styles: {
      name: { fontSize: 24, bold: true, color: INK },
      suffix: { fontSize: 11, color: MUTED, margin: [0, -2, 0, 0] },
      role: { fontSize: 10.5, color: ACCENT, bold: true },
      tag: { fontSize: 9.5, italics: true, color: MUTED },
      contact: { fontSize: 8.5, color: MUTED },
      sectionHeader: {
        fontSize: 8.5,
        bold: true,
        color: ACCENT,
        characterSpacing: 1.2
      },
      body: { fontSize: 9.5, color: '#333333' },
      topicTitle: { fontSize: 10, bold: true },
      topicBody: { fontSize: 9, color: MUTED },
      period: { fontSize: 8.5, color: MUTED },
      entryTitle: { fontSize: 10.5, bold: true },
      entrySub: { fontSize: 9.5, italics: true, color: '#444444' },
      entryBody: { fontSize: 9, color: MUTED },
      pubTitle: { fontSize: 9.5, bold: true },
      pubAuthors: { fontSize: 8.5, color: MUTED },
      pubVenue: { fontSize: 8.5, italics: true, color: '#555555' },
      footnote: { fontSize: 8, color: MUTED, italics: true }
    },
    content
  }
}
