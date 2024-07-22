# @finsweet/attributes-launchdarkly

## 0.2.1

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 0.2.0

### Minor Changes

- 076f14bc: Added support for `href` properties.

## 0.1.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 0.0.4

### Patch Changes

- d9f1bc9b: Update type check. Add html attribute support

## 0.0.3

### Patch Changes

- 1c656af6: Add cloack attributes support

## 0.0.2

### Patch Changes

- 1b3fad56: Add json attribute support

## 0.0.1

### Patch Changes

- 3124efe3: First script iteration
