# @finsweet/attributes-docs

## 1.12.7

### Patch Changes

- 95fba640: Created `fs-videohls` Attribute.

## 1.12.6

### Patch Changes

- 489412f8: Created `fs-inputactive` Attribute.

## 1.12.5

### Patch Changes

- 239d236b: Added info about `fs-a11y`

## 1.12.4

### Patch Changes

- 1eb9c91e: Created `fs-accordion` Attribute.

## 1.12.3

### Patch Changes

- 3111ec89: Created `fs-starrating` Attribute.

## 1.12.2

### Patch Changes

- 460f73c6: Created `fs-modal` Attribute

## 1.12.1

### Patch Changes

- 1ece2f42: Created `fs-inputcounter` Attribute

## 1.12.0

### Minor Changes

- e2fa5c6f: Created fs-attributes-numbercount

## 1.11.0

### Minor Changes

- e4b3b680: Created new `window.fsAttributes.destroy()` method to support SPA environments.
  This new method allows users to destroy all Attributes instances, cleaning up event listeners, observers, states, global variables, etc.

  Websites that use a client-side router that simulates an SPA environment like [barba.js](https://barba.js.org/) or [Swup](https://swup.js.org/) can now properly init and destroy Attributes.
  After destroying, Attributes can be manually re-initted by calling `window.fsAttribute[ATTRIBUTE_KEY].init()`.

  Updated changesets system, now all updates will be correctly reflected in [the official updates page](https://www.finsweet.com/attributes/updates).

## 1.10.0

### Minor Changes

- bbeca5d2: Added readtime schema

## 1.9.0

### Minor Changes

- 4792998a: Created new `fs-cmsstatic` Attribute.

### Patch Changes

- Updated dependencies [4792998a]
  - @global/constants@1.2.0
  - @global/factory@1.1.5
  - @finsweet/attributes-codehighlight@1.4.1
  - @finsweet/attributes-copyclip@1.6.1
  - @finsweet/attributes-toc@1.1.1

## 1.8.0

### Minor Changes

- 07f32375: Created `fs-cmsattribute` Attribute

### Patch Changes

- Updated dependencies [07f32375]
  - @global/constants@1.1.0
  - @finsweet/attributes-codehighlight@1.4.0
  - @finsweet/attributes-copyclip@1.6.0
  - @finsweet/attributes-toc@1.1.0
  - @global/factory@1.1.4

## 1.7.13

### Patch Changes

- 7d626e05: Enabled support for socialshare and queryparams

## 1.7.12

### Patch Changes

- Updated dependencies [7542dcdb]
  - @global/constants@1.0.2
  - @global/factory@1.1.3
  - @finsweet/attributes-codehighlight@1.3.5
  - @finsweet/attributes-copyclip@1.5.5
  - @finsweet/attributes-toc@1.0.11

## 1.7.11

### Patch Changes

- Updated dependencies [bdd1a78]
  - @global/constants@1.0.1
  - @global/factory@1.1.2
  - @finsweet/attributes-codehighlight@1.3.4
  - @finsweet/attributes-copyclip@1.5.4
  - @finsweet/attributes-toc@1.0.10

## 1.7.10

### Patch Changes

- 13c3e23: Added `fs-socialshare` Attribute
- Updated dependencies [13c3e23]
  - @global/factory@1.1.1
  - @finsweet/attributes-codehighlight@1.3.3
  - @finsweet/attributes-copyclip@1.5.3
  - @finsweet/attributes-toc@1.0.9

## 1.7.9

### Patch Changes

- 627bf25: Added `fs-formsubmit` Attribute
- Updated dependencies [627bf25]
  - @global/factory@1.1.0
  - @finsweet/attributes-codehighlight@1.3.2
  - @finsweet/attributes-copyclip@1.5.2
  - @finsweet/attributes-toc@1.0.8

## 1.7.8

### Patch Changes

- @finsweet/attributes-codehighlight@1.3.1
- @finsweet/attributes-toc@1.0.7

## 1.7.7

### Patch Changes

- Fixed `Generate a url` copy to clipboard functionality.

## 1.7.6

### Patch Changes

- Added script for generate a URL in form on support page.

## 1.7.5

### Patch Changes

- Disabled autovideo support in attributes.json.

## 1.7.4

### Patch Changes

- Added missing `href` to the `cmscore` package.

## 1.7.3

### Patch Changes

- Updated `AttributesData` interface to differenciate between supported (must appear in the Attributes Support Tool) and not supported (must not appear in the Attributes Support Tool) attributes.
- Added `cmscore` data in the `attributes.json` API.

## 1.7.2

### Patch Changes

- Created custom code for `/api` pages.
- Added `readmeSrc` property to the `AttributesData` interfaces.

## 1.7.1

### Patch Changes

- Added `fs-toc` schema.

## 1.7.0

### Minor Changes

- Fixed Copy Code/Examples buttons not working.
- Moved internally used Attribute packages to be externally loaded in separate `<script>` tags and triggered using the new `FsAttributes.push()` developer API.

## 1.6.9

### Patch Changes

- Added new `attribute-card` element to make all `changelog` cards clickeable.

## 1.6.8

### Patch Changes

- Fixed `changelog.js` not being included in the package files.

## 1.6.7

### Patch Changes

- Fixed new `changeset` element creation issue with the new `queryElement` helper.
- Turned the `attributeTitle` element into a `<a>` tag.

## 1.6.6

### Patch Changes

- Fixed Webflow overriding the `collapse-all` element's scroll anchor behavior.

## 1.6.5

### Patch Changes

- Fixed `collapse-all` not using the `hash` for the scroll anchor.

## 1.6.4

### Patch Changes

- Fixed `collapse-all` using the full URL instead of just the hash to query select the scroll anchor.

## 1.6.3

### Patch Changes

- Implemented `scrollIntoView` for the anchor link of `collapse-all`.

## 1.6.2

### Patch Changes

- Fixed `collapse-all` button not scrolling to anchor on click.

## 1.6.16

### Patch Changes

- Added the new `codehighlight` package in the `attributes.json` API.

## 1.6.15

### Patch Changes

- Included the new `untransform` => `smartlightbox` package rename in the `attributes.json` API.

## 1.6.14

### Patch Changes

- Updated `Collapse All` button logic to work with the new setup.

## 1.6.13

### Patch Changes

- Updated `attributes.json` API to include `selectcustom`.

## 1.6.12

### Patch Changes

- Replaced `markdown-it` for `marked` as it's a more lightweight markdown parser.
- Fixed `Collapse All` button not behaving correctly.

## 1.6.11

### Patch Changes

- Made sure that the programatically created `<a>` `attribute-card` elements hold the correspondent attributes after the conversion.

## 1.6.10

### Patch Changes

- Programatically turned the `attribute-card` element into an `<a>` tag, as Webflow doesn't allow Rich Text Blocks inside links.

## 1.6.1

### Patch Changes

- Allowed `collpase-all` button to perform anchor scrolling to any section of the page.

## 1.6.0

### Minor Changes

- Added `fs-docs-element="collapse-all"` element.
- Updated `changelog` filtering system to pull the `changesets` data from each Attribute.

## 1.5.0

### Minor Changes

- Switched to `changesets` changelog population.
- Created `changelog` filtering system.
- Rearranged files structure.
- Updated all `attributes.json` data to include `changesets.json` and `schema.json` files.

## 1.4.1

### Patch Changes

- Switched from using `hljs.highlightBlock` to `hljs.highlightElement`.

## 1.4.0

### Minor Changes

- Added code highlighting.

## 1.3.1

### Patch Changes

- Added new packages in `attributes.json`.

## 1.3.0

### Minor Changes

- Removed unused code bits.
- Added `try`/`catch` check on the attributes data fetching.
- Made sure the script can be placed in the global Custom Code section instead of each Attribute's page.
- Added example copy validity check.

## 1.2.1

### Major Changes

- Created `CHANGELOG.md`.
