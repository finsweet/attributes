# @finsweet/attributes-codehighlight

## 1.3.3

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-richtext@1.7.2

## 1.3.2

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-richtext@1.7.1

## 1.3.1

### Patch Changes

- Updated dependencies [2040479]
  - @finsweet/attributes-richtext@1.7.0

## 1.3.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.2.1

### Patch Changes

- Tweaked the `webflow.css` theme styles.

## 1.2.0

### Minor Changes

- Added support to use the `fs-codehighlight-element="code"` and `fs-codehighlight-theme` attributes on a single parent wrapper.
  All `<code>` children of this wrapper will be highlighted without having to add the attributes to each one of them.

## 1.1.2

### Patch Changes

- Improved library load speed by asynchronously loading `HighlightJS` before the DOM is ready.
  Now the package script will be loaded using `async` instead of `defer`.

## 1.1.1

### Patch Changes

- Added support to use the `webflow` theme in the `fs-codehighlight-theme="webflow"` attribute.

## 1.1.0

### Minor Changes

- Added `webflow` theme.

## 1.0.0

### Major Changes

- Created the attribute package.
