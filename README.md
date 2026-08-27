# Boilerplate

Modern boilerplate website built with Next.js, featuring project showcase and professional experience.

## ✨ Tech Stack

### Core
- **[Next.js 16.2.12](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.8](https://react.dev/)** - UI library
- **[TypeScript 6.0.3](https://www.typescriptlang.org/)** - Type-safe JavaScript (strict mode enabled)

### Styling
- **[Tailwind CSS 4.3.3](https://tailwindcss.com/)** - Utility-first CSS framework (CSS-first v4)
- **[class-variance-authority](https://cva.style/docs)** - Type-safe component variants
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Utility for merging Tailwind classes
- **[lucide-react](https://lucide.dev/)** - Icon library

### Backend & Database
- **[Supabase](https://supabase.com/)** - PostgreSQL database with real-time subscriptions
  - `@supabase/supabase-js` - Client library
  - `@supabase/ssr` - Server-side rendering helpers for Next.js
- **Row Level Security (RLS)** - Database-level access control

### State Management & Data Fetching
- **[TanStack Query 5.102.5](https://tanstack.com/query/latest)** - Server state management
- **[react-hook-form 7.86.0](https://react-hook-form.com/)** - Form management
- **[Zod 4.4.3](https://zod.dev/)** - Schema validation

### Animations
- **[Motion 12.43.0](https://motion.dev/)** - Animation library (replaces Framer Motion)

### Code Quality
- **[Biome 2.5.6](https://biomejs.dev/)** - Fast linter & formatter (replaces ESLint + Prettier)
- **[Husky 9.1.7](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged 17.3.0](https://github.com/lint-staged/lint-staged)** - Run linters on staged files
- **[commitlint](https://commitlint.js.org/)** - Enforce Conventional Commits

### Testing
- **[Vitest 4.1.11](https://vitest.dev/)** - Unit testing framework
- **[Testing Library](https://testing-library.com/)** - React component testing
- **[Playwright 1.62.1](https://playwright.dev/)** - E2E testing

## 🏗️ Architecture

This project follows **Feature-Sliced Design (FSD)** methodology for scalable front-end architecture.

### Directory Structure

```
src/
├── app/                    # Next.js App Router (routes & layouts)
│   ├── (public)/          # Public routes (projects, about)
│   ├── (admin)/           # Admin routes (auth required)
│   └── layout.tsx         # Root layout
│
├── widgets/               # Composite UI blocks (page sections)
│   └── projects/          # Project list & detail widgets
│
├── features/              # User interactions (auth, forms)
│   └── auth/              # Authentication feature
│
├── entities/              # Business entities (data models)
│   └── project/           # Project entity (model, repository, UI)
│
└── shared/                # Reusable utilities
    ├── ui/                # UI components (Button, Card)
    ├── lib/               # Utilities (string, date, errors)
    ├── api/               # API clients (Supabase)
    ├── config/            # Configuration (env)
    └── types/             # Global TypeScript types
```

### FSD Layer Dependency Rules
- **app** → can import from all layers
- **widgets** → features, entities, shared
- **features** → entities, shared
- **entities** → shared
- **shared** → no imports from other layers

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 20.0.0
- **pnpm** ≥ 9.0.0 (package manager)
- **Supabase** account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ProjectAhkdan/portofolio-v1.git
   cd portofolio-v1
   ```

2. **Enable pnpm** (if not already enabled)
   ```bash
   corepack enable
   corepack prepare pnpm@9.15.2 --activate
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Run database migrations**
   ```bash
   # Use Supabase CLI or run migrations manually in Supabase Studio
   # Migration files are in: supabase/migrations/
   ```

6. **Start development server**
   ```bash
   pnpm dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

### Development
- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Auto-fix lint issues
- `pnpm typecheck` - Run TypeScript compiler checks

### Testing
- `pnpm test` - Run unit tests with Vitest
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm test:coverage` - Generate test coverage report
- `pnpm test:e2e` - Run Playwright E2E tests

### Database
- `pnpm db:types` - Generate TypeScript types from Supabase schema
- `pnpm db:reset` - Reset local Supabase database

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `NODE_ENV` | Environment (development/production) | Auto-set |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🗃️ Database Schema

### Projects Table
```sql
projects (
  id            uuid PRIMARY KEY,
  title         text NOT NULL,
  slug          text UNIQUE NOT NULL,
  description   text,
  content       text,
  status        text CHECK (status IN ('draft', 'published')),
  featured_image_url text,
  demo_url      text,
  github_url    text,
  tags          text[],
  published_at  timestamptz,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
)
```

**RLS Policies**:
- ✅ Public read access for published projects
- 🔒 Admin-only write access (requires authentication)

## 🔧 Configuration

### TypeScript
- **Strict mode enabled** (all strict flags on)
- **Path aliases**:
  - `@/app/*` → `src/app/*`
  - `@/widgets/*` → `src/widgets/*`
  - `@/features/*` → `src/features/*`
  - `@/entities/*` → `src/entities/*`
  - `@/shared/*` → `src/shared/*`

### Biome (Linter & Formatter)
Configuration in `biome.json`. Configured for:
- Strict linting rules
- Single quotes, 2-space indentation
- Auto-fix on save (if IDE supports)

### Git Hooks (Husky)
- **pre-commit**: Runs `lint-staged` (lints & formats staged files)
- **commit-msg**: Enforces Conventional Commits format
- **pre-push**: Runs typecheck, tests, and build

### Conventional Commits Format
```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com/)
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on every push to `main`

### Other Platforms
- Ensure Node.js ≥20.0.0 is available
- Run `pnpm build` to build production bundle
- Run `pnpm start` to start server on port 3000

## 📝 Development Workflow

1. **Create feature branch** from `main`
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make changes** following FSD architecture rules

3. **Commit** using Conventional Commits
   ```bash
   git commit -m "feat(projects): add filtering by tags"
   ```

4. **Push** and create Pull Request
   ```bash
   git push origin feat/your-feature-name
   ```

5. **PR checks** will run:
   - ✅ Lint & typecheck
   - ✅ Unit tests
   - ✅ Build verification

## 🛡️ Security

See [SECURITY.md](./SECURITY.md) for:
- Dependency vulnerability status
- Security best practices
- Reporting vulnerabilities

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Adan**

- GitHub: [@ProjectAhkdan](https://github.com/ProjectAhkdan)

---

**Note**: This portfolio is under active development. Features marked with 🚧 are work-in-progress.
