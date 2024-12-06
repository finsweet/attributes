# @finsweet/attributes-a11y

## 2.0.1

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 2.0.0

### Major Changes

- 7740fc0: major: v2 release

## 1.1.3

### Patch Changes

- 3d5fa9b6: fix: prevent treating `contenteditable` elements as potential buttons

## 1.1.2

### Patch Changes

- 2b52be38: chore: update `focus-trap` dependency

## 1.1.1

### Patch Changes

- db4cbc24: Only observe `aria-expanded` and dialogs

## 1.1.0

### Minor Changes

- 59aa74dd: Improved keyboard accessibility for modals/dialogs

## 1.0.0

### Major Changes

- 1eb9c91e: Added support for `fs-accordion` + released official v1.0.0

## 0.2.1

### Patch Changes

- 460f73c6: Ensure compatibility with modal and inputcounter

## 0.2.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 0.1.3

### Patch Changes

- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @global/factory@1.1.5

## 0.1.2

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4

## 0.1.1

### Patch Changes

- 62a2d7f3: Ensured aria-expanded is always set for aria-controls controllers

## 0.1.0

### Minor Changes

- a14e67a5: Added aria-controls and keyboard-clicks functionalities.
