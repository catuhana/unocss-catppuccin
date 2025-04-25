import { globalIgnores } from 'eslint/config';

import { default as js } from '@eslint/js';
import * as ts from 'typescript-eslint';

import { default as json } from '@eslint/json';
import yaml from 'eslint-plugin-yml';
import { default as markdown } from '@eslint/markdown';

export default ts.config([
  globalIgnores(['docs']),
  { name: 'JavaScript', files: ['**/*.{m,}js'], ...js.configs.recommended },
  {
    name: 'TypeScript',
    files: ['**/*.{m,}ts'],
    // Use `typeChecked` variants?
    extends: [ts.configs.strict, ts.configs.stylistic],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    name: 'YAML',
    extends: [/** @type {any} */ (yaml.configs['flat/standard'])],
    rules: { 'yml/quotes': 'off' },
  },
  {
    name: 'JSONC',
    files: ['**/*.json'],
    language: 'json/jsonc',
    ...json.configs.recommended,
  },
  {
    name: 'Markdown',
    files: ['**/*.md'],
    language: 'markdown/markdown',
    extends: [markdown.configs.recommended],
  },
  {
    name: 'README',
    files: ['README.md'],
    language: 'markdown/gfm',
    extends: [markdown.configs.recommended],
  },
]);
