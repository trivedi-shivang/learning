- JSX is a tag-based JavaScript syntax that looks a lot like HTML.
- React is the library for creating views. ReactDOM is the library used to actually render the UI in the browser.
- The invention of AJAX (Asynchronous JavaScript and XML) brought us the single-page application, or SPA. Since browsers could request and load tiny bits of data using AJAX, entire web applications could now run out of a single page and rely on JavaScript to update the user interface.

- In an SPA, the browser initially loads one HTML document. As users navigate through the site, they actually stay on the same page. JavaScript destroys and creates a new user interface as the user interacts with the application.
- DOM API is a collection of objects that JS can use to interact with the browser to modify the DOM.
- React Elements declare how DOM should look like so that we don't have to interact with DOM directly. React will
  For Ex:

```javascript
React.createElement("h1", { id: "recipe-0" }, "Baked Salmon");
// when logged, it would look like
{
  $$typeof: Symbol(React.element),
  "type": "h1",
  "key": null,
  "ref": null,
  "props": {id: "recipe-0", children: "Baked Salmon"},
  "_owner": null,
  "_store": {}
}
```

- The `type` property of the React element tells React what type of HTML or SVG element to create.
- The props property represents the data and child elements required to construct a DOM element.
- The children property is for displaying other nested elements as text.

This is transformed into:

```html
<h1 id="recipe-0">Baked Salmon</h1>
```

To render the element in browser, one has to use `ReactDOM.render`. The element we want to render is passed as the first argument, and the second argument is the target node.

```javascript
const dish = React.createElement("h1", null, "Baked Salmon");
ReactDOM.render(dish, document.getElementById("root")); //dish will be rendered inside element with id "root"

// multiple elements can also be rendered as siblings
const dish = React.createElement("h1", null, "Baked Salmon");
const dessert = React.createElement("h2", null, "Coconut Cream Pie");
ReactDOM.render([dish, dessert], document.getElementById("root"));

// nested element(s) can also be created as follows
React.createElement("ul", null, React.createElement("li", null, "Hello World"));
{
  $$typeof: Symbol(React.element),
  "type": "ul",
  "key": null,
  "ref": null,
  "props": {
    "children": [{
        "type": "li",
        "props" : {
            "children": "Hello World"
        }
    }]
  },
  "_owner": null,
  "_store": {}
}
/*
 * <ul>
 *  <li>Hello World</li>
 * </ul>
 */
```

A React app is a tree of React elements all stemming from a single root element. React elements are the instructions React will use to build a UI in the browser.

When we build a list of child elements by iterating through an array, React likes each of those elements to have a key property. The key property is used by React to help it update the DOM efficiently.

## Component?

- Components allow us to reuse the same structure, and then we can populate those structures with different sets of data.
- Components are written in a function. The function will return the component.

```javascript
const secretIngredients = [
  "2 lb salmon",
  "5 sprigs fresh rosemary",
  "2 tablespoons olive oil",
  "2 small lemons",
  "1 teaspoon kosher salt",
  "4 cloves of chopped garlic",
];
function IngredientsList({ items }) {
  return React.createElement(
    "ul",
    { className: "ingredients" },
    items.map((item, index) => React.createElement("li", { key: index }, item))
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  React.createElement(IngredientsList, { items: secretIngredients }),
  rootElement
);
```

Here, `IngredientsList` is a component which creates react-elements dynamically based on `props.items` (this is passed as attributes when `IngredientsList` is created in `render` method.)

`JSX`
`createElement` is a good but not practical way to create React Elements. JSX extension(released by Facebook, it combines JS and X from XML) allow to define react-elements using a tag-based syntax directly within out JS code. JSX tags look very similar to HTML.

- In JSX, an element’s type is specified with a tag.
- The tag’s attributes represent the properties.
- The element’s children can be added between the opening and closing tags.
- When passing JS values to components as properties to JSX elements, they have to be surrounded by `{}`

## JSX Tips

- JSX allows tp add components as children to other components.

```htm
<IngredientsList>
    <Ingredient>
    <Ingredient>
    <Ingredient>
</IngredientsList>
```

- JS expressions should be used for values that need to evaluated. THose values have to be wrapped in `{}`.
- JSX is JS and can be wrapped in JS functions.

_Babel converts JSX to `React.createElement` calls. This process is similar to compilation of other object-oriented languages._

## React Fragments

Is a wrapper created either by `<React.Fragment></React.Fragment>` or by `<></>`. It will render two or more adjacent or sibling elements as a component without enclosing them in unnecessary tags like `<div>`.

```javascript
function Cat({ name }) {
  return (
    <>
      <h1>The cat's name is {name}</h1>
      <p>He's good.</p>
    </>
  );
}
```

## Intro to Webpack

