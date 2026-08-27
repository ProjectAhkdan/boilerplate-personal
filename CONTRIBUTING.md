# Contributing to Portfolio

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Architecture Overview](#architecture-overview)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors
- Report unacceptable behavior to the repository maintainers

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** ≥ 20.0.0
- **pnpm** ≥ 9.0.0 (managed via Corepack)
- **Git** with SSH keys configured
- A **Supabase** account (for database access)
- A **GitHub** account

### First-Time Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**

   ```bash
   git clone git@github.com:YOUR_USERNAME/portofolio-v1.git
   cd portofolio-v1
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream git@github.com:ProjectAhkdan/portofolio-v1.git
   ```

4. **Enable pnpm**

   ```bash
   corepack enable
   corepack prepare pnpm@9.15.2 --activate
   ```

5. **Install dependencies**

   ```bash
   pnpm install
   ```

6. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

7. **Run development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Development Setup

### Available Commands

```bash
# Development
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build production bundle
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run Biome linter
pnpm lint:fix     # Auto-fix lint issues
pnpm format       # Format code with Biome
pnpm format:check # Check formatting without changes
pnpm typecheck    # Run TypeScript compiler checks

# Testing
pnpm test         # Run unit tests
pnpm test:watch   # Run tests in watch mode
pnpm test:ui      # Run tests with Vitest UI
pnpm test:e2e     # Run Playwright E2E tests

# Comprehensive Check
pnpm check        # Run format, lint, typecheck, test, and build
```

### Git Hooks

Git hooks run automatically via Husky:

- **Pre-commit**: Lints and formats staged files
- **Commit-msg**: Validates commit message format
- **Pre-push**: Runs typecheck, tests, and build

You can bypass hooks with `--no-verify`, but **this is discouraged** as CI will catch violations anyway.

## Architecture Overview

This project follows **Feature-Sliced Design (FSD)** methodology.

### Directory Structure

```
src/
├── app/          # App Router (routes, layouts)
├── widgets/      # Composite UI blocks (page sections)
├── features/     # User interactions (forms, auth)
├── entities/     # Business entities (models, repositories)
└── shared/       # Reusable utilities (ui, lib, api, config)
```

### FSD Layer Responsibilities

#### `app/` - Application Layer

- Next.js App Router routes
- Root and nested layouts
- Page components
- Route handlers (API routes)

**Can import from:** `widgets`, `features`, `entities`, `shared`

#### `widgets/` - Widgets Layer

- Composite UI blocks (page sections)
- Examples: `ProjectsListWidget`, `ProjectDetailWidget`

**Can import from:** `features`, `entities`, `shared`

#### `features/` - Features Layer

- User interactions and business processes
- Examples: `LoginForm`, `ProjectFilterForm`, `CommentForm`

**Can import from:** `entities`, `shared`

#### `entities/` - Entities Layer

- Business entities (data models)
- Domain-specific UI components
- Repository/API integration
- Examples: `ProjectCard`, `projectRepository`, `projectSchemas`

**Can import from:** `shared`

#### `shared/` - Shared Layer

- Reusable UI primitives (`Button`, `Card`, `Input`)
- Utility functions (`cn`, `slugify`, `formatDate`)
- API clients (`createClient`, `supabaseServer`)
- Configuration (`env`)
- Global types

**Cannot import from any other layer**

### FSD Rules (Critical)

1. **Downward dependencies only**

   ```
   app → widgets → features → entities → shared
   ```

2. **No circular dependencies** between layers

3. **No cross-imports** within the same layer (e.g., `entities/project` cannot import from `entities/user`)

4. **Business logic stays in `entities` and `features`**, not in `shared`

5. **Shared components are generic**, not domain-specific

### Violating FSD Rules

Violations will be caught during code review. Examples of violations:

❌ **Bad:**

```tsx
// shared/ui/project-card.tsx
import { useAuth } from '@/features/auth'; // shared cannot import features
```

✅ **Good:**

```tsx
// entities/project/ui/project-card.tsx
import { Button } from '@/shared/ui/button'; // entities can import shared
```

## Coding Standards

### TypeScript

- **Strict mode enabled** - all strict flags are on
- **No `any` allowed** - use `unknown` or proper types (enforced by Biome)
- **No React array index keys** - use stable IDs (enforced by Biome)
- **Explicit return types** for exported functions (recommended)
- **Path aliases** for imports:

  ```tsx
  import { Button } from '@/shared/ui/button';
  import { ProjectCard } from '@/entities/project';
  ```

### React / Next.js

- Use **React Server Components** by default
- Use `'use client'` directive only when necessary (interactivity, hooks, browser APIs)
- Prefer **composition over prop drilling**
- Use **TypeScript interfaces** for component props
- Use **named exports** for components

  ```tsx
  export function ProjectCard({ title, slug }: ProjectCardProps) {
    // ...
  }
  ```

### Styling

- Use **Tailwind CSS** utility classes
- Use `cn()` helper from `@/shared/lib/cn` for conditional classes
- Use **class-variance-authority** for component variants
- Avoid inline styles unless absolutely necessary
- Follow mobile-first responsive design

  ```tsx
  <div className={cn('flex flex-col gap-4', 'md:flex-row', className)} />
  ```

### Biome Configuration

- **Biome is the sole linter and formatter** - no ESLint, no Prettier
- **Single quotes** for strings (except JSX attributes)
- **2-space indentation**
- **Trailing commas** always
- **Semicolons** always
- **100-character line width**

Run before committing:

```bash
pnpm lint:fix    # Auto-fix issues
pnpm format      # Format code
```

### Accessibility

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, etc.)
- Provide **alt text** for images
- Ensure **keyboard navigation** works
- Use **ARIA attributes** where appropriate
- Test with screen readers when possible

