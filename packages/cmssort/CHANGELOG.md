# @finsweet/attributes-cmssort

## 1.13.1

### Patch Changes

- 5e90c912: Fixed `fs-cmssort-type="number"` sorting issues.

## 1.13.0

### Minor Changes

- 24fb1c75: Added support to use any regular element as a CMS element, essentially allowing users to do things like:

  - Filtering a list of static elements.
  - Sorting a list of static elements.
  - Creating Tabs from static elements.
  - Creating Slides from static elements.
  - etc...

  Users can now do this is by adding the following Attributes to any element:

  - `fs-cms-element="wrapper"`
  - `fs-cms-element="list"`
  - `fs-cms-element="item"`
  - `fs-cms-element="pagination-wrapper"`
  - `fs-cms-element="pagination-next"`
  - `fs-cms-element="pagination-previous"`
  - `fs-cms-element="page-count"`
  - `fs-cms-element="empty"`

  This essentially tells Attributes to not only look for the native Webflow elements (Collection List Wrapper, Collection List, etc...), but to also look for these Attributes.

  In order to make static systems work, users have to replicate the same exact structure of the Webflow native CMS. So for example, to create a static list, users have to define elements using the same architecture:

  ```
  |_ Collection List Wrapper (fs-cms-element="wrapper")
    |_ Collection List (fs-cms-element="list")
      |_ Collection List Item (fs-cms-element="item")
  ```

## 1.12.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 1.11.1

### Patch Changes

- 7b72713e: Fixed `fs-cmssort-type="number"` sorting.
  Now the numbers will be normalized before sorting, meaning that values that contain alphanumeric symbols like `$20,000.00` will be converted to a valid float like `20000.00` to sort them correctly.

## 1.11.0

### Minor Changes

- 4792998a: Created new `fs-cmsstatic` Attribute.

### Patch Changes

- Updated dependencies [4792998a]
- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @finsweet/attributes-cmscore@1.8.0
  - @global/factory@1.1.5
  - @global/import@1.0.4

## 1.10.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4
  - @global/import@1.0.3
  - @finsweet/attributes-cmscore@1.7.2

## 1.9.8

### Patch Changes

- Updated dependencies [d8a4bf6f]
  - @finsweet/attributes-cmscore@1.7.1

## 1.9.7

### Patch Changes

- Updated dependencies [ef56d454]
  - @finsweet/attributes-cmscore@1.7.0

## 1.9.6

### Patch Changes

- 070fb82e: Updated schema field types from element to default

## 1.9.5

### Patch Changes

- Updated dependencies [299fd136]
  - @finsweet/attributes-cmscore@1.6.10

## 1.9.4

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3
  - @global/import@1.0.2
  - @finsweet/attributes-cmscore@1.6.9

## 1.9.3

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2
  - @global/import@1.0.1
  - @finsweet/attributes-cmscore@1.6.8

## 1.9.2

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-cmscore@1.6.7

## 1.9.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.9.0

### Minor Changes

- 369c058: Added support for decimal and negative numbers using `fs-cmssort-type="number"`

## 1.8.1

### Patch Changes

- Selector for Collection List updated in schema.

## 1.8.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.7.1

### Patch Changes

- Added [API docs](https://www.npmjs.com/package/@finsweet/attributes-cmssort).

## 1.7.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmssort',
    (cmsLists) => {
      console.log('Attribute has successfully loaded!');
      console.log(cmsLists);
    },
  ]);
</script>
```

## 1.6.3

### Patch Changes

- Added compatibility with the new `cmsload`'s support for Webflow's native pagination query params.

## 1.6.2

### Patch Changes

- Removed `cmscore >= 1.4.1` checks for `originalItemsOrder` management. Now it will always use the newer `CMSList.restoreItemsOrder()` method.

## 1.6.1

### Patch Changes

- Added support for default values on `Select Field` elements sorting.
  Now if the library detects that a sorting `Select Field` has a value when the page loads, it will automatically apply the sorting to existing items and any loaded one.

## 1.6.0

### Minor Changes

- Created `changesets.json` API.

## 1.5.0

### Minor Changes

- Switched `originalItemsOrder` to be managed by `cmscore`.

## 1.4.4

### Patch Changes

- Fixed `fs-cmssort-duration` being incorrectly applied.

## 1.4.3

### Patch Changes

- Removed `cmscore v1.2.0` checks.

## 1.4.2

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.4.1

### Patch Changes

- Added support to override default list animation duration when it was already set by other `cms` packages.

## 1.4.0

### Minor Changes

- Added support for `cmscore` versioning.

## 1.3.3

### Patch Changes

- Fixed items not being sorted correctly when some of them have an empty value.

## 1.3.2

### Patch Changes

- Updated `cmscore` import.

## 1.3.1

### Patch Changes

- Updated `cmscore` import.

## 1.3.0

### Minor Changes

- [Buttons]: Added support to override `fs-cmsort-asc="ASC_CSS_CLASS"` and `fs-cmsort-desc="DESC_CSS_CLASS"` at the buttons level.
  If the CSS Class Attributes are set to the list, all buttons inherit them by default, but each individual button can override these global values by setting the Attributes to it.
- [Buttons]: Added new `fs-cmssort-reverse="true"` optional attribute. If set to a button element, the first click will trigger `desc` sorting instead of the default `asc`.

## 1.2.0

### Minor Changes

- Added support to use `fs-cmssort-element="scroll-anchor"`.
  If set to any element on the page, the viewport will scroll into it when a sorting action is triggered.

## 1.1.1

### Patch Changes

- Added support for Alphanumeric sorting. Before, the following strings:

  - Project 0
  - Project 1
  - Project 2
  - Project 10
  - Project 11
  - Project 12
  - Project 20
  - Project 21
  - Project 22

  Were sorted like:

  - Project 0
  - Project 1
  - Project 10
  - Project 11
  - Project 12
  - Project 2
  - Project 20
  - Project 21
  - Project 22

  Now strings that contain both characters and numbers are analyzed and sorted correctly.

## 1.1.0

### Minor Changes

- Added support to build sorting systems with native `Dropdown` components.
- Internal refactoring / performance improvements.

## 1.0.1

### Patch Changes

- Updated `cmscore` import.

## 1.0.0

### Major Changes

- Created the attribute package.
