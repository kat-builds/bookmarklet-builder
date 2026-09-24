# Common Patterns

These are implementation patterns, not site-specific selectors.

## Copy the current page title and URL

Use `document.title` and `location.href`, format the result, then copy it.

## Copy text from a known page container

1. query a stable container
2. stop with a clear message when it is missing
3. normalize the container text
4. copy the result
5. preserve the text for manual fallback if clipboard writing fails

## Copy structured rows for spreadsheets

1. identify the repeated row/card elements
2. extract a fixed set of fields from each one
3. sanitize tabs and newlines inside fields
4. join fields with `\t`
5. join records with `\n`
6. copy the TSV result

## Read clipboard and open a generated URL

1. try `navigator.clipboard.readText()`
2. fall back to `prompt()` when appropriate
3. normalize and validate the input
4. construct the target URL explicitly
5. open it in the requested browsing context

## Open the current domain in another service

1. read `location.hostname`
2. remove a leading `www.` only if the destination expects a bare domain
3. encode the domain
4. append it to the target service URL

## Click a page element

1. select the intended element using a stable selector
2. verify it exists and is interactive
3. invoke `.click()`
4. show a concise failure message if no target is found

## Hide or remove an element

1. find the intended element
2. prefer a reversible style change when the user may want to restore it
3. remove the element only when requested
