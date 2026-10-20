# Implementation Rules

## Use the saved HTML as the source

For site-specific bookmarklets, inspect `source-code.html` before choosing selectors.

Prefer, in order:

1. stable IDs intended for page structure
2. semantic attributes such as `data-*`, `aria-*`, roles, or meaningful element names
3. stable structural classes
4. text or heading relationships when the content is predictable
5. deeper structural selectors only when necessary

Avoid long ancestry chains and obviously generated class names when a simpler stable anchor exists.

Do not make the user identify selectors that can be found from the saved HTML.

## Keep the action focused

Bookmarklets work best for small actions on the current page, such as:

- copying a specific part of a page
- extracting information into a useful format
- converting a time or value
- searching selected text somewhere else
- opening the current page or domain in another tool
- clicking or hiding a page element
- turning a few repeated browser steps into one click

Do not expand a small bookmarklet request into an extension or web app.

## User feedback

Use one non-blocking, automatically dismissed toast for routine success, failure, or empty-content feedback. Do not use `alert()` or `confirm()` for status messages or require an OK/confirmation click. Reuse or replace an existing toast on repeated execution so messages do not stack; keep it out of extracted content and mark it as an accessible status message.

Keep interactive UI only when the task needs input, manual copying, or explicit approval of a consequential action. A manual-copy fallback may remain open until the user dismisses it; it is not a status confirmation.

## Clipboard behavior

For copy-focused bookmarklets:

- prefer `navigator.clipboard.writeText(...)` when available
- add a manual fallback when clipboard access may be blocked
- do not lose the generated text when copying fails

For read-from-clipboard workflows:

- handle clipboard denial
- validate the value before using it
- fall back to `prompt()` when appropriate

## URL construction

When the bookmarklet opens or searches another service:

- normalize the source URL, domain, selected text, or value as needed
- encode inserted values deliberately
- preserve reserved characters only when the destination requires them
- open a new tab only when that matches the requested action

## Content extraction

When copying page content:

- extract from the intended content area rather than the whole document
- preserve useful line breaks and list structure when practical
- omit unrelated navigation, ads, comments, and controls when they are not part of the request
- handle optional fields safely

## bookmarklet-code

The generated file is always named `bookmarklet-code` unless the user explicitly requests another name.

It contains only the final bookmarklet:

```text
javascript:(function(){...})()
```

or, when async browser APIs are needed:

```text
javascript:(async function(){...})()
```

Do not include Markdown fences or explanatory prose in the file.
