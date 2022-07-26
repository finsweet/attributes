# @finsweet/attributes-mirrorclick

## 1.4.2

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1

## 1.4.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0

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
    "mirrorclick",
    () => {
      console.log("Attribute has successfully loaded!");
    }
  ]);
</script>
```

## 1.2.0

### Minor Changes

- Created `changesets.json` API.

## 1.1.3

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.1.2

### Patch Changes

- Updated `examples.json`.

## 1.1.1

### Patch Changes

- Implemented the `generateSelectors` util.

## 1.1.0

### Minor Changes

- Created `CHANGELOG.md`.

## 1.0.0

### Major Changes

- Created the attribute package.
