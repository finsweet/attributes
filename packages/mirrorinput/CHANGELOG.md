# @finsweet/attributes-mirrorinput

## 1.4.11

### Patch Changes

- 67a423a: fix: radio values mirroring

## 1.4.10

### Patch Changes

- Updated dependencies [ca570e1]
  - @finsweet/attributes-utils@0.1.3

## 1.4.9

### Patch Changes

- Updated dependencies [4e55c67]
  - @finsweet/attributes-utils@0.1.2

## 1.4.8

### Patch Changes

- Updated dependencies [3978889]
  - @finsweet/attributes-utils@0.1.1

## 1.4.7

### Patch Changes

- Updated dependencies [2af0bad]
  - @finsweet/attributes-utils@0.1.0

## 1.4.6

### Patch Changes

- Updated dependencies [378d74d]
  - @finsweet/attributes-utils@0.0.6

## 1.4.5

### Patch Changes

- Updated dependencies [01973d8]
  - @finsweet/attributes-utils@0.0.5

## 1.4.4

### Patch Changes

- Updated dependencies [deef758]
  - @finsweet/attributes-utils@0.0.4

## 1.4.3

### Patch Changes

- Updated dependencies [d21cbca]
  - @finsweet/attributes-utils@0.0.3

## 1.4.2

### Patch Changes

- c7b544d: chore: updated dependencies
- Updated dependencies [c7b544d]
  - @finsweet/attributes-utils@0.0.2

## 1.4.1

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 1.4.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 1.3.6

### Patch Changes

- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @global/factory@1.1.5

## 1.3.5

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @global/factory@1.1.4

## 1.3.4

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3

## 1.3.3

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2

## 1.3.2

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1

## 1.3.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0

## 1.3.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.2.1

### Patch Changes

- Fixed checkboxes not being correctly synced between trigger and target.
- Internal: updated `@finsweet/ts-utils` to include the fix.

## 1.2.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'mirrorinput',
    () => {
      console.log('Attribute has successfully loaded!');
    },
  ]);
</script>
```

## 1.1.0

### Minor Changes

- Created `changesets.json` API.

## 1.0.3

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.0.2

### Patch Changes

- Updated `examples.json`.

## 1.0.1

### Patch Changes

- Implemented the `generateSelectors` util.

## 1.0.0

### Major Changes

- Created the attribute package.
