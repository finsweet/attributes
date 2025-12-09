# @finsweet/attributes-inject

## 2.4.4

### Patch Changes

- Updated dependencies [894db29]
  - @finsweet/attributes-utils@0.1.4

## 2.4.3

### Patch Changes

- Updated dependencies [ca570e1]
  - @finsweet/attributes-utils@0.1.3

## 2.4.2

### Patch Changes

- Updated dependencies [4e55c67]
  - @finsweet/attributes-utils@0.1.2

## 2.4.1

### Patch Changes

- Updated dependencies [3978889]
  - @finsweet/attributes-utils@0.1.1

## 2.4.0

### Minor Changes

- 21ad38a: feat: import CSS for same-site-other-page components to support Webflow's new per page CSS splitting

## 2.3.1

### Patch Changes

- Updated dependencies [2af0bad]
  - @finsweet/attributes-utils@0.1.0

## 2.3.0

### Minor Changes

- 4c20f82: feat: support v1 richtext syntax OOO

## 2.2.0

### Minor Changes

- 31f4870: feat: `fs-inject-element="element"` as an alias for `fs-inject-element="component"`

## 2.1.6

### Patch Changes

- Updated dependencies [378d74d]
  - @finsweet/attributes-utils@0.0.6

## 2.1.5

### Patch Changes

- Updated dependencies [01973d8]
  - @finsweet/attributes-utils@0.0.5

## 2.1.4

### Patch Changes

- Updated dependencies [deef758]
  - @finsweet/attributes-utils@0.0.4

## 2.1.3

### Patch Changes

- Updated dependencies [d21cbca]
  - @finsweet/attributes-utils@0.0.3

## 2.1.2

### Patch Changes

- 87fef70: fix: resetix

## 2.1.1

### Patch Changes

- c7b544d: chore: updated dependencies
- Updated dependencies [c7b544d]
  - @finsweet/attributes-utils@0.0.2

## 2.1.0

### Minor Changes

- fa746b6: feat: fs-inject

## 2.0.1

### Patch Changes

- b56e5e5: rename fsAttribute in places of usage to finsweetAttribute
- Updated dependencies [b56e5e5]
  - @finsweet/attributes-utils@0.0.1

## 2.0.0

### Major Changes

- 0ccef15: component: prepared for v2 release

## 1.2.0

### Minor Changes

- a46aeb57: enhancement: wait until an external component's CSS has fully loaded before appending that component to the DOM. This avoids flashing the raw HTML without styles in slow connections.

### Patch Changes

- 9d623872: enhancement: enabled external documents caching when fetching resources from non-Webflow projects.

## 1.1.0

### Minor Changes

- 5c40136c: feat: when importing an external component, automatically convert all the relative urls to absolute using the source origin as the base.
  ie:

  - Footer is imported from `https://attributes.finsweet.com/styleguides`.
  - Contains relative links like `/agency`.
  - Links are rewritten to be `https://wf.finsweet.com/agency`.

- 459e6f62: feat: use a [stale-while-revalidate](https://web.dev/stale-while-revalidate/) approach when serving components from external sources.

## 1.0.0

### Major Changes

- 3ee8cdfd: Initial release
