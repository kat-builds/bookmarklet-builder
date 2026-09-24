---
name: bookmarklet-builder
description: Build a consistent browser bookmarklet from a saved page HTML file and a requested action. Inspect the supplied HTML, organize the project as platform + function, create bookmarklet-code and a short README, and validate the final javascript: output.
---

# Bookmarklet Builder

Use this Skill when the user has saved a web page as HTML and wants AI to create a bookmarklet for a specific action on that page.

The user provides two things:

1. the saved HTML file
2. what they want the bookmarklet to do

The Skill handles the page inspection, project organization, bookmarklet creation, and validation.

## Expected input

A typical request is:

```text
$bookmarklet-builder

Use this HTML file:
/Users/name/Downloads/page.html

Create a bookmarklet that copies the job title, company, location and job description as plain text.
```

The user should not need to provide CSS selectors or explain the page structure when that information is available in the saved HTML.

## Workflow

### 1. Use the HTML file the user provides

Use the exact HTML file or path named by the user.

If the user says to use an HTML file in a folder but does not name it:

- use the one obvious HTML file when there is only one
- if there are multiple plausible HTML files, ask which one to use

Do not replace the supplied HTML with guessed markup or a different page.

### 2. Understand what the user wants

Determine the browser action and expected result.

Keep the scope to what the user requested. Examples include copying page content, extracting fields, opening a generated URL, searching selected text, converting a value, clicking an element, or hiding an element.

### 3. Inspect the saved HTML

Read the HTML before writing site-specific code.

Use the actual page structure to identify the website/platform, the relevant content, and selectors that are likely to be stable.

Do not ask the user for selectors when they can be determined from the HTML. Do not invent site-specific selectors that the HTML does not support.

### 4. Create a project folder

Create the project inside the folder containing the supplied HTML unless the user specifies another destination.

Name it with a short kebab-case:

```text
platform-function
```

Examples:

```text
seek-job-text-copy
x-article-text-copy
semrush-domain-search
```

Use a recognizable platform/site name when it can be determined from the HTML. Describe the main function without adding unnecessary implementation details.

### 5. Move and rename the HTML

Move the supplied HTML into the new project folder and rename it:

```text
source-code.html
```

Do not modify the saved HTML just to make the bookmarklet easier to build.

### 6. Create bookmarklet-code

Create a file named:

```text
bookmarklet-code
```

It must contain only the complete code that the user can paste into a browser bookmark's URL field.

Prefer:

```text
javascript:(function(){...})()
```

or, when async browser APIs are needed:

```text
javascript:(async function(){...})()
```

Do not put Markdown fences, explanations, or installation instructions inside `bookmarklet-code`.

Read `references/implementation-rules.md` and `references/common-patterns.md` for implementation guidance.

### 7. Create a short README

Create `README.md` in the project folder.

Keep it short and practical. Explain:

- what the bookmarklet does
- which page/site it is intended for
- important output or fallback behavior when relevant

The normal completed structure is:

```text
<platform-function>/
├── source-code.html
├── bookmarklet-code
└── README.md
```

### 8. Validate before finishing

Verify that:

1. `bookmarklet-code` starts with `javascript:`
2. its JavaScript payload parses
3. it contains code only
4. site-specific selectors used by the code are supported by `source-code.html`
5. required content is handled correctly and optional content does not unnecessarily break the whole action
6. clipboard, URL, popup, or other browser API failures have reasonable handling when relevant

When repository execution is available, run:

```bash
node <skill-directory>/scripts/validate-bookmarklet.mjs <project-folder>/bookmarklet-code
```

The validator checks bookmarklet format and JavaScript syntax. Selector verification against `source-code.html` is a separate implementation check and must not be skipped.

Fix problems before considering the bookmarklet complete.

## Stability rules

A bookmarklet that works reliably is more important than clever or highly compressed code.

- Base site-specific behavior on the supplied HTML.
- Prefer stable semantic selectors over brittle deep CSS paths.
- Prefer a known content container over scraping the whole document.
- Avoid generated class names when a more stable anchor is available.
- Handle optional fields without crashing the whole bookmarklet.
- Keep a manual fallback when clipboard access is central to the action and may fail.
- Encode generated URLs deliberately.
- Do not silently send page content to external services.
- Do not add network requests unless they are part of the requested action.
- Do not add packages, build systems, helper modules, or unrelated files.

## Boundaries

Bookmarklets are best for small actions on the page the user is currently viewing.

If the requested behavior requires persistent background execution, continuous monitoring, extension-only browser APIs, unavailable cross-origin access, reliable operation across unrelated page structures, or a large persistent interface, explain that a bookmarklet may not be the right tool instead of pretending it will be reliable.
