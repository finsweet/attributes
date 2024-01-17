# `cmssort` Attribute

Create advanced and complex no-code sorting for Webflow CMS Collection List content.

## JavaScript API

You can access the `cmssort` instances by pushing a callback into the `window.finsweetAttributes` object:

```typescript
window.finsweetAttributes = window.finsweetAttributes || [];
window.finsweetAttributes.push([
  'cmssort',
  (listInstances) => {
    console.log('cmssort Successfully loaded!');

    // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
    const [listInstance] = listInstances;

    // The `renderitems` event runs whenever the list renders items after sorting.
    listInstances.listInstance.on('renderitems', (renderedItems) => {
      console.log(renderedItems);
    });
  },
]);
```

The callback passes an array with all the `CMSList` instances on the page.
To see more about the `CMSList` instance, check the [`cmscore` docs](https://www.npmjs.com/package/@finsweet/attributes-cmscore).
