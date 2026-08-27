# README Transformation System

## Objective
Ensure the final project README accurately reflects the newly initialized project, not the original boilerplate.

## Philosophy
- **Boilerplate README**: Documents the engineering foundation, architecture, and dev workflow.
- **Project README**: Documents what the project is, why it exists, and how to run this specific implementation.

## Classification for README Content
Audit the existing README and classify sections:
- **KEEP**: Foundational info (Tech stack, TypeScript rules, CI/CD instructions, Testing commands).
- **ADAPT**: Environment variables, Database setup, Architecture diagram.
- **REMOVE**: Old demo content, author info, boilerplate-specific links, unused routes.
- **REPLACE**: Project name, description, and core features.

## Safety Rules
- **No Assumptions**: Do not document planned functionality as implemented.
- **Consistency Check**: Compare README against `package.json`, routes, database, and `.env.example`.
- **Author Safety**: Do not carry over the boilerplate author/company as the new project owner automatically.
- **Secret Safety**: Document `.env` keys, never actual values.

## Final Review
Run a "README Drift Prevention" check before concluding initialization.
