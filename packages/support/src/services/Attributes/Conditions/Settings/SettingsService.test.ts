import type { AttributeElementSchema, AttributeSchemaCondition } from '@global/types/schema';
import CMS_LOAD from '@src/schemas/cms-load';
import SchemaSelector from '@src/services/Selector/SchemaSelector';
import type { ItemError } from '@src/types/Error.types';

import SettingNotMatchError from './Errors/SettingNotMatchError';
import { hasSettings } from './SettingsService';

describe('Test if settings match', () => {
  test('Test schema element setting match', () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>
          <div class="d-dyn-items" fs-cmsload-element="list" fs-cmsload-mode="pagination">

          </div>
          <a class="w-button" fs-cmsload-element="page-button"></a>
        </body>
      </html>
    `;

    const element = CMS_LOAD.elements.find((element: AttributeElementSchema) => element.key === 'page-button');
    if (!element) {
      throw new Error('Missing conditions for page-button');
    }

    const conditions = element.conditions.filter(
      (condition: AttributeSchemaCondition) => condition.condition === 'settings'
    );

    const schemaSelector = new SchemaSelector('fs-cmsload-element', 'page-button', true);

    schemaSelector.setElements(Array.from(document.querySelectorAll('[fs-cmsload-element="page-button]')));

    const schemaSettings = {
      key: 'cmsload',
      instance: 1,
    };

    const result = hasSettings(schemaSelector, conditions, CMS_LOAD, schemaSettings);
    expect(result).toBe(true);
  });

  test('Test schema element not match setting', () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>
          <div class="d-dyn-items" fs-cmsload-element="list" fs-cmsload-mode="pagination">

          </div>
          <a class="w-button" fs-cmsload-element="page-button"></a>
        </body>
      </html>
    `;

    const element = CMS_LOAD.elements.find((element: AttributeElementSchema) => element.key === 'page-button');
    if (!element) {
      throw new Error('Missing conditions for page-button');
    }

    const conditions = element.conditions.filter(
      (condition: AttributeSchemaCondition) => condition.condition === 'settings'
    );

    const schemaSelector = new SchemaSelector('fs-cmsload-element', 'page-button', true);

    schemaSelector.setElements(Array.from(document.querySelectorAll('[fs-cmsload-element="page-button"]')));

    const schemaSettings = {
      key: 'cmsload',
      instance: 1,
    };

    try {
      hasSettings(schemaSelector, conditions, CMS_LOAD, schemaSettings);
    } catch (e) {
      expect(e).toBeInstanceOf(SettingNotMatchError);
      expect((e as ItemError).type).toEqual('conditions-hasSettings');
    }
  });
});
