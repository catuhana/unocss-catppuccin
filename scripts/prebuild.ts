import('node:fs/promises').then(
  async ({ rm }) => await rm('dist', { recursive: true }),
);
