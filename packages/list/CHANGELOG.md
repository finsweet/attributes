# @finsweet/attributes-list

## 1.13.0

### Minor Changes

- 1630b81: feat: `fs-list-tagvalues="separate"`

## 1.12.0

### Minor Changes

- 5938e3c: feat: close mobile keyboards after submitting

## 1.11.1

### Patch Changes

- Updated dependencies [894db29]
  - @finsweet/attributes-utils@0.1.4

## 1.11.0

### Minor Changes

- 1db6c0c: feat: support initializing nested lists

## 1.10.3

### Patch Changes

- deebb5b: fix: items loading in pages where static & CMS lists coexist

## 1.10.2

### Patch Changes

- bfcce31: fix: pagination buttons retrieval when using non-CMS lists

## 1.10.1

### Patch Changes

- d296447: fix: facet count results for single checkboxes

## 1.10.0

### Minor Changes

- b3a0d9d: feat: prefer instances over pagination query for filters & sorting params

## 1.9.2

### Patch Changes

- 6c7af1a: fix: ensure dynamic empty element is displayed

## 1.9.1

### Patch Changes

- 0f02217: fix: manual items nesting (slugs)

## 1.9.0

### Minor Changes

- e92fa33: feat: support displaying facet counts in `fs-selectcustom` elements.

## 1.8.0

### Minor Changes

- f7fd585: feat: `fs-list-facetcount="true"` as an alternative to `fs-list-element="facet-count"`

## 1.7.10

### Patch Changes

- aaae380: fix: facet-count conflict when select and non-select facets coexist

## 1.7.9

### Patch Changes

- 98cf173: fix: initialize nesting inside combined items

## 1.7.8

### Patch Changes

- bd5e772: fix: combine not rendering items correctly

## 1.7.7

### Patch Changes

- 93c4734: fix: pagination sometimes loading items with undefined list query params
- 37a6b2f: fix: respect items per page when loading a list in a non-first page

## 1.7.6

### Patch Changes

- c31ad9e: fix: race conditions when overlapping hook lifecycles
- c31ad9e: fix: respect pagination when injecting static elements
- c31ad9e: fix: make static item elements usable by multiple lists
- c31ad9e: fix: add missing destroy method for List instances

## 1.7.5

### Patch Changes

- ba68a30: fix: display `initial` element when all filter values are manually cleared

## 1.7.4

### Patch Changes

- f5fdef0: fix: better handling of dynamic filters clearing
- f5fdef0: fix: reset `interacted` when clearing filters

## 1.7.3

### Patch Changes

- 8a82e17: fix: filter the list on page load if there are default values

## 1.7.2

### Patch Changes

- 214c086: fix: support nesting in tabs & sliders

## 1.7.1

### Patch Changes

- 62578cd: fix: window undefined

## 1.7.0

### Minor Changes

- d3923b0: feat: `fs-list-split`

### Patch Changes

- d55892b: chore: internal updates for favoriting plugin

## 1.6.6

### Patch Changes

- 935b02e: fix: sliders and tabs not being populated

## 1.6.5

### Patch Changes

- f6da56e: fix: make fs-list slider & tabs compatible with sorting and filtering

## 1.6.4

### Patch Changes

- Updated dependencies [ca570e1]
  - @finsweet/attributes-utils@0.1.3

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
