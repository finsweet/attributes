# @finsweet/attributes-cmsprevnext

## 1.4.3

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-cmscore@1.6.7

## 1.4.2

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.4.1

### Patch Changes

- Selector for Collection List updated in schema.

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
    "cmsprevnext",
    cmsLists => {
      console.log("Attribute has successfully loaded!");
      console.log(cmsLists);
    }
  ]);
</script>
```

## 1.2.0

### Minor Changes

- Created `changesets.json` API.

## 1.1.2

### Patch Changes

- Added support to compare URLs with and without a trailing slash `/`.
  Now cases like this will match:
  - Current URL: https://www.finsweet.com/attributes/attractions/capri-island/
  - Collection Item URL: https://www.finsweet.com/attributes/attractions/capri-island

## 1.1.1

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.1.0

### Minor Changes

- Added support for `cmscore` versioning.

## 1.0.4

### Patch Changes

- Updated `cmscore` import.

## 1.0.3

### Patch Changes

- Updated `cmscore` import.

## 1.0.2

### Patch Changes

- Updated `cmscore` import.

## 1.0.1

### Patch Changes

- Updated `cmscore` import.

## 1.0.0

### Major Changes

- Created attribute package.
