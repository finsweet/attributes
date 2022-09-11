# @finsweet/attributes-scrolldisable

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
