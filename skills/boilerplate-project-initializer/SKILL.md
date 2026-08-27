---
name: boilerplate-project-initializer
description: A comprehensive orchestration skill for AI coding agents to initialize, adapt, and implement projects from a boilerplate using role-based dynamic discovery and a continuous command mode.
---

# Boilerplate Project Initializer

## Purpose
This skill orchestrates the initialization of a new project starting from a boilerplate repository. It guides the AI to act as a multi-disciplinary engineering team to discover project requirements, adapt the boilerplate, transform documentation, and execute continuous user commands safely and effectively.

## Core Philosophy
- **Boilerplate** = Engineering Foundation
- **Project Discovery** = Product Specification
- **User Prompt** = Implementation Command
The AI acts as the bridge, ensuring that user requirements are implemented on top of the boilerplate without destroying its foundational engineering standards.

## Activation
Activated when a user requests to start a new project from a boilerplate, initialize a codebase, or explicitly calls this skill.

## Input Handling
Can receive a Git URL, Local Path, or act on an Existing Workspace.
- Clone or navigate to the repository.
- Verify the directory to prevent accidental overwrites.
- Read the repository contents before making any modifications.

## State Machine
The AI must strictly follow these states in order. Do not skip states.

1. **INITIALIZING**: Clone/prepare the workspace.
2. **AUDITING_BOILERPLATE**: Analyze the boilerplate's current stack, tools, and capability map.
3. **DISCOVERING_PROJECT**: Interview the user about project goals (Load `references/discovery/project-discovery.md`).
4. **DETECTING_ROLES**: Identify required engineering roles (Load `references/discovery/role-detection.md`).
5. **INTERVIEWING**: Conduct role-specific interviews (Load ONLY `REQUIRED` files from `references/engineering/`, `references/design/`, `references/management/`, etc.).
6. **SYNTHESIZING_REQUIREMENTS**: Generate cohesive requirement document (Load `references/discovery/requirement-synthesis.md` and use `templates/requirements.md`).
7. **PLANNING_ARCHITECTURE**: Define architecture based on requirements and boilerplate constraints (Use `templates/architecture-plan.md`).
8. **ADAPTING_BOILERPLATE**: Classify KEEP, MODIFY, ADD, REMOVE (Load `references/workflow/boilerplate-adaptation.md`).
9. **IMPLEMENTING**: Implement initial requirements based on the architecture plan.
10. **VALIDATING**: Run tests and checks (Load `references/workflow/validation.md`).
11. **TRANSFORMING_DOCUMENTATION**: Update README to reflect the ACTUAL project, not the boilerplate (Load `references/workflow/readme-transformation.md`).
12. **REVIEWING**: Provide final initialization report.
13. **READY_FOR_COMMAND**: Enter continuous command loop (Load `references/workflow/command-mode.md`).
14. **COMMAND_ANALYSIS**: Analyze new user prompt.
15. **COMMAND_IMPLEMENTATION**: Implement user prompt.
16. **COMMAND_VALIDATION**: Validate after implementation.
17. **COMPLETED**: Return to `READY_FOR_COMMAND`.

## Boilerplate Audit Rules
Before modifying anything, audit the directory:
- Inspect `package.json`, `README.md`, `src/`, `app/`, `tests/`, `.github/`, config files, etc.
- Build a **Boilerplate Capability Map** (Framework, Styling, DB, CI/CD, Testing, Linting).
- Never assume the presence of a tool.

## Dynamic Reference Loading
To prevent context bloat, read reference files **ONLY** when the state or role requires it.
