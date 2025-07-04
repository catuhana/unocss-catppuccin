export default /** @type {Partial<import('typedoc').TypeDocOptions>} */ ({
  entryPoints: ['src'],
  entryPointStrategy: 'Expand',
  out: 'docs',
  cleanOutputDir: true,
  plugin: ['typedoc-material-theme'],
  themeColor: '#f38ba8',
});
