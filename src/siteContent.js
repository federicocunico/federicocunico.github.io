// Shared bilingual content — edit this file to update the site.
// Every string in CONTENT exists in both `en` and `it`.
// Media lists (ASTRO, PHOTOGRAPHY, MUSIC) point at files under public/<section>/.

export const CONTENT = {
  en: {
    nav: { home: 'Index', research: 'Research', astro: 'Astrophotography', photo: 'Photography', music: 'Music', cv: 'CV' },
    navShort: { home: 'Index', research: 'Research', astro: 'Astro', photo: 'Photo', music: 'Music', cv: 'CV' },
    pageTitle: { home: 'Federico Cunico — Portfolio', research: 'Research', astro: 'Astrophotography', photo: 'Photography', music: 'Music', cv: 'Curriculum Vitae', notFound: 'Page not found' },
    themeLight: 'Light theme',
    themeDark: 'Dark theme',
    close: 'Close',

    // Home
    homeKicker: 'Portfolio',
    homeIntro: 'My interests are in computer vision and deep learning applied to human analysis, ranging from industrial human-robot collaboration and recently to clinical psychology. Outside the lab I have passion for photography, music, videogames and role play games.',
    homeRoleLabel: 'Role',
    homeRole: 'Machine Learning Engineer & Researcher',
    homeEduLabel: 'Education',
    homeEdu: 'PhD in Computer Science',
    homeStatusLabel: 'Status',
    openTo: 'Open to collaborations',
    portraitCaption: 'Fig. 0 — Portrait',
    indexHead: { n: 'No.', section: 'Section', content: 'Content', preview: 'Preview' },
    indexResearch: 'My PhD was on computer vision and deep learning for industrial human-robot collaboration and scene analysis. Recently, I moved to clinical psychology, applying computer vision techniques and deep learning models to psychotherapeutic assessment.',
    indexAstro: 'I have the passion for Astronomy and Astrophotography of Nebulae, clusters and galaxies. Here you can find my amateur images.',
    indexPhoto: 'Series and single frames.',
    indexMusic: 'Some of my music works.',
    indexCv: 'Experience, education and publications.',
    indexVenues: 'Conferences and journals',

    // Research (keys also used by the CV generator)
    heroRole: 'Researcher in Computer Vision & AI · Machine Learning and Software Engineer',
    heroTag: 'PhD in Computer Science',
    heroIntro: 'My work focuses on computer vision and deep learning with humans at the center. I previously worked on human-robot collaboration, and now I am exploring applications in clinical psychology. I am also a full-stack software engineer, comfortable from research prototypes to production systems.',
    researchTitle: 'Research',
    researchKicker: 'Computer Vision · Deep Learning · Software',
    researchIntro: 'My research focuses on making machines understand people, and helping people to get understood.',
    topicsTitle: 'Topics',
    researchTopics: [
      { title: 'Human-Robot Interaction', text: 'Human-centered analysis of industrial scenes: pose forecasting, safety and cooperation between people and robots on the factory floor.' },
      { title: 'Computer Vision & Deep Learning', text: 'Applying vision and deep learning to various domains, from industrial applications to clinical psychology.' },
      { title: 'Psychological Applications', text: 'Investigating the dyadic synchronization in therapeutic settings, using computer science and deep learning techniques.' }
    ],
    pubsTitle: 'Selected publications',
    pubsNote: 'Full list on Google Scholar',
    pubsLive: 'Updated from Semantic Scholar',
    citations: 'citations',
    experienceTitle: 'Experience',
    experience: [
      { role: 'Machine Learning Specialist', org: 'Humatics s.r.l., Verona', period: '2026 — now', text: 'Applying machine learning techniques to solve real-world industrial problems: from computer vision to natural language processing.' },
      { role: 'Postdoctoral Researcher', org: 'University of Verona — ALTAIR Lab & Intelligo Labs', period: '2024 — 2025', text: 'Computer vision and deep learning applied to surgical robotics.' },
      { role: 'AI Software Engineer', org: 'Humatics s.r.l., Verona', period: 'Feb 2020 — Oct 2021', text: 'Computer vision algorithms for industrial applications, in particular surveillance video analysis.' }
    ],
    educationTitle: 'Education',
    education: [
      { degree: 'PhD in Computer Science', org: 'University of Verona', period: '2021 — 2024', text: 'Human-centered scene analysis in industrial environments. Visiting researcher at the University of Glasgow (6 months) and Leibniz University Hannover (3 months).' },
      { degree: 'State Exam — Information Engineer (Sez. A)', org: 'Italy', period: '2020', text: 'Qualification to practice as an Information Engineer, with full marks.' },
      { degree: "Master's Degree in Computer Science and Engineering", org: 'University of Verona', period: '2017 — 2019', text: 'Curriculum Visual Computing. Thesis on deep learning for 6-DoF object pose estimation in industrial scenarios.' },
      { degree: "Bachelor's Degree in Bioinformatics", org: 'University of Verona', period: '2014 — 2017', text: 'Computer science, statistics and biology.' }
    ],
    cvLink: 'Full CV',

    // CV
    cvTitle: 'Curriculum Vitae',
    cvKicker: (date) => `Updated ${date} · generated from this site`,
    cvText: 'Generated automatically from the content of this site: what you read here is what you download.',
    cvDownload: 'Download PDF',
    cvOther: 'Italian version',
    cvProfileTitle: 'Profile',
    cvInterestsTitle: 'Interests',
    cvLinksTitle: 'Links',
    cvAllPubs: 'All publications',
    cvPreviewTitle: 'PDF preview',
    cvOpen: 'Open the PDF',
    cvFallback: 'Your browser cannot show the PDF here.',

    // Astrophotography
    astroTitle: 'Astrophotography',
    astroText: 'Since August 2024 I photograph the deep sky — nebulae, clusters and galaxies — learning new acquisition and processing techniques with every clear night.',
    astroStats: (n, h) => `${String(n).padStart(2, '0')} objects — ${h} h of integration — since 08.2024`,
    astroLatest: 'Latest capture',
    astroOpen: 'Open full resolution',
    astroHint: 'Click to enlarge · originals load on demand',
    filters: { all: 'All', nebula: 'Nebulae', cluster: 'Clusters', galaxy: 'Galaxies' },
    types: { emission: 'Emission nebula', dark: 'Dark nebula', snr: 'Supernova remnant', globular: 'Globular cluster', open: 'Open cluster', spiral: 'Spiral galaxy' },
    field: { type: 'Type', date: 'Date', integration: 'Integration', equipment: 'Equipment', place: 'Place', year: 'Year' },
    downloadOriginal: 'Download original',
    prev: 'Previous',
    next: 'Next',

    // Photography
    photoTitle: 'Photography',
    photoText: 'Series and single frames, outside the telescope.',
    photoAll: 'All',
    photoMeta: (series, n) => `${String(series).padStart(2, '0')} series — ${String(n).padStart(2, '0')} images`,
    photoEmpty: 'The gallery is being prepared. New series will appear here.',

    // Music
    musicTitle: 'Music',
    musicKicker: 'Guitar · Composition · Production',
    musicText: 'I play the guitar and write music. In January 2025 I released “Legacy”, an album collecting ten years of my work (2012–2022).',
    album: 'Album',
    tracks: 'tracks',
    trackHead: { n: 'No.', title: 'Title', duration: 'Duration' },
    playAlbum: 'Play the album',
    pause: 'Pause',
    musicLink: 'SoundCloud',
    musicStreamNote: 'Streamed from this site · nothing is downloaded until you press play',
    musicEmpty: 'Tracks coming soon to this page. In the meantime the album is on SoundCloud.',

    // Footer
    contactTitle: 'Contact',
    contactCta: 'Write to me on LinkedIn',
    contactText: 'For collaborations, research or professional opportunities.',
    profiles: 'Profiles',
    notFoundText: 'This page does not exist.',
    backHome: 'Back to the index'
  },

  it: {
    nav: { home: 'Indice', research: 'Ricerca', astro: 'Astrofotografia', photo: 'Fotografia', music: 'Musica', cv: 'CV' },
    navShort: { home: 'Indice', research: 'Ricerca', astro: 'Astro', photo: 'Foto', music: 'Musica', cv: 'CV' },
    pageTitle: { home: 'Federico Cunico — Portfolio', research: 'Ricerca', astro: 'Astrofotografia', photo: 'Fotografia', music: 'Musica', cv: 'Curriculum Vitae', notFound: 'Pagina non trovata' },
    themeLight: 'Tema chiaro',
    themeDark: 'Tema scuro',
    close: 'Chiudi',

    homeKicker: 'Portfolio',
    homeIntro: 'I miei interessi riguardano la computer vision e il deep learning applicati all’analisi dell’essere umano, dalla collaborazione uomo-robot in ambito industriale fino, di recente, alla psicologia clinica. Fuori dal laboratorio ho la passione per la fotografia, la musica, i videogiochi e i giochi di ruolo.',
    homeRoleLabel: 'Ruolo',
    homeRole: 'Ingegnere di Machine Learning e Ricercatore',
    homeEduLabel: 'Formazione',
    homeEdu: 'Dottorato di ricerca in Informatica',
    homeStatusLabel: 'Stato',
    openTo: 'Aperto a collaborazioni',
    portraitCaption: 'Fig. 0 — Ritratto',
    indexHead: { n: 'N.', section: 'Sezione', content: 'Contenuto', preview: 'Anteprima' },
    indexResearch: 'Il mio dottorato riguarda computer vision e deep learning per la collaborazione uomo-robot in ambito industriale e l’analisi di scene. Di recente mi sono spostato sulla psicologia clinica, applicando tecniche di computer vision e modelli di deep learning alla valutazione psicoterapeutica.',
    indexAstro: 'Ho la passione per l’astronomia e l’astrofotografia di nebulose, ammassi e galassie. Qui trovi le mie immagini amatoriali.',
    indexPhoto: 'Serie e scatti singoli.',
    indexMusic: 'Alcuni dei miei lavori musicali.',
    indexCv: 'Esperienza, formazione e pubblicazioni.',
    indexVenues: 'Conferenze e riviste',

    heroRole: 'Ricercatore in Computer Vision e IA · Ingegnere di Machine Learning e del software',
    heroTag: 'Dottorato di ricerca in Informatica',
    heroIntro: 'Il mio lavoro si concentra su computer vision e deep learning con le persone al centro. In passato mi sono occupato di collaborazione uomo-robot, e ora sto esplorando applicazioni nella psicologia clinica. Sono anche ingegnere del software full-stack, a mio agio dal prototipo di ricerca ai sistemi in produzione.',
    researchTitle: 'Ricerca',
    researchKicker: 'Computer Vision · Deep Learning · Software',
    researchIntro: 'La mia ricerca punta a far comprendere le persone alle macchine, e ad aiutare le persone a farsi comprendere.',
    topicsTitle: 'Temi',
    researchTopics: [
      { title: 'Interazione uomo-robot', text: 'Analisi di scene industriali centrata sull’uomo: previsione della posa, sicurezza e cooperazione tra persone e robot in fabbrica.' },
      { title: 'Computer Vision e Deep Learning', text: 'Applicazione di visione artificiale e deep learning a diversi ambiti, dalle applicazioni industriali alla psicologia clinica.' },
      { title: 'Applicazioni psicologiche', text: 'Studio della sincronizzazione diadica in contesti terapeutici, con tecniche di informatica e deep learning.' }
    ],
    pubsTitle: 'Pubblicazioni selezionate',
    pubsNote: 'Elenco completo su Google Scholar',
    pubsLive: 'Aggiornate da Semantic Scholar',
    citations: 'citazioni',
    experienceTitle: 'Esperienza',
    experience: [
      { role: 'Specialista di Machine Learning', org: 'Humatics s.r.l., Verona', period: '2026 — oggi', text: 'Applicazione di tecniche di machine learning a problemi industriali reali: dalla computer vision all’elaborazione del linguaggio naturale.' },
      { role: 'Ricercatore post-doc', org: 'Università di Verona — ALTAIR Lab & Intelligo Labs', period: '2024 — 2025', text: 'Computer vision e deep learning applicati alla robotica chirurgica.' },
      { role: 'AI Software Engineer', org: 'Humatics s.r.l., Verona', period: 'Feb 2020 — Ott 2021', text: 'Algoritmi di computer vision per applicazioni industriali, in particolare analisi di video di sorveglianza.' }
    ],
    educationTitle: 'Formazione',
    education: [
      { degree: 'Dottorato di ricerca in Informatica', org: 'Università di Verona', period: '2021 — 2024', text: 'Analisi di scene industriali centrata sull’uomo. Visiting researcher all’Università di Glasgow (6 mesi) e alla Leibniz Universität Hannover (3 mesi).' },
      { degree: 'Esame di Stato — Ingegnere dell’Informazione (Sez. A)', org: 'Italia', period: '2020', text: 'Abilitazione alla professione di Ingegnere dell’Informazione, con il massimo dei voti.' },
      { degree: 'Laurea magistrale in Ingegneria e Scienze Informatiche', org: 'Università di Verona', period: '2017 — 2019', text: 'Curriculum Visual Computing. Tesi su deep learning per la stima della posa 6-DoF di oggetti in scenari industriali.' },
      { degree: 'Laurea triennale in Bioinformatica', org: 'Università di Verona', period: '2014 — 2017', text: 'Informatica, statistica e biologia.' }
    ],
    cvLink: 'CV completo',

    cvTitle: 'Curriculum Vitae',
    cvKicker: (date) => `Aggiornato il ${date} · generato da questo sito`,
    cvText: 'Generato automaticamente dai contenuti di questo sito: quello che leggi qui è quello che scarichi.',
    cvDownload: 'Scarica il PDF',
    cvOther: 'Versione inglese',
    cvProfileTitle: 'Profilo',
    cvInterestsTitle: 'Interessi',
    cvLinksTitle: 'Collegamenti',
    cvAllPubs: 'Tutte le pubblicazioni',
    cvPreviewTitle: 'Anteprima PDF',
    cvOpen: 'Apri il PDF',
    cvFallback: 'Il browser non riesce a mostrare il PDF qui.',

    astroTitle: 'Astrofotografia',
    astroText: 'Da agosto 2024 fotografo il cielo profondo — nebulose, ammassi e galassie — imparando nuove tecniche di acquisizione ed elaborazione a ogni notte serena.',
    astroStats: (n, h) => `${String(n).padStart(2, '0')} oggetti — ${h} h di integrazione — dal 08.2024`,
    astroLatest: 'Ultima acquisizione',
    astroOpen: 'Apri a piena risoluzione',
    astroHint: 'Clic per ingrandire · originali caricati su richiesta',
    filters: { all: 'Tutte', nebula: 'Nebulose', cluster: 'Ammassi', galaxy: 'Galassie' },
    types: { emission: 'Nebulosa a emissione', dark: 'Nebulosa oscura', snr: 'Resto di supernova', globular: 'Ammasso globulare', open: 'Ammasso aperto', spiral: 'Galassia a spirale' },
    field: { type: 'Tipo', date: 'Data', integration: 'Integrazione', equipment: 'Strumenti', place: 'Luogo', year: 'Anno' },
    downloadOriginal: 'Scarica l’originale',
    prev: 'Precedente',
    next: 'Successiva',

    photoTitle: 'Fotografia',
    photoText: 'Serie e scatti singoli, lontano dal telescopio.',
    photoAll: 'Tutte',
    photoMeta: (series, n) => `${String(series).padStart(2, '0')} serie — ${String(n).padStart(2, '0')} immagini`,
    photoEmpty: 'La galleria è in preparazione. Le nuove serie compariranno qui.',

    musicTitle: 'Musica',
    musicKicker: 'Chitarra · Composizione · Produzione',
    musicText: 'Suono la chitarra e scrivo musica. A gennaio 2025 ho pubblicato “Legacy”, un album che raccoglie dieci anni di lavori (2012–2022).',
    album: 'Album',
    tracks: 'tracce',
    trackHead: { n: 'N.', title: 'Titolo', duration: 'Durata' },
    playAlbum: 'Ascolta l’album',
    pause: 'Pausa',
    musicLink: 'SoundCloud',
    musicStreamNote: 'Audio in streaming dal sito · nessun file scaricato finché non premi play',
    musicEmpty: 'Le tracce arriveranno presto su questa pagina. Nel frattempo l’album è su SoundCloud.',

    contactTitle: 'Contatti',
    contactCta: 'Scrivimi su LinkedIn',
    contactText: 'Per collaborazioni, ricerca o opportunità professionali.',
    profiles: 'Profili',
    notFoundText: 'Questa pagina non esiste.',
    backHome: 'Torna all’indice'
  }
}

