# @finsweet/attributes-displayvalues

## 1.2.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0

## 1.2.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "displayvalues",
    sourceElements => {
      console.log("Attribute has successfully loaded!");
      console.log(sourceElements);
    }
  ]);
</script>
```

## 1.1.0

### Minor Changes

- Created `changesets.json` API.

## 1.0.2

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.0.1

### Patch Changes

- Made sure a source element has targets on initialization.

## 1.0.0

### Major Changes

- Created the attribute package.
