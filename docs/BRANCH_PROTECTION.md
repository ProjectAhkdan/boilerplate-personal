# Branch Protection and Repository Governance

This document defines the branching strategy and required GitHub repository settings for maintaining code quality and preventing accidental breaks to production code.

## Branching Strategy

### Primary Branches

- **`main`** - Production branch
  - Always deployable
  - Protected against direct pushes
  - Requires PR review before merge
  - Auto-deployed to production (Vercel)

- **`develop`** (optional) - Integration branch
  - Feature branches merge here first
  - Staging environment deployment
  - Less strict than `main` but still protected

### Working Branches

Use descriptive branch names following this pattern:

```
<type>/<scope>/<short-description>
```

**Examples:**

```bash
feat/features/project-filtering
fix/entities/project-schema-validation
refactor/shared/modal-component
docs/config/update-readme
chore/deps/upgrade-biome
```

**Types:** `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `perf`, `ci`, `build`

**Scopes:** Use FSD layer names (`app`, `entities`, `features`, `shared`, `widgets`) or meta-scopes (`config`, `deps`, `ci`, `tests`, `release`)

## GitHub Branch Protection Rules

The following settings **must be configured in GitHub repository settings** under `Settings > Branches > Branch protection rules`.

**Important:** These settings cannot be enforced through files in the repository alone. They must be configured by a repository administrator through the GitHub web interface.

### Protection for `main` branch

#### Pull Request Requirements

- [x] **Require a pull request before merging**
  - Required number of approvals: **1**
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners (configured via `.github/CODEOWNERS`)

#### Status Check Requirements

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Required status checks:
    - `Quality Checks` (GitHub Actions CI workflow)

#### Additional Restrictions

- [x] **Require conversation resolution before merging**
- [x] **Require signed commits** (optional but recommended)
- [x] **Require linear history** (optional, prevents merge commits)
- [x] **Do not allow bypassing the above settings**
- [x] **Restrict who can push to matching branches**
  - Allow: Repository administrators only (for emergency hotfixes)
- [x] **Block force pushes**
- [x] **Do not allow deletions**

### Protection for `develop` branch (if used)

Apply similar but slightly relaxed rules:

- Require PR before merging: **Yes**
- Required approvals: **1**
- Require status checks: **Yes**
- Require up-to-date branch: **No** (to allow faster iteration)
- Require conversation resolution: **No**
- Block force pushes: **Yes**
- Allow deletions: **No**

## Workflow

### Standard Development Flow

1. **Create feature branch from `main`**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/features/new-feature
   ```

2. **Develop with commits following Conventional Commits**

   ```bash
   git add src/features/new-feature
   git commit -m "feat(features): add project search functionality"
   ```

   Commit message will be validated by commitlint via Husky's `commit-msg` hook.

3. **Run quality checks locally before pushing**

   ```bash
   pnpm check  # Runs format, lint, typecheck, test, build
   ```

   Or let the pre-push hook handle it (runs typecheck, test, build automatically).

4. **Push branch to remote**

   ```bash
   git push -u origin feat/features/new-feature
   ```

   Pre-push hook will run typecheck, tests, and build.

5. **Create Pull Request on GitHub**

   - Use the PR template (`.github/PULL_REQUEST_TEMPLATE.md`)
   - Fill out all relevant sections
   - Link related issues
   - Request review from code owners

6. **CI runs automatically**

   GitHub Actions workflow (`.github/workflows/ci.yml`) will:
   - Install dependencies with frozen lockfile
   - Run format check
   - Run linter
   - Run typecheck
   - Run tests
   - Build production bundle

7. **Code review and approval**

   - Address review feedback
   - Push new commits to the same branch
   - CI re-runs automatically
   - Approver reviews changes

8. **Merge to `main`**

   - Squash and merge (recommended for clean history)
   - Merge commit (preserves full commit history)
   - Rebase and merge (linear history, requires "Require linear history" setting)

9. **Automatic deployment**

   - Vercel automatically deploys `main` to production

### Hotfix Flow

