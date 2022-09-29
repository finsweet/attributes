import type { AttributeSchema } from '$global/types/schema';

export default {
  elements: [
    {
      key: 'dropdown',
      description: 'Defines a dropdown element.',
      required: true,
      requiresInstance: true,
      appliedTo: [
        {
          label: 'Dropdown',
          selectors: ['.w-dropdown'],
        },
      ],
      multiplesInInstance: true,
      conditions: [
        {
          condition: 'isParentOf',
          type: 'selector',
          selector: [
            {
              label: 'Select',
              selectors: ['select.w-select'],
            },
          ],
        },
      ],
    },
    {
      key: 'label',
      description: 'Defines the label that displays the currently selected option.',
      required: false,
      requiresInstance: true,
      appliedTo: [
        {
          label: 'Text Block',
          selectors: ['div'],
        },
      ],
      multiplesInInstance: false,
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: 'dropdown',
        },
      ],
    },
    {
      key: 'option-reset',
      description: 'Defines an option that will remove the selected value.',
      required: false,
      requiresInstance: true,
      multiplesInInstance: false,
      appliedTo: [
        {
          label: 'Link Block',
          selectors: ['a.w-inline-block'],
        },
        {
          label: 'Text Link',
          selectors: ['a'],
        },
      ],
      conditions: [
        {
          condition: 'isChildOf',
          type: 'element',
          element: 'dropdown',
        },
      ],
    },
  ],
  settings: [
    {
      key: 'hideinitial',
      description: "Defines if the reset option should be hidden whenever there isn't an active selection.",
      appliedTo: {
        elements: ['dropdown'],
      },
      conditions: [],
      value: {
        type: 'boolean',
        default: 'true',
      },
    },
  ],
} as AttributeSchema;
