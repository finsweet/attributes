
<div align="center">
  <img src='https://placehold.co/600x200/000000/FFFFFF.png?text=Finsweet+Attributes\n::+Internal+utils&font=Source Sans Pro' alt="Project logo">
</div>

<h3 align="center">@finsweet/attributes</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/finsweet/The-Documentation-Compendium.svg)](https://github.com/finsweet/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/finsweet/The-Documentation-Compendium.svg)](https://github.com/finsweet/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A collection of internal utils used by the Finsweet Attributes package.
    <br>
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About](#about)
- [🚀 Utils](#utils)
  - [Animations](#animations)
  - [Components](#components)
  - [Constants](#constants)
  - [Helpers](#helpers)
    - [Arrays](#arrays)
  - [Types](#types)
- [✍️ Authors](#️-authors)
- [🎉 Acknowledgements](#-acknowledgements)

## 🧐 About

This package is a collection of internal utils used by the Finsweet Attributes package to help existing and future developers to maintain and improve the codebase. It is not intended to be used by anyone outside of the Finsweet team.

## 🚀 Utils

Below is a list of all the util collections included in this package. Each util is a function that can be imported and used in your code.

### a). Animations

#### 1. Factory

#### 2. Types

### b). Components

#### 1. Copy JSON Button

#### 2. Interaction

### c). Constants

#### 1. a11y

#### 2. Attributes

#### 3. Keyboard

#### 4. Webflow

##### **`CMS_CSS_CLASSES`**

An object containing the CSS classes used by the CMS. This is used to identify CMS elements in the DOM.

```js
{
  wrapper: 'w-dyn-list',
  list: 'w-dyn-items',
  item: 'w-dyn-item',
  paginationWrapper: 'w-pagination-wrapper',
  paginationNext: 'w-pagination-next',
  paginationPrevious: 'w-pagination-previous',
  pageCount: 'w-page-count',
  emptyState: 'w-dyn-empty',
}
```

### d). Helpers

This collection of utils is a set of functions that help with common tasks. They are not specific to any particular part of the codebase.

#### 1. Arrays

- **sameValues(array1: unknown[], array2: unknown[])** <br>- Returns `true` if both arrays have the same values, `false` otherwise.

#### 2. CMS

- **getCMSElementSelector(key: keyof typeof [CMS_CSS_CLASSES](#cms_css_classes))** <br>- Returns the CMS object from the window object. If the CMS is not found, it returns `null`.
  
  **Parameters:**

  > - **key** - The key / class of the CMS object to return.

  **Returns:**
  
  > `string` - A CSS selector for a CMS element

- **getCollectionListWrappers(selectors: Array<string | null | undefined>, page = document)** <br>- Queries `Collection List Wrapper` elements and makes sure they are unique.
  
  **Parameters:**

  > - **selectors** - The selectors used for the query. If an empty array is provided, all `Collection List Wrapper` elements will be returned.
  > - **page** - The document where to perform the query.

  **Returns:**

  > `CollectionListWrapperElement[]` - A unique list of `Collection List Wrapper` elements.

- **getCollectionElements(reference: string | Element, target: 'wrapper' | 'list' | 'items' | 'empty' | 'pagination' | 'next' | 'previous' | 'pageCount', page: Document = document)** <br>- This helper is intended to allow users setting the selectors to either the `Collection List Wrapper` or the `Collection List` elements.

  **Parameters:**

  > - **reference** - The element or selector of the element.
  > - **target** - The requested element/elements. It can be either the `Collection List Wrapper`, the `Collection List` or all the `Collection Item` elements.
  > - **page** - The page document.

  **Returns:**

  > `CollectionListWrapperElement | CollectionListElement | CollectionItemElement[] | PaginationButtonElement | PageCountElement | CollectionEmptyElement | null | undefined` -The specified collection element/elements.

#### 3. Dates

- **normalizeDate(value: string)** <br>- Converts a string to a `Date` and returns a formatted version.

  **Parameters:**

  > - **value** - The date string to convert.

  **Returns:**

  > `DateConstructor` - The date object with the converted date.

#### 4. DOM

- **ensureUniqueId(element: Element)** <br>- Ensures that an element has a unique ID. If the element already has a unique ID, that one is preserved.

  **Parameters:**

  > - **element** - The element to ensure a unique ID for.

  **Returns:**

  > `unknown` - The unique ID assigned to the element.

- **isVisible(element: HTMLElement)** <br>- Checks if an element is visible.

  **Parameters:**

  > - **element** - The element to check.

  **Returns:**

  > `boolean` - `true` if the element is visible, `false` otherwise.

- **cloneNode(node: T, deep = true)** <br>- Clones a node and returns the clone.

  **Parameters:**

  > - **node** - The node to clone.
  > - **deep** - If `true`, the children of the node will also be cloned.

  **Returns:**

  > `T` - The cloned node of type `Node`.

- **findTextNode(element: HTMLElement)** <br>- Finds the first child text node of an element.

  **Parameters:**

  > - **element: `HTMLElement`** - The element to search into.

  **Returns:**

  > `ChildNode | undefined` - The first text node of the element or `undefined` if none is found.

- **getHiddenParent(element: HTMLElement)** <br>- Finds the first hidden parent of an element.

  **Parameters:**

  > - **element: `HTMLElement`** - The element to search into.

  **Returns:**

  > `HTMLElement | undefined` - The first hidden parent element, or the element itself (if hidden). If the element is already visible, the function returns `undefined`.

- **isScrollable(element: Element)** <br>- Checks if an element is scrollable.

  **Parameters:**

  > - **element** - The element to check.

  **Returns:**

  > `boolean` - `true` if the element is scrollable, `false` otherwise.

#### 5. Events

- **addListener(target: TargetInterface | null | undefined, type: Type, listener: Listener, options?: boolean | AddEventListenerOptions)** <br>- Adds an event listener to a target.

  **Parameters:**

  > - **target** - The target to add the event listener to.
  > - **type** - The type of event to listen for.
  > - **listener** - The function to call when the event is triggered.
  > - **options** - An object that specifies characteristics about the event listener.

  **Returns:**
  > `void` - A callback to remove the event listener from the element.

- **simulateEvent(target: EventTarget, events: AllowedEvent | Array<AllowedEvent>)** <br>- Dispatches a custom event that bubbles from the target.

  **Parameters:**

  > - **target** - The element where the event will originate.
  > - **events** - The event name or an array of event names.

  **Returns:**
  > `boolean` - True if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

#### 6. Fetch

- **fetchPageDocument(source: string | URL,{cache = true,cacheExternal,cacheKey,    cacheVersion,}: { cache?: boolean; cacheExternal?: boolean; cacheKey?: string;cacheVersion?: number } = {})** <br>- Fetches and parses an external page. Stores the page response in an `{@link IDBDatabase}` if the page belongs to the same site.

  **Parameters:**

  > - **source** - The URL of the page to fetch.
  > - **cache** - Whether to cache fetched documents. Defaults to `true`.
  > - **cacheExternal** - Whether to cache external documents. If set to true, it will follow a [stale-while-revalidate](https://web.dev/stale-while-revalidate/) strategy.
  > - **cacheKey** - Defines a manual database name for the IndexedDB instance.
  > - **cacheVersion** - Defines a manual version for the IndexedDB instance.

  **Returns:**
  > `Promise<Document | null>` - A promise that resolves to the page's {@link Document} if successful, `null` otherwise.

#### 7. Forms

- **clearFormField(field: FormField, omitEvents: Parameters<typeof simulateEvent>['1'] = [])** <br>- Clears the form field's value and emits an input and changed event.

  **Parameters:**

  > - **field** - The `FormField` to clear.
  > - **omitEvents** - By default, events are dispatched from the `FormField`. In some cases, these events might collide with other logic of the system. You can omit certain events from being dispatched by passing them in an array.

  **Returns:**
  > `void` - Nothing.

- **getFormFieldValue(input: FormField)** <br>- Gets the value of a given input element.

  **Parameters:**

  > - **input** - The `FormField` to get the value from.

  **Returns:**
  > `string | null` - The value of the form field.

- **setFormFieldValue = (element: FormField, value: string | boolean)** <br>- Sets a value to a FormField element and emits `click`, `input` and `change` Events.

  **Parameters:**

  > - **element** - The `FormField` to update.
  > - **value** - `boolean` for Checkboxes and Radios, `string` for the rest.

  **Returns:**
  > `void` - Nothing.

#### 8. Guards

- **isString(value: unknown)** <br>- Checks if a value is a string.

  **Parameters:**

  > - **value** - The value to check.

  **Returns:**
  > `boolean` - `true` if the value is a string, `false` otherwise.

- **isNumber(value: unknown)** <br>- Checks if a value is a number.
  
    **Parameters:**
  
    > - **value** - The value to check.
  
    **Returns:**
    > `boolean` - `true` if the value is a number, `false` otherwise.

- **isBoolean(value: unknown)** <br>- Checks if a value is a boolean.

    **Parameters:**

    > - **value** - The value to check.
  
    **Returns:**
    > `boolean` - `true` if the value is a boolean, `false` otherwise.

- **isUndefined(value: unknown)** <br>- Checks if a value is undefined.
  
    **Parameters:**
  
    > - **value** - The value to check.
  
    **Returns:**
    > `boolean` - `true` if the value is undefined, `false` otherwise.

- **noop()** <br>- It literally does nothing.

    **Parameters:**
  
    > - None
  
    **Returns:**
    > `void` - Nothing.

- **isNotEmpty(value: T | null | undefined)** <br>- Makes sure a value is not `null` or `undefined`. Useful for type safety when filtering empty elements from an array. Check out the example for more in-depth explanation.

    **Parameters:**
  
    > - **value** - The value to check.
  
    **Returns:**
    > `boolean` - `true` if the value is not empty, `false` otherwise.

- **isKeyOf(key: string | null | undefined,source: readonly T[])** <br>- Checks if a key is included in a readonly array.

    **Parameters:**
  
    > - **key** - The key to check.
    > - **source** - Readonly array of strings.
  
    **Returns:**
    > `boolean` - `true` if the key is part of the list, `false` otherwise.

- **getObjectKeys(object: T)** <br>- Gets the keys of an object with inferred typing.

    **Parameters:**
  
    > - **object** - The object to get the keys from.
  
    **Returns:**
    > `(keyof T)[]` - The names of the enumerable string properties and methods of an object.

- **getObjectEntries(object: T)** <br>- Gets the entries of an object with inferred typing.

    **Parameters:**
  
    > - **object** - The object to get the entries from.
  
    **Returns:**
    > `Entry<T>[]` - An array of key/value pairs for every enumerable string property and method of an object.

- **isElement(target: unknown)** <br>- Checks if a value is an element.

    **Parameters:**
  
    > - **target** - The target to check if it is an element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of Element type, `false` otherwise.

- **isHTMLElement(target: unknown)** <br>- Checks if a value is an HTML element.
  
    **Parameters:**
  
    > - **target** - The target to check if it is an HTML element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLElement type, `false` otherwise.

- **isHTMLVideoElement(target: unknown)** <br>- Checks if a value is an HTML video element.
  
    **Parameters:**
  
    > - **target** - The target to check if it is an HTML video element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLVideoElement type, `false` otherwise.

- **isHTMLInputElement(target: unknown)** <br>- Checks if a value is an HTML input element.
  
    **Parameters:**
  
    > - **target** - The target to check if it is an HTML input element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLInputElement type, `false` otherwise.

- **isHTMLSelectElement(target: unknown)** <br>- Checks if a value is an HTML select element.
  
    **Parameters:**
  
    > - **target** - The target to check if it is an HTML select element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLSelectElement type, `false` otherwise.

- **isHTMLTextAreaElement(target: unknown)** <br>- Checks if a value is an HTML textarea element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML textarea element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLTextAreaElement type, `false` otherwise.

- **isFormField(element: Element | EventTarget | null)** <br>- Checks if a value is a FormField element.

    **Parameters:**
  
    > - **element** - The element to check if it is a FormField element.
  
    **Returns:**
    > `boolean` - `true` if the element is a FormField element, `false` otherwise.

- **isHTMLAnchorElement(target: unknown)** <br>- Checks if a value is an HTML anchor element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML anchor element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLAnchorElement type, `false` otherwise.

- **isHTMLOptionElement(target: unknown)** <br>- Checks if a value is an HTML option element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML option element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLOptionElement type, `false` otherwise.

- **isHTMLImageElement(target: unknown)** <br>- Checks if a value is an HTML image element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML image element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLImageElement type, `false` otherwise.

- **isHTMLButtonElement(target: unknown)** <br>- Checks if a value is an HTML button element.

    **Parameters:**
  
    > - **target** - The target to check if it is an HTML button element.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of HTMLButtonElement type, `false` otherwise.

- **isFile(target: unknown)** <br>- Checks if a value is a File object.

    **Parameters:**
  
    > - **target** - The target to check if it is a File object.
  
    **Returns:**
    > `boolean` - `true` if the target is an instance of File type, `false` otherwise.

#### 9. HTML

#### 10. Numbers

#### 11. Props

#### 12. Selectors

#### 13. Urls

#### 14. Wait

#### 15. Webflow

### e). Types

#### 1. Base

#### 2. Changesets

#### 3. DOM

#### 4. Examples

#### 5. Schemas

#### 6. Utils

#### 7. Webflow

## ✍️ Authors

- [@author](https://github.com) - Collection & documentation

See also the list of [contributors](https://github.com) who participated in this project.

## 🎉 Acknowledgements

- Hat tip to anyone whose code was used
- Inspiration
- References
