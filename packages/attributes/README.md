<a target="_blank" href="https://finsweet.com/attributes">
  <picture>
    <img src="https://cdn.prod.website-files.com/648b0184fc925cdf643d8b74/681bae7059f00e0e5d4e5c97_banner-attributes.png" alt="Attributes by Finsweet - Free powerful features for your site, no confusing code" />
  </picture>
</a>

[![npm](https://img.shields.io/npm/v/@finsweet/attributes.svg)](https://www.npmjs.com/package/@finsweet/attributes) [![Hits](https://img.shields.io/jsdelivr/npm/hm/@finsweet/attributes)](https://www.npmjs.com/package/@finsweet/attributes) [![License](https://img.shields.io/npm/l/@finsweet/attributes.svg)](LICENSE.md)

## What is Attributes?

Attributes is an open source JavaScript library of solutions for adding filters, sort, load & search options, CMS tabs & sliders —and more— to Webflow using simple HTML attributes.

## Getting Started

Please follow the documentation at [finsweet.com/attributes](https://www.finsweet.com/attributes) to learn how to use Attributes in your Webflow projects.

## API Reference

Attributes will inject a global `window.FinsweetAttributes` object into your project that contains some methods to interact with the library.

To ensure that the library is loaded before you try to access the `window.FinsweetAttributes` object, you can use the following instantiation code:

```javascript
window.FinsweetAttributes ||= [];
window.FinsweetAttributes.push([
  'ATTRIBUTE_KEY', // 'list', 'copyclip', 'modal', etc.
  (result) => {
    // Your code goes here.
  },
]);
```

The result object will contain the API of the loaded attribute solution. Check the `README.md` file of each attribute solution for more information on the API.

### The `FinsweetAttributes` object

#### Properties

| Property  | Type     | Description                                                                                                                                                                                                                    |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `process` | `Set`    | Contains the currently active Attribute solutions.                                                                                                                                                                             |
| `modules` | `Object` | A key-value object that contains the controls for each active Attribute solution. Each key is the corresponding Attribute's key and each value is a [FinsweetAttributeControls](#the-finsweetattributecontrols-object) object. |
| `utils`   | `Object` | Contains utility functions [object](#the-finsweetattributesutils-object) for working with Attributes.                                                                                                                                                                        |

#### Methods

| Method                  | Description                                        | Arguments                                                                           |
| ----------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `push([key, callback])` | Run a callback after an Attribute has loaded.      | `key (string)`: The Attribute key.<br>`callback (function)`: The callback function. |
| `load(key)`             | Dynamically load an Attribute solution.            | `key (string)`: The Attribute key.                                                  |
| `destroy()`             | Destroys the instance and all Attribute solutions. |                                                                                     |

### The `FinsweetAttributeControls` object

#### Properties

| Property  | Type      | Description                                                                |
| --------- | --------- | -------------------------------------------------------------------------- |
| `version` | `string`  | The version of the Attribute.                                              |
| `loading` | `Promise` | A promise that resolves once the Attribute has loaded and returns its API. |

#### Methods

| Method      | Description                                                                                            | Arguments |
| ----------- | ------------------------------------------------------------------------------------------------------ | --------- |
| `restart()` | Restarts the Attribute. In practice, this means that the Attribute will be destroyed and loaded again. |           |
| `destroy()` | Destroys the Attribute.                                                                                |           |

### The `FinsweetAttributes.utils` object

```ts
type FinsweetAttributesUtils = {
  /**
   * Fetches and parses an external page.
   * Stores the page response in an IndexedDB if the page belongs to the same site.
   *
   * @param source The URL of the page to fetch
   * @param options Optional configuration object
   * @returns Promise that resolves to the page's Document if successful, null otherwise
   */
  fetchPage: (
    source: string | URL,
    options?: {
      cache?: boolean; // Whether to cache fetched documents. Defaults to `true`
      cacheExternal?: boolean; // Whether to cache external documents using a stale-while-revalidate strategy
      cacheKey?: string; // Manual database name for the IndexedDB instance
      cacheVersion?: number; // Manual version for the IndexedDB instance
    }
  ) => Promise<Document | null> | null;

  /**
   * Attaches external stylesheets from a fetched page to the current document head.
   * Only attaches stylesheets hosted on the Webflow Assets CDN that aren't already present.
   *
   * @param page The Document object from which to extract stylesheets
   * @returns Promise that resolves when all stylesheets have been attached
   */
  attachExternalStylesheets: (page: Document) => Promise<void>;
};
```
