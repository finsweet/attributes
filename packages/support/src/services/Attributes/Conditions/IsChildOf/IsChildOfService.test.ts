import type { AttributeElementSchema, AttributeSchemaCondition } from '@global/types/schema';
import CMS_LOAD from '@src/schemas/cms-load';
import SchemaSelector from '@src/services/Selector/SchemaSelector';
import type { ItemError } from '@src/types/Error.types';

import AttributeIsNotChildrenOfError from './Errors/AttributeIsNotChildrenOfError';
import { isChildOf } from './IsChildOfService';

describe('Test is child of', () => {
  test('Test schema element is child of selector successful', () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>
          <div class="w-dyn-items" fs-cmsload-element="list">
            <div class="w-pagination-wrapper">
              <div fs-cmsload-element="page-button"></div>
            </div>
          </div>
        </body>
      </html>
    `;

    const element = CMS_LOAD.elements.find((element: AttributeElementSchema) => element.key === 'page-button');
    if (!element) {
      throw new Error('Missing conditions for page-button');
    }

    const conditions = element.conditions.filter(
      (condition: AttributeSchemaCondition) => condition.condition === 'isChildOf'
    );

    const schemaSelector = new SchemaSelector('fs-cmsload-element', 'page-button', true);

    schemaSelector.setElements(Array.from(document.querySelectorAll('[fs-cmsload-element="page-button"]')));

    const schemaSettings = {
      key: 'cmsload',
      instance: 1,
    };

    const result = isChildOf(schemaSelector, conditions, CMS_LOAD, schemaSettings);
    expect(result).toBe(true);
  });

  test('Test schema element is not child of selector throw error', () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>
          <div class="w-dyn-items" fs-cmsload-element="list">

            <div fs-cmsload-element="page-button"></div>

          </div>
        </body>
      </html>
    `;

    const element = CMS_LOAD.elements.find((element: AttributeElementSchema) => element.key === 'page-button');
    if (!element) {
      throw new Error('Missing conditions for page-button');
    }

    const conditions = element.conditions.filter(
      (condition: AttributeSchemaCondition) => condition.condition === 'isChildOf'
    );

    const schemaSelector = new SchemaSelector('fs-cmsload-element', 'page-button', true);

    schemaSelector.setElements(Array.from(document.querySelectorAll('[fs-cmsload-element="page-button"]')));

    const schemaSettings = {
      key: 'cmsload',
      instance: 1,
    };

    try {
      isChildOf(schemaSelector, conditions, CMS_LOAD, schemaSettings);
    } catch (e) {
      expect(e).toBeInstanceOf(AttributeIsNotChildrenOfError);
      expect((e as ItemError).type).toEqual('conditions-isChildOf');
    }
  });
});
