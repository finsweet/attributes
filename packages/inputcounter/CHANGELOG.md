# @finsweet/attributes-inputcounter

## 1.2.6

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 1.2.5

### Patch Changes

- 1b3142f0: Fix bug regarding read time, for small paragraphs, default to 1 minute. Add examples data for select custom and input counter

## 1.2.4

### Patch Changes

- 1cfbca90: Update examples data and use clear attribute value inplace of option-reset, reset will be used as a fallback, may be removed completely in future.

## 1.2.3

### Patch Changes

- fbd4f6c2: Add tabindex="0" to the buttons automatically

## 1.2.2

### Patch Changes

- ddc110dc: Removed default initial value. Now users have to explicitly set an initial value using `fs-inputcounter-initial`.

## 1.2.1

### Patch Changes

- 54a8ee37: Update `fs-a11y` import to `@1`

## 1.2.0

### Minor Changes

- f06b218e: Added new `fs-inputcounter-showarrows` attribute.

  By default, the native number input arrows (increment/decrement spinners) are hidden using CSS.

  If the user defines `fs-inputcounter-showarrows="true"`, the number input will display as regular with the arrows.

## 1.1.0

### Minor Changes

- 460f73c6: Improved a11y + fixed invalid attribute key in API

## 1.0.1

### Patch Changes

- d7c4051a: Prevent default behavior of buttons

## 1.0.0

### Major Changes

- 1ece2f42: Created `fs-inputcounter` Attribute