export const CONFIG = {
  // CV PDFs are generated at build time from this file (npm run generate:cv)
  cvPdf: { en: '/research/cv-en.pdf', it: '/research/cv-it.pdf' },
  portrait: { small: '/profile/portrait-640.webp', large: '/profile/portrait-1280.webp' },
  scholarAuthorName: 'Federico Cunico',
  pubsCount: 5,
  location: 'Verona, Italy'
}

export const PROFILE = {
  name: 'Federico Cunico',
  suffix: 'PhD'
}

// Offline fallback — the live list comes from Semantic Scholar at runtime.
export const PUBLICATIONS = [
  { authors: 'Cunico F., Carletti M., Cristani M., Masci F., Conigliaro D.', title: '6D Pose Estimation for Industrial Applications', venue: 'International Conference on Image Analysis and Processing (ICIAP)', short: 'ICIAP', year: '2019' },
  { authors: 'Cunico F., Capogrosso L., Setti F., Carra D., Fummi F., Cristani M.', title: 'I-SPLIT: Deep Network Interpretability for Split Computing', venue: 'International Conference on Pattern Recognition (ICPR)', short: 'ICPR', year: '2022' },
  { authors: 'Sampieri A., D’Amely di Melendugno G. M., Avogaro A., Cunico F., Setti F., Skenderi G., Cristani M., Galasso F.', title: 'Pose Forecasting in Industrial Human-Robot Collaboration', venue: 'European Conference on Computer Vision (ECCV)', short: 'ECCV', year: '2022' }
]

