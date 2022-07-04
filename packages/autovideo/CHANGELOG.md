# @finsweet/attributes-autovideo

## 1.3.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0

## 1.3.0

### Minor Changes

- Added support wizard

## 1.2.2

### Patch Changes

- Published new `schema.json`.

## 1.2.1

### Patch Changes

- Small init fix.

## 1.2.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "autovideo",
    videosState => {
      console.log("Attribute has successfully loaded!");
      console.log(videosState);
    }
  ]);
</script>
```

## 1.1.0

### Minor Changes

- Created `changesets.json` API.

## 1.0.2

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.0.1

### Patch Changes

- Published to NPM.

## 1.0.0

### Major Changes

- Created the package.
