---
name: bookmarklet-builder
description: Build a reliable single-file browser bookmarklet from a saved page HTML fixture and a requested browser action. Organize the source HTML, generated bookmarklet, and short documentation into a platform-and-function project folder and validate the final javascript: output.
---

# Bookmarklet Builder

Use this Skill when the user provides saved page HTML and wants a bookmarklet for a specific action on that page.

The saved HTML is the implementation source. Do not guess the page structure when the fixture can answer the question.

## Expected input

The normal starting state is:

```text
<working-repository>/
└── <saved-page>.html
```

The user supplies the HTML file and describes what the bookmarklet should do.

Example:

```text
$bookmarklet-builder

Use the HTML in the repository root.
Create a bookmarklet that copies the job title, company, location and job description as plain text.
```

The user does not need to provide selectors when they can be derived from the saved HTML.

## Workflow

### 1. Find the supplied HTML

Inspect the repository root for the HTML file the user supplied.

- If the user names the file, use that file.
- Otherwise, if there is one obvious HTML file in the root, use it.
- If multiple plausible HTML files exist and the intended source cannot be determined safely, ask which one to use.
- Do not substitute a live page, guessed markup, or unrelated fixture for the user's supplied HTML.

### 2. Understand the requested action

Determine exactly what should happen when the bookmarklet runs.

Identify:

- what content or page element is involved
- what action should happen
- what output is expected
- whether clipboard, URL navigation, clicking, hiding, extraction, or another browser action is required

Do not expand the requested behavior unnecessarily.

### 3. Inspect the HTML

Read the supplied HTML before writing site-specific bookmarklet logic.

Use it to identify:

- the website or platform when possible
- the actual DOM structure
- the intended content containers
- stable selectors
- optional or repeated fields relevant to the requested action

Do not invent site-specific selectors that are not supported by the fixture.

### 4. Create the project folder

Create a short kebab-case folder name based on:

```text
platform + function
```

Examples:

```text
seek-job-text-copy
x-article-text-copy
semrush-domain-search
```

Naming rules:

- use the recognizable platform/site name when it can be determined
- describe the main bookmarklet function, not every implementation detail
- keep the name concise
- do not add generic words such as `bookmarklet` when the repository context already makes that clear
- if the platform cannot be determined reliably, use a concise functional name rather than inventing one

### 5. Move the source HTML into the project folder

Move the supplied root HTML into the new project folder.

Use `source-code.html` as the canonical fixture filename unless the user explicitly wants to preserve another filename.

After this step, the normal structure is:

```text
<platform-function>/
└── source-code.html
```

Do not delete or alter the fixture contents merely to simplify implementation.

### 6. Build the bookmarklet

Create the bookmarklet from the requested behavior and the actual fixture.

Prefer one single-file bookmarklet using:

```text
javascript:(function(){...})()
```

or, when async browser APIs are required:

```text
javascript:(async function(){...})()
```

Use the project folder name as the bookmarklet filename by default:

```text
seek-job-text-copy/
├── source-code.html
└── seek-job-text-copy
```

Read `references/implementation-rules.md` and `references/common-patterns.md` for implementation guidance.

### 7. Create the companion README

Create:

```text
README.md
```

Keep it short. Document:

- what the bookmarklet does
- the page/site it is intended for
- important output behavior or fallback behavior when relevant

Do not turn it into a long technical design document.

The normal completed project is:

```text
<platform-function>/
├── source-code.html
├── <platform-function>
└── README.md
```

If the user explicitly names output files, respect those names.

### 8. Validate before finishing

Verify:

1. the bookmarklet starts with `javascript:`
2. the JavaScript payload parses
3. the bookmarklet file contains code only, without Markdown fences or explanation
4. site-specific selectors used by the bookmarklet are supported by the supplied HTML fixture
5. required fields and optional fields are handled appropriately
6. clipboard, URL, or other browser API failures have reasonable handling when relevant

When repository execution is available, run:

```bash
node <skill-directory>/scripts/validate-bookmarklet.mjs <bookmarklet-file>
```

Fix validation failures before considering the task complete.

## Stability rules

A working bookmarklet matters more than clever or compact code.

- Prefer stable semantic selectors over brittle deep CSS paths.
- Prefer a known content container over scraping the whole document.
- Avoid selectors based only on generated class names when a more stable anchor exists.
- Treat the saved HTML as evidence for the page structure.
- Handle optional fields without crashing the whole bookmarklet.
- Keep a manual fallback when clipboard access is central to the action and may fail.
- Encode generated URLs deliberately.
- Do not silently send page content to external services.
- Do not add network requests unless they are part of the requested action.
- Do not add packages, build systems, helper modules, or unrelated files.

## Boundaries

This Skill builds bookmarklets from a supplied page fixture. It does not make bookmarklets suitable for every browser workflow.

If the requested behavior requires persistent background execution, extension-only APIs, unavailable cross-origin privileges, or reliable operation across unrelated sites with different DOM structures, explain the limitation rather than pretending the bookmarklet will be reliable.
