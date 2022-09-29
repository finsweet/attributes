import type { AttributeElementSchema, AttributeSchemaCondition } from '$global/types/schema';
import COPY_CLIP from '@src/schemas/copy-clip';
import { isSiblingOf } from '@src/services/Attributes/Conditions/IsSiblingOf/IsSiblingOfService';
import SchemaSelector from '@src/services/Selector/SchemaSelector';
import type { ItemError } from '@src/types/Error.types';

import AttributeIsNotSiblingOfError from './Errors/AttributeIsNotSiblingOfError';

describe('Test if sibling of', () => {
  test('Test schema element is sibling of selector successful', () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>
          <div>
            <div class="w-dropdown" fs-copyclip-element="click">
            </div>
            <div class="w-dropdown" fs-copyclip-element="copy-sibling">
            </div>
          </div>
        </body>
      </html>
    `;

    const element = COPY_CLIP.elements.find((element: AttributeElementSchema) => element.key === 'copy-sibling');
    if (!element) {
      throw new Error('Missing conditions for dropdown');
    }

    const conditions = element.conditions.filter(
      (condition: AttributeSchemaCondition) => condition.condition === 'isSiblingOf'
    );

    const schemaSelector = new SchemaSelector('fs-copyclip-element', 'copy-sibling', true);

    schemaSelector.setElements(Array.from(document.querySelectorAll('[fs-copyclip-element="copy-sibling"]')));

    const schemaSettings = {
      key: 'copyclip',
      instance: 1,
    };

    const result = isSiblingOf(schemaSelector, conditions, COPY_CLIP, schemaSettings);
    expect(result).toBe(true);
  });

  test('Test schema element is not sibling of selector throw error', () => {
    global.document.documentElement.innerHTML = `
      <html>
      <body>
        <div>
          <div class="w-dropdown" fs-copyclip-element="click">
          </div>
        </div>
        <div>
          <div class="w-dropdown" fs-copyclip-element="copy-sibling">
          </div>
        </div>
      </body>
    </html>
    `;

    const element = COPY_CLIP.elements.find((element: AttributeElementSchema) => element.key === 'copy-sibling');
    if (!element) {
      throw new Error('Missing conditions for copy-sibling');
    }

    const conditions = element.conditions.filter(
      (condition: AttributeSchemaCondition) => condition.condition === 'isSiblingOf'
    );

    const schemaSelector = new SchemaSelector('fs-copyclip-element', 'copy-sibling', true);

    schemaSelector.setElements(Array.from(document.querySelectorAll('[fs-copyclip-element="copy-sibling"]')));

    const schemaSettings = {
      key: 'copyclip',
      instance: 1,
    };

    try {
      isSiblingOf(schemaSelector, conditions, COPY_CLIP, schemaSettings);
    } catch (e) {
      expect(e).toBeInstanceOf(AttributeIsNotSiblingOfError);
      expect((e as ItemError).type).toEqual('conditions-isSiblingOf');
    }
  });
});
