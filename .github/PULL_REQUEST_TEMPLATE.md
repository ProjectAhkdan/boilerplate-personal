## Summary

<!-- Provide a brief overview of what this PR accomplishes -->

## Type of Change

<!-- Check all that apply -->

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] ♻️ Refactoring (no functional changes)
- [ ] 🎨 Style/formatting changes
- [ ] ⚡️ Performance improvement
- [ ] ✅ Test update
- [ ] 🔧 Configuration change
- [ ] 📦 Dependency update

## Related Issue

<!-- Link to the issue this PR addresses, if applicable -->

Closes #
Related to #

## What Changed

<!-- Provide a detailed description of the changes made -->

### Modified Files

<!-- List the key files changed and briefly explain why -->

-
-
-

## Architecture / FSD Impact

<!-- Describe how this affects Feature-Sliced Design layers -->

**Affected Layers:**

- [ ] `app/` - App Router routes and layouts
- [ ] `entities/` - Business entities (data models, repositories)
- [ ] `features/` - User interactions (auth, forms)
- [ ] `shared/` - Reusable utilities (ui, lib, api, config, types)
- [ ] `widgets/` - Composite UI blocks (page sections)
- [ ] Configuration files only
- [ ] No architectural impact

**Cross-layer Dependencies:**

<!-- Confirm that FSD dependency rules are maintained -->

- [ ] No violations of FSD layer dependency rules
- [ ] New imports follow the correct direction (app → widgets → features → entities → shared)

## Testing

<!-- Describe the testing you've performed -->

**Tested Locally:**

- [ ] Manual testing completed
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated (if applicable)
- [ ] Tested on multiple screen sizes (if UI changes)
- [ ] Tested keyboard navigation and accessibility (if UI changes)

**Test Coverage:**

<!-- Describe what you tested and the results -->

## Screenshots / Preview

<!-- If applicable, add screenshots or video demonstrating the changes -->

**Before:**

**After:**

## Checklist

<!-- Confirm the following before submitting -->

- [ ] Code follows the project's style guidelines (Biome passes)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Unit tests pass (`pnpm test`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Commit messages follow Conventional Commits format
- [ ] Self-review completed
- [ ] Code is documented where necessary
- [ ] No unnecessary console.log statements left behind
- [ ] No sensitive data (secrets, API keys) included

## Breaking Changes

<!-- If this is a breaking change, describe the impact and migration path -->

**Impact:**

**Migration Guide:**

## Deployment Notes

<!-- Any special considerations for deployment? -->

- [ ] Requires environment variable changes
- [ ] Requires database migration
- [ ] Requires dependency installation
- [ ] No special deployment steps

**Environment Variables (if applicable):**

```env
# Example:
# NEW_VARIABLE=value
```

## Reviewer Notes

<!-- Anything specific reviewers should focus on or be aware of? -->

---

**Post-Merge Actions:**

<!-- Any follow-up tasks after this PR is merged? -->

- [ ] None
- [ ] Create follow-up issue for:
