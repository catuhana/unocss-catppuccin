/** @type {import('typedoc').TypeDocOptions} */
export default {
  entryPoints: ['src'],
  entryPointStrategy: 'Expand',
  out: 'docs',
  cleanOutputDir: true,
  plugin: ['typedoc-material-theme'],
  // @ts-expect-error Configuration for the theme above.
  themeColor: '#b47aff',
};
