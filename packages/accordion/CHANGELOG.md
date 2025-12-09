# @finsweet/attributes-accordion

## 2.0.11

### Patch Changes

- Updated dependencies [894db29]
  - @finsweet/attributes-utils@0.1.4

## 2.0.10

### Patch Changes

- Updated dependencies [ca570e1]
  - @finsweet/attributes-utils@0.1.3

## 2.0.9

### Patch Changes

- Updated dependencies [4e55c67]
  - @finsweet/attributes-utils@0.1.2

## 2.0.8

### Patch Changes

- Updated dependencies [3978889]
  - @finsweet/attributes-utils@0.1.1

## 2.0.7

### Patch Changes

- Updated dependencies [2af0bad]
  - @finsweet/attributes-utils@0.1.0

## 2.0.6

### Patch Changes

- Updated dependencies [378d74d]
  - @finsweet/attributes-utils@0.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [01973d8]
  - @finsweet/attributes-utils@0.0.5

## 2.0.4

### Patch Changes

- Updated dependencies [deef758]
  - @finsweet/attributes-utils@0.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [d21cbca]
  - @finsweet/attributes-utils@0.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [c7b544d]
  - @finsweet/attributes-utils@0.0.2

## 2.0.1

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 2.0.0

### Major Changes

- 2671384: prepare for v2 release

## 1.1.2

### Patch Changes

- a5e353b6: force all initially hidden accordions to start closed, as the library can't determine if the content is collapsed or not

## 1.1.1

### Patch Changes

- 11c1abab: Follow up to v1.1.0: Also include support for loaded items that are not appended to the DOM yet, which can happen when combining accordion + cmsload + cmsfilter.

## 1.1.0

### Minor Changes

- 7dbb3ebb: Add support to use `accordion` in combination with `cmsload`.

  For now, the support is limited to just `fs-cmsload-mode="render-all"`, as the other modes introduce some overhead when dealing with group-wide settings like `fs-accordion-single="true"`.

## 1.0.1

### Patch Changes

- 54a8ee37: Update `fs-a11y` import to `@1`

## 1.0.0

### Major Changes

- 1eb9c91e: Created `fs-accordion` Attribute.
