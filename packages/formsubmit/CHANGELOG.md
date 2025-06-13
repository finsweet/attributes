# @finsweet/attributes-formsubmit

## 2.0.8

### Patch Changes

- Updated dependencies [3978889]
  - @finsweet/attributes-utils@0.1.1

## 2.0.7

### Patch Changes

- Updated dependencies [2af0bad]
  - @finsweet/attributes-utils@0.1.0

## 2.0.6

### Patch Changes

- Updated dependencies [378d74d]
  - @finsweet/attributes-utils@0.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [01973d8]
  - @finsweet/attributes-utils@0.0.5

## 2.0.4

### Patch Changes

- Updated dependencies [deef758]
  - @finsweet/attributes-utils@0.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [d21cbca]
  - @finsweet/attributes-utils@0.0.3

## 2.0.2

### Patch Changes

- c7b544d: chore: updated dependencies
- Updated dependencies [c7b544d]
  - @finsweet/attributes-utils@0.0.2

## 2.0.1

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 2.0.0

### Major Changes

- 01f7277: formsubmit: prepared for v2 release

## 1.4.1

### Patch Changes

- 8a17207e: Added missing `changesets.json` file.

## 1.4.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 1.3.1

### Patch Changes

- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @global/factory@1.1.5

## 1.3.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4

## 1.2.4

### Patch Changes

- 070fb82e: Added schema for support

## 1.2.3

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3

## 1.2.2

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2

## 1.2.1

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1

## 1.2.0

### Minor Changes

- f623bc7: Added new `fs-formsubmit-disable="true"` Attribute.
  If set to the `form` element, the form will be completely disabled, preventing all form submissions.

## 1.1.1

### Patch Changes

- f0da85d: Added examples

## 1.1.0

### Minor Changes

- 368e990: Renamed `redirecttarget` to `redirectnewtab`

## 1.0.1

### Patch Changes

- 6e15b33: Fixed the wait text not being correctly displayed on the Submit buttons while using enhanced mode.

## 1.0.0

### Major Changes

- 627bf25: Created the package

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
