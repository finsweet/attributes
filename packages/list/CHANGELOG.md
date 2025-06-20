# @finsweet/attributes-list

## 1.6.3

### Patch Changes

- Updated dependencies [4e55c67]
  - @finsweet/attributes-utils@0.1.2

## 1.6.2

### Patch Changes

- 6ab6500: fix: use optional chaining for `window.CSS.registerProperty`

## 1.6.1

### Patch Changes

- 7c0fe8d: fix: hooks crashing when animations are aborted

## 1.6.0

### Minor Changes

- 579443a: feat: support per-page CSS in list nest

## 1.5.1

### Patch Changes

- 3978889: fix: respect instances when multiple lists with pagination exist on the same page
- 3978889: fix: don't add aria-hidden to pagination buttons
- Updated dependencies [3978889]
  - @finsweet/attributes-utils@0.1.1

## 1.5.0

### Minor Changes

- bc17316: feat: `fs-list-showtag`

## 1.4.7

### Patch Changes

- 978384a: fix: support `fs-list-element="facet-count"` for elements that are rendered after initializing filters

## 1.4.6

### Patch Changes

- 3b9fe56: fix: don't set empty arrays in query params

## 1.4.5

### Patch Changes

- 81e9e3e: fix: only JSON.stringify array values for query params
- 124839b: fix: query params filters reactivity

## 1.4.4

### Patch Changes

- 2f45dd5: fix: hide next buttons correclty when items are filtered

## 1.4.3

### Patch Changes

- 621ed61: fix: hide pagination next when itemsPerPage > items.length

## 1.4.2

### Patch Changes

- 6246fbb: fix: combine + pagination
- 2eac30b: fix: prevent race conditions in facet counts
- d2af879: fix: filtering items with nested properties

## 1.4.1

### Patch Changes

- Updated dependencies [2af0bad]
  - @finsweet/attributes-utils@0.1.0

## 1.4.0

### Minor Changes

- 4805858: feat: beautify query params

### Patch Changes

- 4805858: fix: respect `fs-list-allowsubmit` for sorting forms

## 1.3.1

### Patch Changes

- Updated dependencies [378d74d]
  - @finsweet/attributes-utils@0.0.6

## 1.3.0

### Minor Changes

- 8c7ab62: feat: support debouncing in dynamic mode

### Patch Changes

- 102879c: chore: trim field attributes
- f5b70e5: chore: remove console logs in the wild

## 1.2.9

### Patch Changes

- c685c7b: fix: active class removal
- Updated dependencies [01973d8]
  - @finsweet/attributes-utils@0.0.5

## 1.2.8

### Patch Changes

- Updated dependencies [deef758]
  - @finsweet/attributes-utils@0.0.4

## 1.2.7

### Patch Changes

- 1c2900f: fix: support 2 way binding for dynamic filter values
- d21cbca: refactor: unify form field value getters and setters
- Updated dependencies [d21cbca]
  - @finsweet/attributes-utils@0.0.3

## 1.2.6

### Patch Changes

- 58529b7: fix: make infinite loading more responsive
- ed6876f: fix: update page count in more/infinite modes

## 1.2.5

### Patch Changes

- 216237e: fix: fall back fs-list-loadcount source to the list element
- b84f8cd: fix: support `fs-list-element="clear"` in dynamic mode

## 1.2.4

### Patch Changes

- 87fef70: fix: resetix

## 1.2.3

### Patch Changes

- 76a962f: fix: only highlight text nodes

## 1.2.2

### Patch Changes

- c7b544d: chore: updated dependencies
- Updated dependencies [c7b544d]
  - @finsweet/attributes-utils@0.0.2

## 1.2.1

### Patch Changes

- 43ffe73: fix: removal of items

## 1.2.0

### Minor Changes

- 205c30b: feat: list animations

### Patch Changes

- f349526: chore: finalize animations

## 1.1.0

### Minor Changes

- 3f92ebb: feat: remove tags in dynamic mode

## 1.0.0

### Major Changes

- 99ec3f2: feat: fs-list

## 0.1.1

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 0.1.0

### Minor Changes

- e2ca8e3: fs-list: added automatic & manual nesting

### Patch Changes

- 7081cb7: fs-list: renamed "load" options
