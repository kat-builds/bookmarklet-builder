---
name: bookmarklet-builder
description: Build or update a small, single-file browser bookmarklet from a described browser action, using supplied HTML or repository fixtures when available and validating the final javascript: output.
---

# Bookmarklet Builder

Use this Skill when the user wants to create, update, or repair a bookmarklet.

The goal is a small browser action that can be saved as a bookmark, not a browser extension or a general web app.

## Core behavior

1. Understand the requested browser action and expected output.
2. Inspect the current repository before inventing implementation details.
3. If the user provides a target folder, inspect that folder for `source-code.html` first.
4. If `source-code.html` does not exist, use the most obvious equivalent saved HTML/page fixture before asking for selectors.
5. Derive selectors and page assumptions from the supplied fixture whenever possible. Do not invent site-specific selectors when evidence is available.
6. Prefer a single-file bookmarklet using one of these forms:
   - `javascript:(function(){...})()`
   - `javascript:(async function(){...})()`
7. Keep dependencies local to the bookmarklet. Do not introduce packages, helper modules, build tools, or external runtime dependencies unless the user explicitly asks.
8. Write the normal JavaScript logic clearly first when that helps correctness, then convert it to the final bookmarklet form.
9. Add failure handling for assumptions that can reasonably fail, such as missing DOM elements, blocked clipboard access, invalid clipboard values, or popup restrictions.
10. Preserve the user's requested output format. If none is specified, return:
    - the final bookmarklet code
    - one short explanation of what it does
    - installation/use instructions only when useful
11. If working inside a repository and the user asks for file changes, write the bookmarklet to the requested target file rather than only pasting code into chat.
12. Do not create specs, plans, tests, helper files, or extra documentation unless they materially improve the requested bookmarklet or the user asks for them.

## Stability rules

A working bookmarklet matters more than clever or compact code.

- Prefer stable semantic selectors over brittle deep CSS paths.
- Prefer text/content extraction from a known container over scraping the whole document.
- Avoid selectors based only on generated class names when a more stable anchor exists.
- Treat page fixtures as evidence, not as permission to assume unrelated live-page behavior.
- Handle optional fields without crashing the whole bookmarklet.
- Keep clipboard fallback behavior when copying is central to the requested action.
- Encode generated URLs deliberately. Do not rely on accidental browser coercion.
- Do not silently send page content to external services.
- Do not add network requests unless they are part of the requested action.
- Do not require persistent storage unless the requested behavior needs it.

## Validation

Before considering the bookmarklet complete:

1. Confirm the final output starts with `javascript:`.
2. Confirm the JavaScript payload parses successfully.
3. Confirm the final output does not contain Markdown fences or explanatory prose.
4. If a saved HTML fixture is available, verify the selectors used by the bookmarklet exist in that fixture.
5. Verify required fallbacks or missing-element handling for the requested behavior.
6. When repository execution is available, run:

```bash
node bookmarklet-builder/scripts/validate-bookmarklet.mjs <bookmarklet-file>
```

If the repository uses a different Skill installation path, run the validator from the installed Skill directory instead.

## Common tasks

Read `references/common-patterns.md` for reusable implementation patterns and `references/implementation-rules.md` for selector, clipboard, URL, and output guidance.

## Boundaries

This Skill builds bookmarklets. It does not automatically turn every browser workflow into a bookmarklet.

If the requested task requires persistent background execution, cross-origin privileges unavailable to page JavaScript, extension-only APIs, or reliable operation across many unrelated websites, explain the limitation and recommend a browser extension instead of pretending a bookmarklet can do it reliably.
