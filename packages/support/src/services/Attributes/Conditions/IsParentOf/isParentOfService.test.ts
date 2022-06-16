import type { AttributeElementSchema, AttributeSchemaCondition } from '@global/types/schema';
import CUSTOM_SELECT from '@src/schemas/custom-select';
import SchemaSelector from '@src/services/Selector/SchemaSelector';
import type { ItemError } from '@src/types/Error.types';

import AttributeIsNotParentOfError from './Errors/AttributeIsNotParentOfError';
import { isParentOf } from './isParentOfService';

describe('Test if parent of', () => {
  test('Test schema element is parent of selector successful', () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>
          <div class="w-dropdown" fs-selectcustom-element="dropdown">
            <select class="w-select"></select>
          </div>
        </body>
      </html>
    `;

    const element = CUSTOM_SELECT.elements.find((element: AttributeElementSchema) => element.key === 'dropdown');
    if (!element) {
      throw new Error('Missing conditions for dropdown');
    }

    const conditions = element.conditions.filter(
      (condition: AttributeSchemaCondition) => condition.condition === 'isParentOf'
    );

    const schemaSelector = new SchemaSelector('fs-selectcustom-element', 'dropdown', true);

    schemaSelector.setElements(Array.from(document.querySelectorAll('[fs-selectcustom-element="dropdown"]')));

    const schemaSettings = {
      key: 'selectcustom',
      instance: 1,
    };

    const result = isParentOf(schemaSelector, conditions, CUSTOM_SELECT, schemaSettings);
    expect(result).toBe(true);
  });

  test('Test schema element is not parent of selector throw error', () => {
    global.document.documentElement.innerHTML = `
      <html>
      <body>
        <div class="w-dropdown" fs-selectcustom-element="dropdown">

        </div>
      </body>
    </html>
    `;

    const element = CUSTOM_SELECT.elements.find((element: AttributeElementSchema) => element.key === 'dropdown');
    if (!element) {
      throw new Error('Missing conditions for dropdown');
    }

    const conditions = element.conditions.filter(
      (condition: AttributeSchemaCondition) => condition.condition === 'isParentOf'
    );

    const schemaSelector = new SchemaSelector('fs-selectcustom-element', 'dropdown', true);

    schemaSelector.setElements(Array.from(document.querySelectorAll('[fs-selectcustom-element="dropdown"]')));

    const schemaSettings = {
      key: 'selectcustom',
      instance: 1,
    };

    try {
      isParentOf(schemaSelector, conditions, CUSTOM_SELECT, schemaSettings);
    } catch (e) {
      expect(e).toBeInstanceOf(AttributeIsNotParentOfError);
      expect((e as ItemError).type).toEqual('conditions-isParentOf');
    }
  });
});