For critical production bugs:

1. **Create hotfix branch from `main`**

   ```bash
   git checkout -b fix/entities/critical-data-leak main
   ```

2. **Fix and test**

   ```bash
   git commit -m "fix(entities): prevent data leak in user query"
   ```

3. **Fast-track PR**

   - Mark as urgent in PR description
   - Request immediate review
   - Merge as soon as CI passes and approved

4. **Deploy immediately**

### Emergency Bypass (Administrator Only)

In extreme emergencies where CI is broken or blocking a critical fix:

1. Repository administrator can temporarily disable branch protection
2. Push fix directly to `main`
3. Re-enable branch protection immediately
4. Document the bypass in a post-incident review

**This should be rare and always followed by a retrospective.**

## Enforcement Layers

This repository has **multiple layers of quality enforcement**:

### Layer 1: Local Git Hooks (Developer Machine)

- **Pre-commit**: Lint and format staged files (`lint-staged` + Biome)
- **Commit-msg**: Validate commit message format (`commitlint`)
- **Pre-push**: Run typecheck, tests, and build

**Limitation:** Developers can bypass with `--no-verify`

### Layer 2: GitHub Actions CI (Server-Side)

- Runs on every PR and push to protected branches
- Cannot be bypassed by developers
- Enforces: format, lint, typecheck, tests, build

**Limitation:** Requires GitHub repository secrets for build (Supabase credentials)

### Layer 3: Branch Protection (GitHub Settings)

- Requires PR approval
- Requires CI to pass
- Requires code owner review
- Blocks force push and branch deletion
- Enforced by GitHub, cannot be bypassed without admin access

**Limitation:** Requires manual configuration in GitHub settings

### Layer 4: Human Review

- Code owners review for:
  - Architecture compliance (FSD rules)
  - Security concerns
  - Business logic correctness
  - Code quality and maintainability

## Required GitHub Repository Settings

### General Settings

- **Default branch:** `main`
- **Allow merge commits:** No (optional, for cleaner history)
- **Allow squash merging:** Yes (recommended)
- **Allow rebase merging:** Yes
- **Automatically delete head branches:** Yes (cleans up merged branches)

### Secrets Configuration

Configure these secrets in `Settings > Secrets and variables > Actions`:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous public key

**Note:** These are public variables (safe for client-side), but managed as secrets in CI for consistency.

### Code Security and Analysis (Optional)

- **Dependency graph:** Enabled
- **Dependabot alerts:** Enabled
- **Dependabot security updates:** Enabled
- **Code scanning:** Optional (GitHub Advanced Security)

## Troubleshooting

### CI failing due to missing secrets

**Problem:** Build step fails with "Missing environment variable"

**Solution:**

1. Go to `Settings > Secrets and variables > Actions`
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Re-run failed workflow

### Cannot push to `main`

**Problem:** `remote: error: GH006: Protected branch update failed`

**Solution:** This is expected. Create a pull request instead:

```bash
# Your changes are in main - move them to a new branch
git checkout -b fix/my-fix
git push -u origin fix/my-fix
# Then create PR on GitHub
```

### Pre-push hook takes too long

**Problem:** `pnpm build` in pre-push hook is slow

**Solution:** Once CI is trusted, consider removing `build` from `.husky/pre-push` and relying solely on CI for build validation. However, keep typecheck and tests locally for fast feedback.

### Branch protection not enforced

**Problem:** Can push directly to `main`

**Solution:** Branch protection must be configured by a repository administrator through GitHub settings. CODEOWNERS file alone is insufficient.

## Verification Checklist

After configuring branch protection, verify:

- [ ] Cannot push directly to `main` without PR
- [ ] Cannot merge PR without approval
- [ ] Cannot merge PR with failing CI
- [ ] Force push to `main` is blocked
- [ ] Branch deletion of `main` is blocked
- [ ] Code owners are automatically requested for review
- [ ] Merged branches are automatically deleted

## References

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [CODEOWNERS Documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Feature-Sliced Design](https://feature-sliced.design/)
