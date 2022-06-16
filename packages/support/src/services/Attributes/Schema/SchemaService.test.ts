import type { AttributeElementSchema, AttributeSchema, AttributeSettingSchema } from '@global/types/schema';
import CMS_LOAD from '@src/schemas/cms-load';
import type { SchemaInput } from '@src/types/Input.types';
import type { SchemaSelector } from '@src/types/Schema.types';

import {
  createElementSelector,
  createSettingSelector,
  getSchemaItem,
  checkSettingCondition,
  createSchemaSelectorFromSchema,
} from './SchemaService';

describe('Schema Service', () => {
  test('Create standalone element selector', async () => {
    const selector: SchemaSelector = createElementSelector(
      'list',
      {
        key: 'cmsload',
        instance: 1,
      },
      true
    );

    expect(selector.attribute).toBe('fs-cmsload-element');
    expect(selector.value).toBe('list');
    expect(selector.getElementSelector()).toEqual('[fs-cmsload-element="list"],[fs-cmsload-element="list-1"]');
  });

  test('Create instance element selector', async () => {
    const selector = createElementSelector(
      'list',
      {
        key: 'cmsload',
        instance: 1,
      },
      true
    );

    expect(selector.attribute).toBe('fs-cmsload-element');
    expect(selector.value).toBe('list');
    expect(selector.getElementSelector()).toEqual('[fs-cmsload-element="list"],[fs-cmsload-element="list-1"]');
  });

  test('Create setting selector with value', async () => {
    const selector = createSettingSelector('mode', 'load-under', 'cmsload');

    expect(selector.attribute).toBe('fs-cmsload-mode');
    expect(selector.value).toBe('load-under');
    expect(selector.getElementSelector()).toEqual('[fs-cmsload-mode="load-under"]');
  });

  test('Create setting selector with empty value', async () => {
    const selector = createSettingSelector('mode', '', 'cmsload');

    expect(selector.attribute).toBe('fs-cmsload-mode');
    expect(selector.value).toBe('');
    expect(selector.getElementSelector()).toEqual('[fs-cmsload-mode]');
  });

  test('Find schema correctly', () => {
    const cmsload: AttributeElementSchema = {
      description: '',
      key: 'cmsload',
      required: true,
      appliedTo: [],
      requiresInstance: true,
      multiplesInInstance: false,
      conditions: [],
    };

    const schema: AttributeSchema = {
      elements: [cmsload],
      settings: [],
    };

    const element = getSchemaItem(schema, 'elements', 'cmsload');

    expect(element).toEqual(cmsload);
  });

  test('Find schema item fail because not found', () => {
    const cmsload = {
      title: 'CMS Load',
      key: 'load',
      description: '',
      required: true,
      appliedTo: [],
      requiresInstance: true,
      multiplesInInstance: true,
      conditions: [],
    };

    const schema = {
      elements: [cmsload],
      settings: [],
    };

    try {
      getSchemaItem(schema, 'elements', 'cmsloads');
      expect(true).toBe(false);
    } catch (e) {
      const error = e as Error;
      expect(error.message).toBe(`Missing elements with key cmsloads in schema`);
    }
  });
});

describe('Create Schema Selector', () => {
  test('It can create an selector from existing schema element', () => {
    const schemaSelector = createSchemaSelectorFromSchema(CMS_LOAD, 'elements', 'list', {
      instance: 1,
      key: 'cmsload',
    });

    expect(schemaSelector.attribute).toBe('fs-cmsload-element');
    expect(schemaSelector.value).toBe('list');
    expect(schemaSelector.getElementSelector()).toEqual('[fs-cmsload-element="list"],[fs-cmsload-element="list-1"]');
  });

  test('It can create an selector from existing schema element with multiples instances', () => {
    const schemaSelector = createSchemaSelectorFromSchema(CMS_LOAD, 'elements', 'list', {
      instance: 3,
      key: 'cmsload',
    });

    expect(schemaSelector.attribute).toBe('fs-cmsload-element');
    expect(schemaSelector.value).toBe('list-3');
    expect(schemaSelector.getElementSelector()).toEqual('[fs-cmsload-element="list-3"]');
  });

  test('When it try to create an selector from inexisting schema element, throw error', () => {
    try {
      createSchemaSelectorFromSchema(CMS_LOAD, 'elements', 'page', {
        instance: 1,
        key: 'cmsload',
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  test('It can create an selector from existing schema setting', () => {
    const schemaSelector = createSchemaSelectorFromSchema(
      CMS_LOAD,
      'settings',
      'threshold',
      {
        instance: 1,
        key: 'cmsload',
      },
      '-20'
    );

    expect(schemaSelector.attribute).toBe('fs-cmsload-threshold');
    expect(schemaSelector.value).toBe('-20');
    expect(schemaSelector.getElementSelector()).toEqual('[fs-cmsload-threshold="-20"]');
  });

  test('It can create an selector from existing schema setting with multiples instances', () => {
    const schemaSelector = createSchemaSelectorFromSchema(
      CMS_LOAD,
      'settings',
      'threshold',
      {
        instance: 3,
        key: 'cmsload',
      },
      '-20'
    );

    expect(schemaSelector.attribute).toBe('fs-cmsload-threshold');
    expect(schemaSelector.value).toBe('-20');
    expect(schemaSelector.getElementSelector()).toEqual('[fs-cmsload-threshold="-20"]');
  });

  test('When it try to create an selector from inexisting schema setting, throw error', () => {
    try {
      createSchemaSelectorFromSchema(
        CMS_LOAD,
        'settings',
        'distance',
        {
          instance: 1,
          key: 'cmsload',
        },
        '-20'
      );
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});

describe('Check if settings/element is enable for setting condition', () => {
  const setting: AttributeSettingSchema = {
    key: 'showquery',
    description: 'Defines if the pagination query params should be displayed on the URL.',
    appliedTo: {
      elements: ['list'],
    },
    value: {
      type: 'boolean',
    },
    conditions: [
      {
        condition: 'settings',
        type: 'element',
        element: 'list',
        settings: [
          {
            key: 'mode',
            value: 'pagination',
          },
        ],
      },
    ],
  };

  test('Return true when you can show setting because condition are meet', () => {
    const form: SchemaInput[] = [
      {
        type: 'elementSetting',
        setting: 'mode',
        element: 'list',
        option: 'pagination',
        enable: true,
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];

    const response = checkSettingCondition(setting, form, { instance: 1, key: 'cmsload' });

    expect(response).toBe(true);
  });

  test('Return false when you show hide settings because condition are not meet', () => {
    const form: SchemaInput[] = [
      {
        type: 'elementSetting',
        setting: 'mode',
        option: 'load-under',
        enable: true,
        element: 'list',
        validation: null,
        instance: 1,
        key: 'cmsload',
      },
    ];

    const response = checkSettingCondition(setting, form, { instance: 1, key: 'cmsload' });

    expect(response).toBe(false);
  });

  test('Return true in case there is not conditions in item', () => {
    const form: SchemaInput[] = [];

    const response = checkSettingCondition({ ...setting, conditions: [] }, form, { instance: 1, key: 'cmsload' });

    expect(response).toBe(true);
  });

  test('Return true if there is not conditions type settings in item', () => {
    const form: SchemaInput[] = [];

    const response = checkSettingCondition(
      { ...setting, conditions: [{ condition: 'isChildOf', element: 'list', type: 'element' }] },
      form,
      { instance: 1, key: 'cmsload' }
    );

    expect(response).toBe(true);
  });
});
