# @finsweet/attributes-greenhouse

## 0.4.1

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 0.4.0

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

## 0.3.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 0.2.1

### Patch Changes

- Updated dependencies [4792998a]
- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @finsweet/attributes-cmscore@1.8.0
  - @global/factory@1.1.5

## 0.2.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4
  - @finsweet/attributes-cmscore@1.7.2

## 0.1.3

### Patch Changes

- Updated dependencies [d8a4bf6f]
  - @finsweet/attributes-cmscore@1.7.1

## 0.1.2

### Patch Changes

- Updated dependencies [ef56d454]
  - @finsweet/attributes-cmscore@1.7.0

## 0.1.1

### Patch Changes

- 5801086b: Use departments and offices associated with jobs for filters

## 0.1.0

### Minor Changes

- 2190d26f: Integrated with `cmsload` and `cmsfilter` and added all features.

## 0.0.4

### Patch Changes

- 96c6f6b0: Added filter for group by jobs

## 0.0.3

### Patch Changes

- a00e5a8f: Added nested collection

## 0.0.2

### Patch Changes

- 9e2dbe6c: Added missing description and removing all CMS List template items.

## 0.0.1

### Patch Changes

- a721125f: Added package
