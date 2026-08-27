module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // FSD-aware scope enforcement (optional scope, but must be from allowed list when present)
    'scope-enum': [
      2,
      'always',
      [
        'app',        // App Router routes and layouts
        'entities',   // Business entities (data models, repositories)
        'features',   // User interactions (auth, forms)
        'shared',     // Reusable utilities (ui, lib, api, config, types)
        'widgets',    // Composite UI blocks (page sections)
        'config',     // Configuration files (biome, commitlint, etc.)
        'deps',       // Dependency updates
        'ci',         // CI/CD configuration
        'release',    // Release management
        'tests',      // Test infrastructure
      ],
    ],
    'subject-case': [2, 'never', ['upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
};
