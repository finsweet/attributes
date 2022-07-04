# @finsweet/attributes-cmscombine

## 1.6.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.6.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.5.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmscombine",
    cmsLists => {
      console.log("Attribute has successfully loaded!");
      console.log(cmsLists);
    }
  ]);
</script>
```

## 1.4.0

### Minor Changes

- Created `changesets.json` API.

## 1.3.1

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.3.0

### Minor Changes

- Added support for `cmscore` versioning.

## 1.2.4

### Patch Changes

- Updated `cmscore` import.

## 1.2.3

### Patch Changes

- Updated `cmscore` import.

## 1.2.2

### Patch Changes

- Updated `cmscore` import.

## 1.2.1

### Patch Changes

- Updated `cmscore` import.

## 1.2.0

### Minor Changes

- Removed `fs-cmscombine-element="target"` option as it could potentially create confusions.
  Now all lists in a group are always combined into the first one on the page.

## 1.1.3

### Patch Changes

- Updated `cmscore` import.

## 1.1.2

### Patch Changes

- Updated package descriptions.

## 1.1.1

### Patch Changes

- Added missing return statement in the `init` function.

## 1.1.0

### Minor Changes

- Integrated `CMSList` instances.

## 1.0.1

### Patch Changes

- Renamed the property in `window.fsAttributes` to the original Attribute key name.

## 1.0.0

### Major Changes

- Created the attribute package.
