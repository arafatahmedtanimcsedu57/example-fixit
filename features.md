# Features

What we're building, in the user's words. **Owned by a human** — the agent may draft
entries, but a person confirms each one before it feeds an OpenSpec proposal.

For each feature, write behaviour and states, not implementation. If something is unknown,
write it under "Open questions" rather than letting the agent guess.

---

## App-wide (every page)

**Behaviour**

- Unknown URL: "Page not found" with a link to the home page.
- A page crashes while rendering: "Something went wrong" with a link to reload the home page.
- While a page's code is loading on first visit: "Loading…".
- A request answered with 401 ends the session (the token is cleared).

**Status:** shipped

---

## Book list

**Who / why:** I keep one list of books I want to read and see where each one stands.

**Behaviour**

- Shows every book with its title, author and status.
- Statuses: Want to read → Reading → Finished.
- A filter shows All or a single status.
- Newest-added books come first.

**States**

- Loading: "Loading…"
- Empty: "No books yet — add one to start your list."
- Empty filter: "No books with this status."
- Load error: "Could not load your books."

**Edge cases**

- None beyond the states above.

**Open questions**

- Where the data lives: a real backend later, or only this browser (localStorage)?
- Extra fields beyond title and author (notes, rating when Finished, cover, dates)?

**Status:** planned

---

## Add a book

**Who / why:** I add a book to my list as soon as I hear about it.

**Behaviour**

- A form with Title (required) and Author (optional).
- A new book starts as "Want to read".
- Saving puts the book at the top of the list and clears the form.

**States**

- Save error: "Could not save the book. Try again." — the typed values are kept.

**Edge cases**

- Blank title → inline validation error, nothing is sent.
- Surrounding whitespace in title and author is trimmed.

**Open questions**

- Duplicates (same title + author already on the list): block or allow?

**Status:** planned

---

## Update or remove a book

**Who / why:** I move a book along as I read it, and drop books I've lost interest in.

**Behaviour**

- Change a book's status from the list.
- Remove a book after a confirmation: "Remove '<title>'?"

**States**

- Update or remove error: "Could not update the book." — the book returns to its previous
  state.

**Edge cases**

- Cancelling the confirmation leaves the book untouched.

**Open questions**

- None.

**Status:** planned
