# @finsweet/attributes-cmscss

## 1.3.5

### Patch Changes

- Updated dependencies [299fd136]
  - @finsweet/attributes-cmscore@1.6.10

## 1.3.4

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3
  - @finsweet/attributes-cmscore@1.6.9

## 1.3.3

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2
  - @finsweet/attributes-cmscore@1.6.8

## 1.3.2

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-cmscore@1.6.7

## 1.3.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmscore@1.6.7

## 1.3.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmscss",
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

## 1.1.1

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.1.0

### Minor Changes

- Added support for `cmscore` versioning.

## 1.0.2

### Patch Changes

- Updated `cmscore` import.

## 1.0.1

### Patch Changes

- Updated `cmscore` import.

## 1.0.0

### Major Changes

- Created the attribute package.
