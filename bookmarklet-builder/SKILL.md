---
name: bookmarklet-builder
description: Build a consistent browser bookmarklet from a saved page HTML file and a requested action. Inspect the supplied HTML and either create an organized bookmarklet project in a coding environment or return the final bookmarklet code and a short explanation in chat.
---

# Bookmarklet Builder

Use this Skill when the user provides saved page HTML and wants a bookmarklet for a specific action on that page.

The user provides:

1. the saved or uploaded HTML
2. what they want the bookmarklet to do

Use the same HTML-first implementation and stability rules in both supported modes:

- **Project mode** — for coding agents that can work with local files.
- **Chat mode** — for regular AI chats where the HTML is uploaded directly.

## Expected input

Project mode example:

```text
$bookmarklet-builder

Use this HTML file:
/Users/name/Downloads/page.html

Create a bookmarklet that copies the job title, company, location and job description as plain text.
```

Chat mode example:

```text
Use the HTML file I uploaded.

Create a bookmarklet that copies the job title, company, location and job description as plain text.

Give me the final bookmarklet code and a short explanation of what it does.
```

The user should not need to provide CSS selectors or explain the page structure when that information is available in the supplied HTML.

## 1. Inspect the HTML

Use the exact HTML file or uploaded HTML supplied by the user.

Read it before writing site-specific code. Use the actual page structure to identify the website/platform, relevant content, and selectors that are likely to be stable.

If several plausible HTML files are available and the intended source cannot be determined safely, ask which one to use.

Do not replace the supplied HTML with guessed markup. Do not ask the user for selectors when they can be determined from the HTML.

## 2. Understand the requested action

Determine the browser action and expected result.

Keep the scope to what the user requested. Examples include copying page content, extracting fields, opening a generated URL, searching selected text, converting a value, clicking an element, or hiding an element.

Read `references/implementation-rules.md` and `references/common-patterns.md` for implementation guidance.

## 3. Choose the delivery mode

Use **Project mode** when the environment can create and manage files and the user is working with a local/project HTML file.

Use **Chat mode** when the user uploads the HTML directly in a regular AI chat, asks for the result in chat, or the environment cannot manage the user's local files.

Do not require project folders merely to use the Skill in Chat mode.

## Project mode

### Create the project folder

Create the project inside the folder containing the supplied HTML unless the user specifies another destination.

Name it with a short kebab-case:

```text
platform-function
```

Use a recognizable platform/site name when it can be determined. Describe the main function without unnecessary implementation details.

### Move and rename the HTML

Move the supplied HTML into the new project folder and rename it:

```text
source-code.html
```

Do not modify the saved HTML just to make implementation easier.

### Create bookmarklet-code

Create:

```text
bookmarklet-code
```

It must contain only the complete bookmarklet code.

### Create the companion README

Create a short `README.md` explaining:

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

### Validate the project result

When repository execution is available, run:

```bash
node <skill-directory>/scripts/validate-bookmarklet.mjs <project-folder>/bookmarklet-code
```

The validator checks bookmarklet format and JavaScript syntax. Selector verification against `source-code.html` is a separate implementation check and must not be skipped.

## Chat mode

Do not create or require a project folder.

Inspect the uploaded HTML and build the bookmarklet using the same implementation and stability rules as Project mode.

Return:

1. the complete bookmarklet code in a code block
2. a short explanation of what it does and where it is intended to run

Keep the explanation practical. Do not add project-file instructions unless the user asks for them.

Chat mode is intended for simple bookmarklets that the user is unlikely to need to test or change many times or keep as an organized project.

## Bookmarklet format

Prefer:

```text
javascript:(function(){...})()
```

or, when async browser APIs are needed:

```text
javascript:(async function(){...})()
```

In Project mode, `bookmarklet-code` contains code only, without Markdown fences or explanations.

In Chat mode, put the complete bookmarklet in a code block so the user can copy it.

## Validate before finishing

In either mode, verify that:

1. the bookmarklet starts with `javascript:`
2. its JavaScript payload parses when execution tools are available
3. site-specific selectors used by the code are supported by the supplied HTML
4. required content is handled correctly and optional content does not unnecessarily break the whole action
5. clipboard, URL, popup, or other browser API failures have reasonable handling when relevant

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
