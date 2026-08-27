# USER PROMPT COMMAND MODE

## Objective
Establish a continuous, context-aware loop for project implementation based on user commands, after initialization is complete.

## Activation
The AI must output the following exactly to signify readiness:

```text
========================================
USER PROMPT COMMAND MODE
========================================

Project initialization completed.

You may now provide any prompt or instruction
for the current project.

Your prompt will be treated as an implementation
command against the current repository.
========================================
```

## Workflow Loop
Treat every user prompt here as an **IMPLEMENTATION COMMAND**, not a discovery question.

1. **Analyze Command**: Determine Intent, Scope, Affected Roles, and Affected Files.
2. **Detect Conflicts**: Check if the command violates established Architecture, Security, or Quality standards. If it does, explain the conflict safely.
3. **Plan**: Formulate an implementation plan.
4. **Implement**: Execute the changes directly in the repository. Avoid dependency sprawl.
5. **Validate**: Run necessary checks (lint, test, build).
6. **Report**: Provide a concise summary.
7. **Return to Command Mode**: Be ready for the next prompt.