It is a module bundler. It takes all kinds of files (JS, LESS, CSS, JSX, ESNext and so on) and turns them into single file. This allows to work in team-environment on differnt files and then combining them for production purposes in a single file to gain network-performance (by reducing HTTP calls for each file). Aside from code compilation, webpack also can handle:

- Code splitting
  Splits up your code into different chunks that can be loaded when you need them. Sometimes these are called rollups or layers; the aim is to break up code as needed for different pages or devices.

- Minification
  Removes whitespace, line breaks, lengthy variable names, and unnecessary code to reduce the file size.

- Feature Flagging
  Sends code to one or more—but not all—environments when testing out features.

- Hot Module Replacement (HMR)
  Watches for changes in source code. Changes only the updated modules immediately.

**Create-React-App is a tool which uses Webpack BTS (Behind the Scenes).**

## State Management

State is the other half. The state of a React application is driven by data that has the ability to change. Hooks is a React feauture. It has reusable code logic which can be hooked up with components. There are several built-in hooks and one create hooks on top of that.

Hooks function can cause the component they are hooked into to rerender. Hooks are designed to be used in React components.

Maintaining State in each component is difficult. Thus, it is easy to maintain it at root level and it will pass the colors down to child components to handle the rendering.

A pure component is a function component that does not contain state and will render the same user interface given the same props.

## Controlled and Uncontrolled Components

### Uncontrolled Components

React Ref allows to access DOM node directly. A Ref is an object that stores values for the lifetime of a component.

```javascript
const txtTitle = useRef(); //creates a ref
//<input ref={txtTitle} /> // setting the value for the txtTitle ref by adding the ref attribute to input elements
```

After setting the value for the txtTitle ref, it creates `current` field on ref object (`txtTitle.current`).
One can reset the ref's current-value by assigning a different value. For Ex:
`txtTitle.current.value = ''`
This makes a component an uncontrolled component because it uses DOM (non React code) to save the form values.

```javascript
import { useRef } from "react";
export default function AddColorForm({ onNewColor = (f) => f }) {
  const txtTitle = useRef();
  const hexColor = useRef();
  const submit = (e) => {
    e.preventDefault();
    const title = txtTitle.current.value;
    const color = hexColor.current.value;
    onNewColor(title, color);
    txtTitle.current.value = "";
    hexColor.current.value = "";
  };
  return (
    <form onSubmit={submit}>
      <input ref={txtTitle} type="text" placeholder="color title..." required />
      <input ref={hexColor} type="color" required />
      <button>Add</button>
    </form>
  );
}
```

### Controlled Component

In a controlled component, the form values are managed by React and not the DOM.
It’s worth pointing out that controlled form components are rerendered, a lot. Think about it: every new character typed in the title field causes the AddColorForm to rerender. Using the color wheel in the color picker causes this component to rerender way more than the title field because the color value repeatedly changes as the user drags the mouse around the color wheel.

```javascript
import { useState } from "react";
export default function AddColorForm({ onNewColor = (f) => f }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");
  const submit = (e) => {
    e.preventDefault();
    onNewColor(title, color);
    setTitle("");
    setColor("");
  };
  return (
    <form onSubmit={submit}>
      <input
        value={title}
        type="text"
        placeholder="color title..."
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        value={color}
        onChange={(e) => setColor(e.target.value)}
        type="color"
        required
      />
      <button>Add</button>
    </form>
  );
}
```

<!-- React Controlled Component with Custom Hook. Any change in custom hooks rerenders AddColorForm -->

```javascript
// ./hooks/useInput.js
import { useState } from "react";
export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: (e) => setValue(e.target.value) },
    () => setValue(initialValue),
  ];
};

// ./components/AddColorForm.js
import { useState, useTitle } from "react";
export default function AddColorForm({ onNewColor = (f) => f }) {
  const [titleProps, resetTitle] = useTitle("");
  const [colorProps, resetColor] = useTitle("#000000");
  const submit = (e) => {
    e.preventDefault();
    onNewColor(titleProps.value, colorProps.value);
    resetTitle();
    resetColor();
  };
  return (
    <form onSubmit={submit}>
      <input
        {...titleProps}
        type="text"
        placeholder="color title..."
        required
      />
      <input {...colorProps} type="color" required />
      <button>Add</button>
    </form>
  );
}
```

## Context

In React, context is like jet-setting for your data. You can place data in React context by creating a context provider. A context provider is a React component you can wrap around your entire component tree or specific sections of your component tree. The context provider is the departing airport where your data boards the plane. It’s also the airline hub. All flights depart from that airport to different destinations. Each destination is a context consumer. The context consumer is the React component that retrieves the data from context. This is the destination airport where your data lands, deplanes, and goes to work.

In order to use context in React, we must first place some data in a context provider and add that provider to our component tree.
Context can be used by creating an instance of the same as follows:
`export const ColorContext = createContext();`
