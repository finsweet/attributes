# @finsweet/attributes-rangeslider

## 1.6.2

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1

## 1.6.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0

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
    "rangeslider",
    handleInstances => {
      console.log("Attribute has successfully loaded!");
      console.log(handleInstances);
    }
  ]);
</script>
```

## 1.4.0

### Minor Changes

- Turned `touch` event listeners to `passive` to pass the [Use passive listeners to improve scrolling performance](https://web.dev/uses-passive-event-listeners/) performance Lighthouse test.
- Improved Accessibility by assuring that each `Handle` has an `aria-label` attribute.
  The value of `aria-label` will be the `name` of the `<input>` element.
  If the user has already set this attribute in the Designer, `rangeslider` won't override that value.

## 1.3.1

### Patch Changes

- Added support for handling [Floating-Point precision issues](https://floating-point-gui.de/).
- Fixed an infinite loop being sometimes triggered during the `handle` - `input` update cycles.

## 1.3.0

### Minor Changes

- Created `changesets.json` API.

## 1.2.0

### Minor Changes

- Released `v1.2.0-beta`.

## 1.1.2

### Patch Changes

- Reduced `resize` debouncing from 100ms to 50ms.

## 1.1.1

### Patch Changes

- Added `examples.json` to the package.

## 1.1.0

### Minor Changes

- Added new `fs-rangefilter-formatdisplay="true"` attribute.
  Now, by default all `fs-rangefilter-element="display-value"` elements will display the numeric value without formatting.
  If the `formatdisplay` attribute is added to the `wrapper` element, the `display-value` elements will display a formatted value (formatting defaults to the user's country conventions, some countries use commas and other countries use dots).
- Added an extra check to make sure the Handles' start values are adjusted to the `step` increment coefficient.
- Added an extra rule to set the Handles' start value to the `minRange` or `maxRange` if the provided value doesn't match the range. When this happens, a custom `Debug` message will be displayed to warn the user when using `debugMode`.
- Added an extra `Debug` alert that warns the user when the provided `step` value doesn't fit the provided `[min,max]` range.

## 1.0.1

### Patch Changes

- Made sure the track is set to `position: relative` and the Handles & Fill have the correct `position: absolute` values.

## 1.0.0

### Major Changes

- Released `v1.0.0-beta` features.
- Added support to recalculate the range slider position on window `resize` events.
- Removed dependency on `Emittery`, reduced the package size from 14KB to 9KB.
- Internal refactoring and performance improvements.
