# Bookmarklet Builder

I work in the browser a lot.

On the iPhone, we have Shortcuts for turning things we do often into quick actions. Browsers have their own little shortcuts too.

Some are search shortcuts — type a keyword and search a specific site.

Some come from browser extensions.

And some can sit right in your bookmarks bar: click a bookmark, and it does something on the page for you.

These are called **bookmarklets**.

A bookmarklet is a small piece of code saved as a bookmark that does something with the page you're already on.

You can make one that copies a specific part of a page, extracts information into a format you want, converts a time or value, takes selected text and searches for it somewhere else, opens the current domain in another tool, clicks or hides something on the page, or turns a few repeated browser steps into one click.

And now that we have AI, we don't really need to know how to write all of that code ourselves. We can just save the page HTML, tell the AI what we want the bookmarklet to do, and ask it to build one.

The problem is that the result isn't always consistent.

That's why I made **Bookmarklet Builder**, a Skill that helps AI create bookmarklets in a more consistent way.

---

## How to Use It

Install the Skill, or just give your AI this repository and ask it to use the Skill:

https://github.com/kat-builds/bookmarklet-builder

### 1. Save the page HTML

Open the page you want the bookmarklet to work on.

Save the page HTML using any of these methods:

- Go to **File → Save Page As**
- Right-click the page and choose **Save As**
- Use **Ctrl + S** on Windows or **Cmd + S** on Mac

Then put the saved HTML file in the folder where you want to create your bookmarklet project.

You don't need to rename or edit the HTML. The AI will organize it for you.

### 2. Tell the AI what you want

If you installed the Skill, you can use:

```text
$bookmarklet-builder

Use this HTML file:
/Users/name/Downloads/page.html

Create a bookmarklet that copies the job title, company, location and job description as plain text.
```

If you haven't installed the Skill, give your AI the repository instead:

```text
Use the Bookmarklet Builder Skill from:
https://github.com/kat-builds/bookmarklet-builder

Use this HTML file:
/Users/name/Downloads/page.html

Create a bookmarklet that copies the job title, company, location and job description as plain text.
```

You only need to tell the AI **which HTML file to use** and **what you want the bookmarklet to do**.

### 3. The AI builds and organizes it

The Skill tells the AI to:

1. Inspect the HTML you provided
2. Understand the website and what you want the bookmarklet to do
3. Create a short folder name based on the **platform + function**
4. Move the HTML into the new folder and rename it `source-code.html`
5. Create the bookmarklet as `bookmarklet-code`
6. Create a short `README.md` explaining what it does
7. Validate the bookmarklet before finishing

For example:

```text
your-folder/
└── seek-job-text-copy/
    ├── source-code.html
    ├── bookmarklet-code
    └── README.md
```

`source-code.html` is the page you saved.

`bookmarklet-code` contains the code you will add to your browser.

`README.md` is a short explanation of what the bookmarklet does and where to use it.

### 4. Add it to your browser

Now create a new bookmark in your browser. You can also bookmark any page first and then edit that bookmark.

Change the bookmark name to something that describes the action, for example:

```text
Copy SEEK Job
```

Open `bookmarklet-code`, copy the entire code, and paste it into the bookmark's **URL** field.

Save the bookmark.

That's it. When you're on the page it was made for, click the bookmark and it will run the action for you.

## What Bookmarklets Can't Always Do

Bookmarklets are great for small actions on the page you're currently viewing, but they don't have the same access as a browser extension.

They may not be suitable when you need to:

- Run something automatically in the background
- Keep working after you close or leave the page
- Monitor pages continuously
- Use browser features that normal page JavaScript cannot access
- Read content from another website that the current page cannot access
- Work reliably across many websites that all have different page structures
- Build a large interface or a tool with lots of persistent data

For those kinds of tasks, a browser extension or a small web app may be a better fit.
