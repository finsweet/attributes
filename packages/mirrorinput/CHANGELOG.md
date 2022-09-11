# @finsweet/attributes-mirrorinput

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
    "mirrorinput",
    () => {
      console.log("Attribute has successfully loaded!");
    }
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
