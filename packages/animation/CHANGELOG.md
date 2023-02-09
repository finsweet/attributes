# @finsweet/attributes-animation

## 1.2.1

### Patch Changes

- 8a17207e: Added missing `changesets.json` file.

## 1.2.0

### Minor Changes

- 460f73c6: - Improved animation functions.
  - Generated `esm` export.

## 1.1.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 1.0.11

### Patch Changes

- @global/factory@1.1.5

## 1.0.10

### Patch Changes

- @global/factory@1.1.4

## 1.0.9

### Patch Changes

- @global/factory@1.1.3

## 1.0.8

### Patch Changes

- @global/factory@1.1.2

## 1.0.7

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1

## 1.0.6

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0

## 1.0.5

### Patch Changes

- Added `prepareIn` function.

## 1.0.4

### Patch Changes

- Switched `anchor` option for `insertAfter` option.

## 1.0.3

### Patch Changes

- Fixed `anchor` option not being properly used in `Node.insertBefore`.

## 1.0.2

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.0.1

### Patch Changes

- Added `functions.js` in the `package.json`'s `files`.

## 1.0.0

### Major Changes

- Created the attribute package.
