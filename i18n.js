const NextI18Next = require('next-i18next').default;
const path = require('path');

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['fr'],
  localePath: path.resolve('./public/locales'),
  detection: {
    order: ['cookie', 'header', 'navigator', 'querystring', 'localStorage', 'sessionStorage', 'htmlTag'],
    caches: ['cookie'],
  },
});