// Astrophotography — original in public/astro/full/<file>; the thumbnail
// public/astro/thumbs/<name>.webp is generated by `npm run media`.
// group: nebula | cluster | galaxy (filters) · type: key of CONTENT.*.types
export const ASTRO = [
  { file: 'NGC2024-FlameNebula.jpg', title: 'Flame Nebula', catalog: 'NGC 2024', group: 'nebula', type: 'emission', date: '2024-12-24', integration: 3, equipment: 'SV550 80mm Apo · Celestron NexStar 130 · SVBony 705c' },
  { file: 'HorseNebula.jpg', title: 'Horsehead Nebula', catalog: 'Barnard 33', group: 'nebula', type: 'dark', date: '2024-12-16', integration: 3, equipment: 'SeeStar S50' },
  { file: 'M1-Crab.jpg', title: 'Crab Nebula', catalog: 'M1', group: 'nebula', type: 'snr', date: '2024-12-16', integration: 3, equipment: 'SeeStar S50' },
  { file: 'M3-cluster.jpg', title: 'Globular Cluster', catalog: 'M3', group: 'cluster', type: 'globular', date: '2024-12-16', integration: 3, equipment: 'SeeStar S50' },
  { file: 'M33-triangulum.jpg', title: 'Triangulum Galaxy', catalog: 'M33', group: 'galaxy', type: 'spiral', date: '2024-12-16', integration: 2, equipment: 'SeeStar S50' },
  { file: 'M45-Pleiadis.jpg', title: 'Pleiades', catalog: 'M45', group: 'cluster', type: 'open', date: '2024-12-16', integration: 1, equipment: 'SeeStar S50' },
  { file: 'M45-Pleiadis-3h.jpg', title: 'Pleiades — 3 h', catalog: 'M45', group: 'cluster', type: 'open', date: '2024-12-16', integration: 3, equipment: 'SeeStar S50' },
  { file: 'RosettaNebula.jpg', title: 'Rosette Nebula', catalog: 'NGC 2237', group: 'nebula', type: 'emission', date: '2024-12-16', integration: 3, equipment: 'SeeStar S50' }
]

