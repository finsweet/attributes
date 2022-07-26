# @finsweet/attributes-sliderdots

## 1.6.3

### Patch Changes

- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-cmsslider@1.5.3

## 1.6.2

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-cmsslider@1.5.2

## 1.6.1

### Patch Changes

- Selector for slider and slider-nav updated in Schema.

## 1.6.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.5.0

### Minor Changes

- Added support to use the native `Slider Nav` element as the container of the custom slider dots.
  The user can now completely skip adding the `fs-sliderdots-element="slider-nav"` attribute to any element.
  When this is the case, the library will use the native `Slider Nav` as a fallback.

## 1.4.1

### Patch Changes

- Added support for using `cmsslider` + `sliderdots` together.
  If both attributes are detected, now `sliderdots` will wait until `cmsslider` has finished populating all Slides before creating the Custom Slider Dots.

## 1.4.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "sliderdots",
    sliders => {
      console.log("Attribute has successfully loaded!");
      console.log(sliders);
    }
  ]);
</script>
```

## 1.3.0

### Minor Changes

- Added support to apply `fs-sliderdots-remove="true"` to the `fs-sliderdots-element="slider-nav"` element.
  If applied, all existing content inside the custom slider nav will be removed before appending the custom dots.
- Released `v1.3.0-beta.0`.

## 1.2.0

### Minor Changes

- Created `changesets.json` API.

## 1.1.2

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.1.1

### Patch Changes

- Updated `examples.json`.

## 1.1.0

### Minor Changes

- Added `fs-sliderdots-element="slider-nav"` functionality. Now all dots will become custom dots that are synced with the original dots.

## 1.0.2

### Patch Changes

- Renamed the property in `window.fsAttributes` to the original Attribute key name.

## 1.0.1

### Patch Changes

- Implemented the `generateSelectors` util.

## 1.0.0

### Major Changes

- Created the attribute package.
