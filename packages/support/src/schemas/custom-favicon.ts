import type { AttributeSchema } from '@global/types/schema';

export default {
  elements: [
    {
      key: 'src',
      description: 'Defines an `<img>` element which `src` will be set as the favicon.',
      appliedTo: [{ label: 'Image', selectors: ['img'] }],
      multiplesInInstance: false,
      conditions: [],
      required: true,
      requiresInstance: false,
    },
  ],
  settings: [],
} as AttributeSchema;
