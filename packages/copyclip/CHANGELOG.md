# @finsweet/attributes-copyclip

## 1.5.2

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0

## 1.5.1

### Patch Changes

- Fixed copying empty targets causing unexpected behaviors.

## 1.5.0

### Minor Changes

- Added support to copy content from Form Fields (`input`, `select`, `textarea`).

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
    "copyclip",
    ([copyTriggers, destroyCallbacks]) => {
      console.log("Attribute has successfully loaded!");
      console.log([copyTriggers, destroyCallbacks]);
    }
  ]);
</script>
```

## 1.2.1

### Patch Changes

- Fixed hidden target elements (set to `display: none`) not being copied correctly.
  This fixes the issue both for regular targets and for sibling targets.

## 1.2.0

### Minor Changes

- Created `changesets.json` API.

## 1.1.9

### Patch Changes

- Published production files.

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

## 1.1.10

### Minor Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.0.0

### Major Changes

- Created the attribute package.
