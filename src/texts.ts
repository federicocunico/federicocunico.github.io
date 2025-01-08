// ------------------------------------------------------
// Texts for website personalization
// ------------------------------------------------------

const name = 'Federico Cunico'; // Replace with your name
const position = 'Software Engineer & AI Researcher'; // Replace with your expertise

const _IT_LOCALE = 'it-IT----TODO-finish';

const selfPresentation = (): Array<string> => {
  let locale = getLocale();
  if (locale === _IT_LOCALE) {
    return [
      `Benvenuto sul mio porfolio! Sono uno sviluppatore software con una passione per l'intelligenza aritificale e la computer vision. Ho anche competenze di sviluppo web con Vue.js e Typescript.`,
      `So sviluppare anche backend con Python e C#. Ho una solida preparazione in Ingegneria Informatica e Intelligenza Artificiale, e attualmente lavoro come Ricercatore in Intelligenza Artificiale presso l'Università di Verona.`,
      'Esplora pure il mio lavoro, sono a disposizione per qualsiasi domanda!'
    ]
  }
  else {
    return [
      `Welcome to my portfolio! I am a software developer with a passion for artificial intelligence and computer vision. I also have web development skills with Vue.js and Typescript.`,
      `I can also develop backend with Python and C#. I have a strong background in Computer Engineering and Artificial Intelligence, and I currently work as a Researcher in Artificial Intelligence at the University of Verona.`,
      'Feel free to explore my work and get in touch!'
    ];
  }
}

const bio = (): string => {
  let locale = getLocale();
  if (locale === _IT_LOCALE) {
    return "Ho studiato presso l'Università degli Studi di Verona consguendo la laurea triennale in Bioinformatica e una laurea Magistrale in Ingegneria e Scienze Informatiche, con specializzazione in Computer Vision. Nel 2021 ho intrapreso il percorso del Dottorato di Ricerca in Inforamtica, sempre presso l'Università degli Studi di Verona, e difenderò la mia tesi nei primi mesi del 2025. Il mio lavoro di ricerca si concentra sull'analisi di scene industriali da un punto di vista centrato sull'uomo, investigando l'interazione uomo-robot da diversi punti di vista. Da Ottobre 2024, lavoro come ricercatore a tempo determinato presso il laboratorio ALTAIR dell'Università di Verona, applicando la computer vision alla chirurgia assistita da robot."
  }
  else {
    return "I studied at Univeristy of Verona, obtaining first a Bachelor’s Degree in Bioinformatics, and then a Master’s Degree in Computer Science and Engineering, curriculum Visual Computing. In 2021 I started PhD in Computer Science at the University of Verona, and I am going to defend my thesis in early 2025. My thesis will focus on human-centered scene analysis in industrial environments, investigating human-robot interaction from different perspectives. Since October 2024, I am working in the ALTAIR laboratory of the University of Verona, applying computer vision to robotic assisted surgery."
  }
}

const experiences = (): Array<Experience> => {
  throw Error('Not implemented yet');
  let locale = getLocale();
  if (locale === _IT_LOCALE) {
    return [
    ]
  }
  else {
    return [
      {
        role: 'Assistant Researcher',
        company: 'University of Verona',
        period: 'Oct 2024 - Dec 2025',
        description: ' I am currently working as an Assistant Researcher at the University of Verona, Italy. My research focuses on the development of novel algorithms for robotic assisted medical surgery, in particular from the computer vision perspective.'
      }
    ]
  }
}



// ------------------------------------------------------
// Utils
// ------------------------------------------------------
type Experience = {
  role: string,
  company: string,
  period: string,
  description: string
}

// ------------------------------------------------------
// Locale management
// ------------------------------------------------------
function setLocale(locale: string | null): void {
  // set locale in the browser local storage
  if (locale == null) {
    localStorage.removeItem('locale');
  } else {
    localStorage.setItem('locale', locale);
  }
}

function getLocale(): string {
  // Try to get locale from the browser local storage
  let locale = localStorage.getItem('locale');

  if (locale == null || locale === 'null') {
    // if the locale is not set, use the browser language
    locale = navigator.language;
    console.log('Locale not set, using browser language: ' + locale);
    setLocale(locale);
  }

  return locale;
}

// ------------------------------------------------------
// Export
// ------------------------------------------------------

export { setLocale, getLocale, _IT_LOCALE, name, position, selfPresentation, bio };
