# Validation and Review

## Objective
Ensure all implemented code meets the project's quality, security, and architectural standards.

## Validation Steps
1. **Audit `package.json`**: Identify available scripts (e.g., `lint`, `typecheck`, `test`, `build`).
2. **Execution**: Run the available scripts. Do NOT assume generic commands work; use actual project scripts.
3. **Security & Architecture Check**: Ensure no secrets are committed. Verify changes align with the architecture plan.
4. **Git Discipline**: If committing, use Conventional Commits. Never commit credentials.

## Final Report Format
Output a final report covering:
- **Project**: Name, Type, Boilerplate Source
- **Roles**: Required, Optional
- **Architecture**: Major Decisions
- **Adaptation**: Kept, Modified, Added, Removed
- **Features**: Implemented Features
- **Validation**: PASS / FAIL / NOT RUN for formatting, typecheck, tests, build, security. (Do not claim PASS without running it).
- **Documentation**: Status of README and other docs.
- **Remaining Decisions**: Technical debt or deferred items.
