import type { AttributeSchema } from '$global/types/schema';

import uiService from './UIService';

describe('Test UI Service', () => {
  test('Test required instance', () => {
    const schema: AttributeSchema = {
      elements: [
        {
          key: 'my-required-element',
          description: 'Defines the element',
          required: true,
          requiresInstance: false,
          multiplesInInstance: false,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
        {
          key: 'not-required-element',
          description: 'Defines the element',
          required: false,
          requiresInstance: true,
          multiplesInInstance: false,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
      ],
      settings: [],
      fields: [],
    };
    const uiConfig = uiService('CMS Load', schema);

    expect(uiConfig?.requiredInstance).toBeTruthy();
  });

  test('Test not required instance', () => {
    const schema: AttributeSchema = {
      elements: [
        {
          key: 'my-required-element',
          description: 'Defines the element',
          required: true,
          requiresInstance: false,
          multiplesInInstance: false,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
        {
          key: 'not-required-element',
          description: 'Defines the element',
          required: false,
          requiresInstance: false,
          multiplesInInstance: false,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
      ],
      settings: [],
      fields: [],
    };
    const uiConfig = uiService('CMS Load', schema);

    expect(uiConfig?.requiredInstance).toBeFalsy();
  });

  test('Test required elements without setting', () => {
    const schema: AttributeSchema = {
      elements: [
        {
          key: 'my-required-element',
          description: 'Defines the element',
          required: true,
          requiresInstance: true,
          multiplesInInstance: false,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
        {
          key: 'not-required-element',
          description: 'Defines the element',
          multiplesInInstance: false,
          required: false,
          requiresInstance: true,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
      ],
      settings: [],
      fields: [],
    };
    const uiConfig = uiService('CMS Load', schema);

    expect(uiConfig?.requiredElements.length).toEqual(1);

    expect(uiConfig?.requiredElements[0].key).toEqual('my-required-element');
  });

  test('Test setting in required element', () => {
    const schema: AttributeSchema = {
      elements: [
        {
          key: 'my-required-element',
          description: 'Defines the element',
          required: true,
          multiplesInInstance: false,
          requiresInstance: true,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
      ],
      settings: [
        {
          key: 'max-setting',
          description: 'Defines the maximum value of the range.',
          appliedTo: {
            elements: ['my-required-element'],
          },
          conditions: [],
          value: {
            type: 'int',
            default: '0',
          },
        },
        {
          key: 'min-setting',
          description: 'Defines the maximum value of the range.',
          appliedTo: {
            elements: ['my-required-element'],
          },
          conditions: [],
          value: {
            type: 'int',
            default: '0',
          },
        },
      ],
      fields: [],
    };
    const uiConfig = uiService('CMS Load', schema);

    expect(uiConfig?.requiredElements.length).toEqual(1);

    const myRequiredElement = uiConfig?.requiredElements[0];

    expect(myRequiredElement?.settings.length).toEqual(2);
  });

  test('Test non required element without setting', () => {
    const schema: AttributeSchema = {
      elements: [
        {
          key: 'my-required-element',
          description: 'Defines the element',
          required: true,
          multiplesInInstance: false,
          requiresInstance: true,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
        {
          key: 'not-required-element',
          description: 'Defines the element',
          multiplesInInstance: false,
          required: false,
          requiresInstance: true,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
      ],
      settings: [],
      fields: [],
    };
    const uiConfig = uiService('CMS Load', schema);

    expect(uiConfig?.notRequiredElements.length).toEqual(1);

    expect(uiConfig?.notRequiredElements[0].key).toEqual('not-required-element');
  });

  test('Test setting in non required element', () => {
    const schema: AttributeSchema = {
      elements: [
        {
          key: 'not-required-element',
          description: 'Defines the element',
          required: false,
          requiresInstance: true,
          multiplesInInstance: false,
          conditions: [],
          appliedTo: [{ label: 'Input', selectors: ['input', 'select', 'textarea'] }],
        },
      ],
      settings: [
        {
          key: 'text-setting',
          description: 'Defines the maximum value of the range.',
          appliedTo: {
            elements: ['not-required-element'],
          },
          conditions: [],
          value: {
            type: 'string',
            default: 'my-string',
          },
        },
        {
          key: 'option-setting',
          description: 'Defines the maximum value of the range.',
          appliedTo: {
            elements: ['not-required-element'],
          },
          conditions: [],
          value: {
            type: 'options',
            default: '0',
            options: [
              {
                value: 'my-key-1',
                description: 'My Value 1',
              },
              {
                value: 'my-key-2',
                description: 'My Value 2',
              },
            ],
          },
        },
      ],
      fields: [],
    };
    const uiConfig = uiService('CMS Load', schema);

    expect(uiConfig?.notRequiredElements.length).toEqual(1);

    expect(uiConfig?.notRequiredElements[0].key).toEqual('not-required-element');

    const notRequiredElement = uiConfig?.notRequiredElements[0];

    expect(notRequiredElement?.settings.length).toEqual(2);
  });

  test('Test field', () => {
    const schema: AttributeSchema = {
      elements: [],
      settings: [],
      fields: [
        {
          key: 'fs-cms-field',
          description: 'Defines a field key to group filters.',
          specializations: [
            {
              label: 'Checkbox Label',
              key: 'checkbox',
              appliedTo: [
                {
                  parent: [
                    {
                      type: 'element',
                      element: 'list',
                    },
                  ],
                  selectors: [
                    {
                      label: 'Text Block',
                      selectors: ['div'],
                    },
                    {
                      label: 'Heading',
                      selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                    },
                    {
                      label: 'Paragraph',
                      selectors: ['p'],
                    },
                    {
                      label: 'Text Link',
                      selectors: ['a'],
                    },
                  ],
                  type: 'element',
                },
                {
                  parent: [
                    {
                      type: 'element',
                      element: 'filters',
                    },
                  ],
                  selectors: [
                    {
                      label: 'Checkbox Label',
                      selectors: ['label.w-checkbox span'],
                    },
                  ],
                  type: 'element',
                },
              ],
            },
          ],
        },
      ],
    };
    const uiConfig = uiService('CMS Load', schema);

    expect(uiConfig?.fields.length).toEqual(1);
  });

  test('Test setting in field', () => {
    const schema: AttributeSchema = {
      elements: [],
      settings: [
        {
          key: 'text-setting',
          description: 'Defines the maximum value of the range.',
          appliedTo: {
            elements: ['not-required-element'],
            fields: ['fs-cms-field'],
          },
          conditions: [],
          value: {
            type: 'string',
            default: 'my-string',
          },
        },
      ],
      fields: [
        {
          key: 'fs-cms-field',
          description: 'Defines a field key to group filters.',
          specializations: [
            {
              label: 'Checkbox Label',
              key: 'checkbox',
              appliedTo: [
                {
                  parent: [
                    {
                      type: 'element',
                      element: 'list',
                    },
                  ],
                  selectors: [
                    {
                      label: 'Text Block',
                      selectors: ['div'],
                    },
                    {
                      label: 'Heading',
                      selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                    },
                    {
                      label: 'Paragraph',
                      selectors: ['p'],
                    },
                    {
                      label: 'Text Link',
                      selectors: ['a'],
                    },
                  ],
                  type: 'element',
                },
                {
                  parent: [
                    {
                      type: 'element',
                      element: 'filters',
                    },
                  ],
                  selectors: [
                    {
                      label: 'Checkbox Label',
                      selectors: ['label.w-checkbox span'],
                    },
                  ],
                  type: 'element',
                },
              ],
            },
          ],
        },
      ],
    };
    const uiConfig = uiService('CMS Load', schema);

    expect(uiConfig?.fields.length).toEqual(1);

    expect(uiConfig?.fields[0].settings[0].key).toEqual('text-setting');
  });
});