// Photography — one entry per series. Put originals in
// public/photography/<id>/full/<file>; thumbnails are generated by `npm run media`.
// Example:
// { id: 'dolomiti', title: { en: 'Dolomites', it: 'Dolomiti' }, items: [
//   { file: '01.jpg', title: 'Tre Cime', place: 'Belluno', year: '2025' } ] }
export const PHOTOGRAPHY = []

// Music — audio files in public/music/<album id>/<file>, streamed with preload="none".
// `duration` (seconds) is optional: it is read from the file when it starts playing.
// Example track: { title: 'Title', file: '01-title.mp3', duration: 222 }
export const MUSIC = [
  {
    id: 'legacy',
    title: 'Legacy',
    released: { en: 'January 2025', it: 'gennaio 2025' },
    span: '2012—2022',
    soundcloud: 'https://soundcloud.com/incomplete-sounds/sets/legacy',
    tracks: []
  }
]

export const LINKS = {
  scholar: 'https://scholar.google.it/citations?user=fvOYgyAAAAAJ',
  github: 'https://github.com/federicocunico',
  linkedin: 'https://www.linkedin.com/in/federico-cunico/',
  soundcloud: 'https://soundcloud.com/incomplete-sounds/sets/legacy',
  site: 'https://federicocunico.github.io',
  orcid: 'https://orcid.org/0000-0001-9619-9656'
}
