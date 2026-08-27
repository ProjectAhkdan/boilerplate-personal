# README Transformation System

## Objective
Ensure the final project README accurately reflects the newly initialized project, not the original boilerplate. The transformation must be idempotent and always reflect the **actual state** of the repository.

## Philosophy
- **Boilerplate README**: Documents the engineering foundation, architecture, and dev workflow.
- **Project README**: Documents what the project is, why it exists, and how to run this specific implementation.

## Classification System
Audit the existing README and classify sections before transforming:
- **KEEP**: Foundational info (Tech stack, FSD Rules, TypeScript rules, Biome/Husky, CI/CD instructions, Testing commands).
- **ADAPT**: Environment variables, Database setup, Architecture diagram, Getting Started.
- **REMOVE**: Old demo content, author info, boilerplate-specific links, unused routes, old business requirements.
- **REPLACE**: Project name, description, core features, tables, roles.

## Transformation Workflow
README finalization should only occur **after implementation is complete** (unless drafting).
1. Clone Boilerplate -> Audit -> Project Discovery -> Role Interviews -> Requirement Synthesis -> Architecture Plan -> Implementation -> Validation.
2. **README Transformation**: Execute the classification and rewrite.
3. **README Consistency Check**: Ensure alignment with `package.json`, routes, database schema, CI.
4. **Final Review**.

## Crucial Safety Rules
- **Do Not Document Unimplemented Features**: Use status like "Planned" or "In Progress" for incomplete features. Never claim something works if it doesn't.
- **Project-Specific Database**: Do not copy old boilerplate schemas. Document the actual tables created for the new project.
- **Environment Variables**: Document keys (e.g., `STRIPE_SECRET_KEY=your-secret-key`) but **NEVER** expose actual secret values. Check against `.env.example` and actual configurations.
- **Author/Ownership Safety**: Do not carry over the boilerplate author/company automatically. Use "Owner information not configured" if unknown.
- **Links and References**: Verify and remove old boilerplate demo links, author links, or screenshots.
- **Boilerplate Preservation**: Only transform the README of the **newly cloned project**, never the upstream boilerplate source repository.

## Idempotency and Drift Detection
- **Idempotent Transformation**: The skill must safely run multiple times without duplicating sections, headings, or features.
- **README Drift Detection**: Detect when README diverges from the repository (e.g., README says `pnpm lint` but `package.json` says `pnpm check`; README says Supabase but project uses Clerk). Always update README to match the **actual state**.

## Documentation Impact Analysis (Command Mode)
After any user command in `USER PROMPT COMMAND MODE`, analyze if the change affects documentation:
- **Ask**: "Does this change affect documentation?" (YES / NO).
- **If YES**: Identify affected docs (README, CONTRIBUTING, Architecture docs, Environment docs) and update them accordingly.

## README Structure
Use only relevant sections from this template:
```markdown
# Project Name
## Overview
## Problem / Purpose
## Features
## Tech Stack
## Architecture
## Directory Structure
## Requirements
## Getting Started
## Environment Variables
## Development
## Available Commands
## Testing
## Code Quality
## Authentication
## Authorization
## Database
## API / Integrations
## Deployment
## Git Workflow
## Contributing
## Security
## License
```

## README Quality Check
Before concluding, audit for: Technical Accuracy, Command Accuracy, Architecture Accuracy, Feature Accuracy, Environment Accuracy, Database Accuracy, Link Validation, and Documentation Completeness.
