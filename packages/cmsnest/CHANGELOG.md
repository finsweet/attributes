# @finsweet/attributes-cmsnest

## 1.6.3

### Patch Changes

- 87507d5: `Fix`: prevented `cmsnest` from crashing when the user has incorreclty set up a duplicated Collection List source inside the item's Template Page.
  Previously, the library tried to nest the same Collection under a single target for each source that was located in the Template Page.
  Now the library will detect this invalid setup and just populate a single instance of each Collection for each nest target.
