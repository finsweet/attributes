# @finsweet/attributes-codehighlight

## 2.0.1

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 2.0.0

### Major Changes

- 9578ee9: codehighlight: prepare for v2 release

## 1.5.2

### Patch Changes

- d8668014: chore: updated `highlight.js` dependency

## 1.5.1

### Patch Changes

- 2930a679: Added copy/paste examples.

## 1.5.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 1.4.1

### Patch Changes

- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @global/factory@1.1.5

## 1.4.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4

## 1.3.5

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3

## 1.3.4

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2

## 1.3.3

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-richtext@1.7.2

## 1.3.2

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-richtext@1.7.1

## 1.3.1

### Patch Changes

- Updated dependencies [2040479]
  - @finsweet/attributes-richtext@1.7.0

## 1.3.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.2.1

### Patch Changes

- Tweaked the `webflow.css` theme styles.

## 1.2.0

### Minor Changes

- Added support to use the `fs-codehighlight-element="code"` and `fs-codehighlight-theme` attributes on a single parent wrapper.
  All `<code>` children of this wrapper will be highlighted without having to add the attributes to each one of them.

## 1.1.2

### Patch Changes

- Improved library load speed by asynchronously loading `HighlightJS` before the DOM is ready.
  Now the package script will be loaded using `async` instead of `defer`.

## 1.1.1

### Patch Changes

- Added support to use the `webflow` theme in the `fs-codehighlight-theme="webflow"` attribute.

## 1.1.0

### Minor Changes

- Added `webflow` theme.

## 1.0.0

### Major Changes

- Created the attribute package.
