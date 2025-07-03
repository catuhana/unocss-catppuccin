/** @type {import('prettier').Options} */
export default {
  arrowParens: 'avoid',
  experimentalOperatorPosition: 'start',
  experimentalTernaries: true,
  jsxSingleQuote: true,
  objectWrap: 'collapse',
  singleQuote: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
