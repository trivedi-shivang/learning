# JavaScript Fundamentals

## Hello World

`script` tag is used in HTML to indicate internal/external script.

### External

- External script files can be attached to HTML using `src` attribute.
  `<script src="/path/to/script.js"></script>`
  Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"`, just like `src="./script.js"`, would mean a file `"script.js"` in the current folder.

- Exteranal scripts are downloaded and are stored in browser's cache. Other pages that reference those scripts will take it from the cache.
  A single `<script>` tag can’t have both the `src` attribute and code inside.

## Code Structure

## Statements

    Statements are syntax constructs and commands that perform actions.

## Semicolons

Sometimes browsers insert semicolon when it sees a new line. But this is not always true. It is thus recommended to insert `;` after every statement.

## Comments

As time goes on, programs become more and more complex. It becomes necessary to add comments which describe what the code does and why.

- One-line comments start with two forward slash characters `//`.
- Multiline comments start with a forward slash and an asterisk `/*` and end with an asterisk and a forward slash `*/`.

Nested comments are not supported.

## `Use strict`

ES5 modifies some of the existing features. To see those modifications working, one has to explicitly enable them with a special directive: `use strict`.

- Please make sure that `use strict` is at the top of your scripts, otherwise strict mode may not be enabled.
- There’s no way to cancel `use strict`

Modern JavaScript supports “classes” and “modules” – advanced language structures, that enable `use strict` automatically.

## Variables

A variable is a named place in the memory where a value is stored. `let message = 'Hello';` Variables names cannot be one of reserved words.

### Variable naming

There are two limitations on variable names in JavaScript:

- The name must contain only letters, digits, or the symbols $ and \_.
- The first character must not be a digit.

* When the name contains multiple words, camelCase is commonly used.

A variable assigned without declaration is allowed and automatically declares the variable in non-strict mode but causes error in strict mode.

```javascript
"use strict";
num = 5; //error: num is not defined
```

### Constants

- To declare constant variable, use `const` instead of `let`.
- Constant variables are named using capital letters and underscores.
- Capital-named constants are only used as aliases for “hard-coded” values.

### Variable naming rules.

Some good-to-follow rules are:

- Use human-readable names like userName or shoppingCart.
- Stay away from abbreviations or short names like a, b, c, unless you really know what you’re doing.

- Make names maximally descriptive and concise. Examples of bad names are data and value. Such names say nothing. It’s only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.

- Agree on terms within your team and in your own mind. If a site visitor is called a “user” then we should name related variables currentUser or newUser instead of currentVisitor or newManInTown.
