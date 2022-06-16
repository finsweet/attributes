# `cmsload` Attribute

Set up load more functionality in Webflow CMS. User click, infinite, pagination, and render-all options available.

## CDN Import

```html
<!-- [Attributes by Finsweet] CMS Load -->
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js"></script>
```

## JavaScript API

You can access the `cmsload` instances by pushing a callback into the `window.fsAttributes` object:

```typescript
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsload',
  (listInstances) => {
    console.log('cmsload Successfully loaded!');

    // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
    const [listInstance] = listInstances;

    // The `renderitems` event runs whenever the list renders items after switching pages.
    listInstance.on('renderitems', (renderedItems) => {
      console.log(renderedItems);
    });
  },
]);
```

The callback passes an array with all the `CMSList` instances on the page.
To see more about the `CMSList` instance, check the [`cmscore` docs](https://www.npmjs.com/package/@finsweet/attributes-cmscore).
