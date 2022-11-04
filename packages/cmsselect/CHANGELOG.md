# @finsweet/attributes-cmsselect

## 1.7.0

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

## 1.6.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 1.5.1

### Patch Changes

- Updated dependencies [4792998a]
- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @finsweet/attributes-cmscore@1.8.0
  - @global/factory@1.1.5

## 1.5.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4
  - @finsweet/attributes-cmscore@1.7.2

## 1.4.9

### Patch Changes

- Updated dependencies [d8a4bf6f]
  - @finsweet/attributes-cmscore@1.7.1

## 1.4.8

### Patch Changes

- Updated dependencies [ef56d454]
  - @finsweet/attributes-cmscore@1.7.0

## 1.4.7

### Patch Changes

- Updated dependencies [299fd136]
  - @finsweet/attributes-cmscore@1.6.10

## 1.4.6

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3
  - @finsweet/attributes-cmscore@1.6.9

## 1.4.5

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2
  - @finsweet/attributes-cmscore@1.6.8

## 1.4.4

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-cmsload@1.7.5
  - @finsweet/attributes-cmscore@1.6.7

## 1.4.3

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmsload@1.7.4
  - @finsweet/attributes-cmscore@1.6.7

## 1.4.2

### Patch Changes

- Updated dependencies [8f9d08d]
  - @finsweet/attributes-cmsload@1.7.3

## 1.4.1

### Patch Changes

- Updated dependencies [7f509db]
  - @finsweet/attributes-cmsload@1.7.2

## 1.4.0

### Minor Changes

Added support to use `cmsselect` + `cmsload` (all modes are supported) together.

Now when a user adds `cmsload` to the parent `Collection List` of a `fs-cmsselect-element="text-value"` element, `cmsselect` will populate the new options as soon they are loaded.

All `cmsload` modes are supported and will trigger adding all items as options.
For instance, if the `Collection List` uses `pagination` mode, all items will be added as `<select>` options even if the user doesn't click on the `Next` button.

Also, `cmsselect` will now make sure that the added options are unique and not repeated.
This means that now users can set the `fs-cmsselect-element="text-value"` to any `Collection List Item` inside a `cmsfilter` setup to populate a `<select>` dropdown in the filters form.

## 1.3.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.2.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsselect',
    (elements) => {
      console.log('Attribute has successfully loaded!');
      console.log(elements);
    },
  ]);
</script>
```

## 1.1.0

### Minor Changes

- Created `changesets.json` API.

## 1.0.4

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.0.3

### Patch Changes

- Updated package description.

## 1.0.2

### Patch Changes

- Breaking change: renamed `fs-cmsselect-element="source"` as `fs-cmsselect-element="text-value"`.
- Breaking change: renamed `fs-cmsselect-element="target"` as `fs-cmsselect-element="select"`.

## 1.0.1

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.0.0

### Major Changes

- Created the attribute package.
