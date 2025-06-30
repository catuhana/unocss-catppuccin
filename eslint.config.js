import { globalIgnores } from 'eslint/config';

import { default as js } from '@eslint/js';
import * as ts from 'typescript-eslint';

export default ts.config([
  globalIgnores(['**/dist', '**/docs', '**/.astro']),
  { name: 'JavaScript', files: ['**/*.{m,}js'], ...js.configs.recommended },
  {
    name: 'TypeScript',
    files: ['**/*.{m,}ts'],
    extends: [ts.configs.strictTypeChecked],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_' },
      ],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
