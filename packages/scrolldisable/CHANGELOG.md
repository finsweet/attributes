# @finsweet/attributes-scrolldisable

## 1.6.3

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 1.6.2

### Patch Changes

- dc0f0dba: fix: support disabling scrolling when `fs-scrolldisable-element="when-visible"` is used on an element that it's displayed on page load.

## 1.6.1

### Patch Changes

- e0f8a545: Attempted to fix the current issues in [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock) by monkey-patching the package with [Vercel's fork](https://github.com/vercel/body-scroll-lock).

## 1.6.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 1.5.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

## 1.4.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.3.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'scrolldisable',
    () => {
      console.log('Attribute has successfully loaded!');
    },
  ]);
</script>
```

## 1.2.0

### Minor Changes

- Created `changesets.json` API.

## 1.1.11

### Patch Changes

- Updated `Example 3: When Visible` data.
- Updated `README.md`.

## 1.1.10

### Minor Changes

- Added a [temporary fix](https://github.com/willmcpo/body-scroll-lock/issues/237#issuecomment-954804479) to prevent Safari on `iOS 15` from jumping to the top of the page.
  This temporary patch will be removed once [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock) releases an official update that addresses this issue.

## 1.1.9

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.1.8

### Patch Changes

- Updated `examples.json`.

## 1.1.7

### Patch Changes

- Renamed the property in `window.fsAttributes` to the original Attribute key name.

## 1.1.6

### Patch Changes

- Implemented the `generateSelectors` util.

## 1.1.5

### Patch Changes

- Fixed `currentScript` vs `params` distinction.
- Created `CHANGELOG.md`.

## 1.0.0

### Major Changes

- Created the attribute package.
