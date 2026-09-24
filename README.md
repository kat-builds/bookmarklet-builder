# Bookmarklet Builder

I make small bookmarklets when I want to turn a repeated browser action into one click.

The difficult part is usually not the `javascript:` wrapper. It is getting the AI to understand the real page structure, use selectors that actually exist, and produce something that still works when I run it in the browser.

So I made `bookmarklet-builder`.

Instead of describing the page from memory or asking the AI to guess the DOM, I save the page HTML and give it to the AI with the action I want. The Skill uses that HTML as the source for the implementation, organizes the bookmarklet into its own folder, builds the code, and checks the result before it is finished.

## How I Use It

### 1. I save the page HTML

I download or save the HTML for the page I want the bookmarklet to work on and put the HTML file in the root of my working repository.

For example:

```text
bookmarklets/
└── source-code.html
```

The filename does not have to be `source-code.html`. If there is one obvious HTML file in the root, the Skill can use it.

### 2. I tell the AI what I want

For example:

```text
$bookmarklet-builder

Use the HTML in the repository root.

Create a bookmarklet that copies the job title, company, location and job description as plain text.
```

I describe the result I want. I do not need to provide CSS selectors or explain the page structure when the saved HTML contains that information.

### 3. The AI creates the bookmarklet project

The Skill tells the AI to:

1. inspect the supplied HTML
2. identify the website/platform and the requested function
3. create a short folder name based on `platform + function`
4. move the supplied HTML into that folder as the source fixture
5. build the bookmarklet from the actual page structure
6. create a short companion README
7. validate the final bookmarklet

For example:

```text
bookmarklets/
└── seek-job-text-copy/
    ├── source-code.html
    ├── seek-job-text-copy
    └── README.md
```

The bookmarklet file contains the final `javascript:` code. The README briefly explains what it does and where it is intended to run.

## Why I Use the HTML

A prompt can tell the AI what the bookmarklet should do, but it cannot tell the AI what the real page DOM looks like unless I provide that information.

The saved HTML gives the AI something concrete to inspect. It can find the actual content containers and selectors instead of guessing them from a description.

The Skill then adds the repeatable rules around that process: project naming, file organization, selector choices, bookmarklet format, fallbacks, and validation.

## Installation

Copy the `bookmarklet-builder` directory into a Skills location supported by your coding agent.

For agents that support the shared Skills directory:

```bash
mkdir -p ~/.agents/skills
cp -R bookmarklet-builder ~/.agents/skills/
```

Then invoke it with `$bookmarklet-builder`.

## What's Inside This Repo

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

The Skill contains the reusable workflow only. It does not include my private site-specific bookmarklets or saved page HTML.

## License

Apache License 2.0.
