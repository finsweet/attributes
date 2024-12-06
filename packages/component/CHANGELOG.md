# @finsweet/attributes-component

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
