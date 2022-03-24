A host is where JS functionality is supported. Apart from language-core functionalities, the host provide specific functionalities.For Ex: Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

_All global functions are methods for global-object._

_Global object is different in different platforms_

## DOM Document Object Model

Contains page-content as objects. Those objects can be modiied. We can change/create anything on the page using it.
DOM is not only used in browsers. For Ex: server-side scripts can also use DOM (limited functionality support)

## BOM Browser Object Model

Represents additional objects provided by the browser for working with everything except for the document.

## Document Tree

According to DOM, every HTML tag is an object. Nested tags are "children" of the enclosing one. The text inside a tag is an object as well.

Following the above logic

```html
<body>
  <h1>Hello World</h1>
  <p>Lorem Ipsum</p>
</body>
```

Each tag above is an element node and text and tags which follow it are children nodes. Text forms text-nodes. Special characters like newline (\n), a space (\s) are valid characters and are text-nodes. Comment in HTML forms comment-node in DOM.

**Everything in HTML becomes a part of the DOM**

## Malformed HTML

If the browser encounters malformed HTML, it automatically corrects it when making the DOM.

## Walking the DOM

DOM's `document` serves as an entry point to access objects. Three common DOM objects are `document.documentElement` (`<html>`), `document.head` (`<head>`) and `document.body` (`<body>`).

Browser parses HTML from top to bottom. So if `<script>` tags are in `<head>`, there is a possibility that `document.body` is null. Also, if you place `<script>` inside the anywhere except at the end of the `<body>`, chances are that when the script is executed, it might not see tags after the `<script>` tag.

### DOM Navigation Methods

Most of these methods are lively (meaning it reflects changes happening in the browser) and read-only.

1. `firstChild` & `lastChild`. They fetch first/last child of an element. To know if an element has any children, use `elem.hasChildNodes()` method. The method returns array like object. One can use `for...of` to iterate the object. It can be coverted to an array using `Array.from`.

**Don't use `for...in` for iterable-like object as it will iterate over all enumerable properties (some of which are "extra" (rarely used) properties.**

2. Siblings of an element can be fetched using `nextSibling`/`previousSibling`. In order to find parent-node of an element, one can use `parentNode` property.

3. #1 & #2 provide methods that return nodes that are element-nodes, text-nodes, comment-nodes and so on. To find just element nodes, use following methods:

   - children – only those children that are element nodes.
   - firstElementChild, lastElementChild – first and last element children.
   - previousElementSibling, nextElementSibling – neighbor elements.
   - parentElement – parent element.

4. Certain types of DOM elements may provide additional properties, specific to their type, for convenience. Tables are a great example of that, and represent a particularly important case. The <table> element supports (in addition to the given above) these properties:

   - table.rows – the collection of <tr> elements of the table.
   - table.caption/tHead/tFoot – references to elements <caption>, <thead>, <tfoot>.
   - table.tBodies – the collection of <tbody> elements (can be many according to the standard, but there will always be at least one – even if it is not
   - in the source HTML, the browser will put it in the DOM).

## DOM Searching Methods

Helps in searching arbitrary element on the page.

1. `document.getElementById('table-index-123')` gets the element having id `table-index-123`.
2. `elem.querySelectorAll(css)` returns all elements inside `elem` matching the given CSS selectors. CSS inside the method also supports psuedo-classes.
3. `elem.querySelector(css)` returns the first element for the given CSS selector.
4. `elem.matches(css)` checks if `elem` amtches the given CSS-selector. It returns `true` or `false`.
5. `elem.closest(css)` looks for the nearest ancestor that matches the CSS-selector. The `elem` itself is also included in the search.
6. Other rarely used methods include (notice 'Elements` instead of 'Element' to indicate that those methods fetch a collection of inputs). All these methods return a live collection:
   - `elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The `tag` parameter can also be a star `"*"` for “any tags”.
   - `elem.getElementsByClassName(className)` returns elements that have the given CSS class.
   - `document.getElementsByName(name)` returns elements with the given `name` attribute, document-wide. Very rarely used.

Methods like `elem.querySelectorAll` and `querySelector` returns static collection.
