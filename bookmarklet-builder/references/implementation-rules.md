# Implementation Rules

## Inspect the page before choosing selectors

When a page fixture is available, derive selectors from the actual markup.

Prefer, in order:

1. stable IDs intended for page structure
2. semantic attributes such as `data-*`, `aria-*`, roles, or meaningful element names
3. stable structural classes
4. text or heading relationships when the content is predictable
5. deeper structural selectors only when necessary

Avoid depending on long ancestry chains or obviously generated class names when a simpler anchor exists.

## Keep the browser action small

Bookmarklets are best for one focused action. Examples:

- copy content
- extract fields
- open a generated URL
- transform visible text
- click or hide a known element

If the behavior needs persistent state, background execution, privileged browser APIs, or a large UI, a browser extension is usually a better fit.

## Clipboard behavior

For copy-focused bookmarklets:

- prefer `navigator.clipboard.writeText(...)` when available
- add a fallback when clipboard permission or browser context may block it
- a simple prompt or temporary textarea fallback is acceptable
- do not lose the generated text when copying fails

For read-from-clipboard workflows:

- handle clipboard denial
- validate the read value before using it
- fall back to `prompt()` when appropriate

## URL construction

When the bookmarklet opens another service:

- normalize the current URL/domain before inserting it
- encode values with `encodeURIComponent` or deliberate equivalent logic
- preserve required reserved characters only when the destination expects them
- open a new tab only when that is part of the requested behavior

## Content extraction

When copying page content:

- restrict extraction to the intended content container
- preserve useful line breaks and list structure when practical
- omit unrelated navigation, comments, ads, or controls
- handle optional title/metadata fields safely
- do not scrape the whole document when a clear content container exists

## Output

Default final form:

```text
javascript:(function(){...})()
```

or, when async browser APIs are needed:

```text
javascript:(async function(){...})()
```

Do not wrap the final bookmarklet in Markdown when writing it directly to a target file.
