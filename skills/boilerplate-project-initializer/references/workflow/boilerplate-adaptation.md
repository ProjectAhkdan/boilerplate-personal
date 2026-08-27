# Boilerplate Adaptation Strategy

## Objective
Determine how to mold the existing boilerplate into the specific project requirements without destroying foundational infrastructure unnecessarily.

## Classification System
Before implementing any features, classify the major components of the boilerplate into the following categories:

- **KEEP**: Infrastructure or features that perfectly match requirements (e.g., Existing Auth setup, CI/CD pipeline, Linting, Architecture patterns).
- **MODIFY**: Features that are close but need tweaking (e.g., Existing Design System colors, routing structure).
- **ADD**: Completely new requirements (e.g., New Billing Module, specific API endpoints).
- **REMOVE**: Unnecessary bloat that will slow down development or cause confusion (e.g., Demo pages, unused examples).

## Rules
- **Do not remove foundational infrastructure** (linting, formatting, core configurations) unless explicitly told it is being replaced.
- Document the adaptation plan and get user confirmation if major restructuring is planned.
- Do not make architectural changes purely for aesthetic reasons.
