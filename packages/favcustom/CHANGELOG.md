# @finsweet/attributes-favcustom

## 1.3.3

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1

## 1.3.2

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0

## 1.3.1

### Patch Changes

- Increment build version

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
    "favcustom",
    linkHref => {
      console.log("Attribute has successfully loaded!");
      console.log(linkHref);
    }
  ]);
</script>
```

## 1.1.0

### Minor Changes

- Created `changesets.json` API.

## 1.0.5

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.0.4

### Patch Changes

- Updated `examples.json`.

## 1.0.3

### Patch Changes

- Renamed the property in `window.fsAttributes` to the original Attribute key name.

## 1.0.2

### Patch Changes

- Implemented the `generateSelectors` util.

## 1.0.1

### Patch Changes

- Fixed `currentScript` vs `params` distinction.
- Created `CHANGELOG.md`.

## 1.0.0

### Major Changes

- Created the attribute package.
