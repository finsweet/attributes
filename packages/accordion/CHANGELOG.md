# @finsweet/attributes-accordion

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
