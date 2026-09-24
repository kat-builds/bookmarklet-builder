# Bookmarklet Builder

A reusable Skill for turning a browser action into a small, single-file bookmarklet.

Use it when you want an AI coding agent to inspect a page or saved HTML fixture, identify stable selectors, build the browser action, and return a bookmarklet that is ready to save in the bookmarks bar.

## What this Skill is for

Bookmarklets are useful for small browser actions that do not justify a full extension, such as:

- copying selected page content
- extracting a few fields from a page
- opening the current page or domain in another service
- reading from the clipboard and using that value in a URL
- clicking, hiding, or transforming page elements
- exporting page content in a simple text format

The Skill focuses on repeatable implementation rules rather than any one website.

## Installation

Copy the `bookmarklet-builder` directory into a Skills location supported by your coding agent.

For agents that support the shared Skills directory:

```bash
mkdir -p ~/.agents/skills
cp -R bookmarklet-builder ~/.agents/skills/
```

Then invoke it explicitly:

```text
$bookmarklet-builder

Create a bookmarklet that copies the article title and body as plain text.
Use source-code.html in the current folder as the page fixture.
```

## How it works

```text
Describe the browser action
        ↓
Inspect the supplied HTML or repository fixture
        ↓
Choose stable selectors and browser APIs
        ↓
Build the normal JavaScript logic
        ↓
Add failure handling where needed
        ↓
Convert it into a single-file javascript: bookmarklet
        ↓
Validate the generated output
        ↓
Return the bookmarklet and a short usage note
```

## Repository structure

```text
.
├── bookmarklet-builder/
│   ├── SKILL.md
│   ├── references/
│   │   ├── implementation-rules.md
│   │   └── common-patterns.md
│   └── scripts/
│       └── validate-bookmarklet.mjs
├── LICENSE
└── README.md
```

## Scope

This repository contains the generic Skill only. It does not include private site-specific bookmarklets or internal workflow examples.

## License

Apache License 2.0.
