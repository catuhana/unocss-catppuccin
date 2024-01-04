import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  declaration: true,
  externals: ['@unocss/core'],
  rollup: { emitCJS: true, inlineDependencies: true },
});