## Git Workflow

### Branch Naming

Use this format:

```
<type>/<scope>/<short-description>
```

**Examples:**

```bash
feat/features/project-filtering
fix/entities/project-schema
refactor/shared/button-component
docs/config/update-contributing
chore/deps/upgrade-biome
```

**Types:** `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

**Scopes:** FSD layers (`app`, `entities`, `features`, `shared`, `widgets`) or meta-scopes (`config`, `deps`, `ci`, `tests`, `release`)

### Commit Messages

Follow **Conventional Commits** format:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Required:**

- `<type>`: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `perf`, `ci`, `build`, `revert`
- `<scope>`: FSD layer or meta-scope (see commitlint config)
- `<subject>`: Brief description in lowercase

**Examples:**

```bash
feat(features): add project filtering by tags
fix(entities): correct project date validation
refactor(shared): simplify modal state management
docs(config): update installation instructions
test(tests): add project repository unit tests
chore(deps): upgrade biome to 2.5.7
ci(ci): add build caching to workflow
```

**Invalid:**

```bash
feat: add filtering         # Missing scope
FEAT(features): Add Filter  # Uppercase
feat(random): add feature   # Invalid scope
```

Commit validation is enforced by `commitlint` via the `commit-msg` hook.

### Pull Request Workflow

1. **Keep `main` up to date**

   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create feature branch**

   ```bash
   git checkout -b feat/features/your-feature
   ```

3. **Make changes and commit**

   ```bash
   git add src/features/your-feature
   git commit -m "feat(features): add your feature"
   ```

4. **Run quality checks locally**

   ```bash
   pnpm check
   ```

5. **Push to your fork**

   ```bash
   git push -u origin feat/features/your-feature
   ```

6. **Create Pull Request** on GitHub

   - Use the PR template
   - Fill out all sections
   - Link related issues
   - Request review

7. **Address feedback**

   - Push additional commits to the same branch
   - CI will re-run automatically

8. **After approval**, maintainers will merge

## Pull Request Process

### Before Creating a PR

- [ ] Code follows FSD architecture rules
- [ ] All tests pass (`pnpm test`)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Biome linter passes (`pnpm lint`)
- [ ] Code is formatted (`pnpm format`)
- [ ] Commit messages follow Conventional Commits
- [ ] No console.log statements left behind
- [ ] Documentation is updated if needed

### PR Requirements

- **Descriptive title** following conventional commit format
- **Complete PR template** filled out
- **Passing CI checks** (format, lint, typecheck, test, build)
- **At least one approval** from code owners
- **No merge conflicts** with `main`
- **Conversations resolved**

### PR Review Guidelines

#### For Contributors

- Respond to feedback promptly
- Ask questions if feedback is unclear
- Don't take criticism personally - it's about the code, not you
- Mark conversations as resolved after addressing

#### For Reviewers

- Be respectful and constructive
- Explain *why* changes are needed
- Suggest alternatives when rejecting approaches
- Approve promptly when satisfied

### Merge Strategy

- **Squash and merge** (default) - creates clean history
- **Rebase and merge** - preserves individual commits (for well-crafted commit messages)
- **Merge commit** - preserves full branch history (rarely used)

## Testing Guidelines

### Unit Tests

- Write tests for **business logic** (repositories, utilities, schemas)
- Test **edge cases** and **error conditions**
- Use **Vitest** and **Testing Library**
- Place tests next to the code: `file.ts` → `file.test.ts`

**Example:**

```tsx
// entities/project/api/repository.test.ts
import { describe, it, expect } from 'vitest';
import { ProjectRepository } from './repository';

describe('ProjectRepository', () => {
  it('should filter published projects', async () => {
    // Test implementation
  });
});
```

### E2E Tests

- Use **Playwright** for critical user flows
- Test **authentication**, **navigation**, **forms**
- Run E2E tests before major releases

```bash
pnpm test:e2e
```

### Coverage Goals

- **Core business logic**: ≥ 80% coverage
- **UI components**: Focus on logic, not rendering
- **Utilities**: ≥ 90% coverage

## Documentation

### Code Documentation

- Add **JSDoc comments** for public APIs
- Explain *why*, not *what* (code should be self-explanatory)
- Document **edge cases** and **gotchas**

```tsx
/**
 * Generates a URL-safe slug from a title.
 * Handles unicode characters and prevents duplicate hyphens.
 */
export function slugify(text: string): string {
  // Implementation
}
```

### README Updates

Update `README.md` when:

- Adding new environment variables
- Adding new npm scripts
- Changing architecture significantly
- Adding new dependencies

### Architecture Documentation

Document architectural decisions in:

- This file (`CONTRIBUTING.md`) for contributor guidelines
- `README.md` for user-facing documentation
- Code comments for complex implementations

## Questions?

If you have questions:

1. Check existing [Issues](https://github.com/ProjectAhkdan/portofolio-v1/issues)
2. Check `README.md` and `CONTRIBUTING.md`
3. Create a new issue with the `question` label
4. Contact maintainers directly

---

**Thank you for contributing!** 🎉

Your contributions help make this project better for everyone.
