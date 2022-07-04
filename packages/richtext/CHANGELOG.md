# @finsweet/attributes-richtext

## 1.7.1

### Patch Changes

- Updated dependencies [627bf25]
  - @global/factory@1.1.0

## 1.7.0

### Minor Changes

- 2040479: `feature`: Added external components source caching.
  Previously, if multiple components were loaded from an external URL like `/components`, that page was fetched once for each component.
  Now the library will cache all loaded external pages and only fetch them once, no matter how many components are being loaded from them.

  `fix`: Prevented the library from stopping when a component was loaded from an invalid URL.

## 1.6.0

### Minor Changes

- Added support wizard and publishing new schema version

## 1.5.1

### Patch Changes

- Fixed `fs-richtext-resetix` setting being incorrectly implemented as `fs-richtext-reset-ix`.
  Now all setups using `fs-richtext-resetix` should work properly.

## 1.5.0

### Minor Changes

Included a new `window.fsAttributes.push()` method in the developer API that provides a standarized way to safely access any Attribute internals once it has fully loaded.
It can be used like:

```html
<script>
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "richtext",
    rtbElements => {
      console.log("Attribute has successfully loaded!");
      console.log(rtbElements);
    }
  ]);
</script>
```

## 1.4.1

### Patch Changes

- Added line breaking `<br>` tags escaping.

  When performing a line break inside a Rich Text element using `Shift + Enter`, Webflow automatically adds a `<br>` tag, which can potentially conflict with the parsed custom HTML.

  Now `<br>` tags will be escaped as `\n` line breaks.

## 1.4.0

### Minor Changes

- Added support to write custom HTML inside the following elements:

  - `<li>`
  - `<blockquote>`
  - `<h1>`
  - `<h2>`
  - `<h3>`
  - `<h4>`
  - `<h5>`
  - `<h5>`
  - `<h6>`

  Previously, only custom HTML inside `<p>` elements was parsed.

- Removed unused global selector attribute.
- Released `v1.4.0.beta`.

## 1.3.0

### Minor Changes

- Created `changesets.json` API.

## 1.2.2

### Patch Changes

- Fixed `examples.json` not being available on NPM.

## 1.2.1

### Patch Changes

- `resetIx`: Preserved `ix2` state after re-initting the Webflow module.

## 1.2.0

### Minor Changes

- Now the original components templates are removed from the page after rendering them in the Rich Text Blocks.

## 1.1.2

### Patch Changes

- Added `initAttributes` call to make sure `window.fsAttributes` exists.

## 1.1.1

### Patch Changes

- Added support for situations like `<div class="rich-text-tip">**Pro Tip:** Test.</div>`, where `Pro Tip:` is set in bold, thus becoming the following rendered HTML: `<div class="rich-text-tip"><strong>Pro Tip:</strong> Test.</div>`.

## 1.1.0

### Minor Changes

- Added `fs-richtext-sanitize="true"` option. When set, `DOMPurify` will be dynamically imported and all HTML string swill be sanitized before rendering them.

## 1.0.1

### Patch Changes

- Made sure the `<!-- fs-richtext-ignore -->` check is trimmed before.

## 1.0.0

### Major Changes

- Created the attribute package.
