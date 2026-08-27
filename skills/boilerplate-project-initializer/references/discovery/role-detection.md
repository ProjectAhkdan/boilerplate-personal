# Dynamic Role Detection

## Objective
Determine which engineering and product roles are required for this specific project based on the Project Discovery phase. This limits context bloat by only loading necessary interview banks.

## Process
Analyze the project requirements and classify each role in the Role Library as `REQUIRED`, `OPTIONAL`, or `NOT REQUIRED`.

## Role Library Guide

- **Frontend Engineer**: Required if there is a web or mobile UI.
- **Backend Engineer**: Required if there are custom APIs or server-side logic.
- **Database Engineer**: Required if complex schema design or migrations are needed.
- **Software Architect**: Required for complex, multi-service, or scalable systems.
- **QA Engineer**: Required if rigorous testing is mandated.
- **DevOps / Security Engineer**: Required if custom CI/CD, strict compliance, or sensitive data is involved.
- **Product / UX Designer**: Required if custom workflows, user journeys, or strict accessibility is needed.
- **AI / Data Engineer**: Required if ML, LLMs, or complex data pipelines are involved.
- **Platform Engineers** (Mobile/Network/Game/Blockchain): Required based on specific domain needs.

## Next Steps
For every role marked as `REQUIRED`, load the corresponding markdown file from `references/engineering/`, `references/design/`, etc., to conduct the Role Interview. Do not load files for `NOT REQUIRED` roles.
