import type { AttributeElementSchema, AttributeSettingSchema } from '@global/types/schema';
import CMS_LOAD from '@src/schemas/cms-load';
import SchemaSelector from '@src/services/Selector/SchemaSelector';

import AttributeNotFoundError from './AttributeNotFoundError';

describe('Test Error - Attribute not found', () => {
  test('Attribute type element not found', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-element', 'list', true);

    const attributeSchema = CMS_LOAD.elements.find((value: AttributeElementSchema) => value.key === 'list');
    if (!attributeSchema) {
      throw new Error('Unexpected error: Missing list on cms-load schema');
    }

    const appliedTo = attributeSchema.appliedTo;

    const error = new AttributeNotFoundError(attributeSelector, appliedTo, false);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsload-element="list" is not found. Add fs-cmsload-element="list" to the Collection List.'
    );
  });

  test('Attribute type setting not found', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-animation', 'fade', true);

    const elementListSchema = CMS_LOAD.elements.find((value: AttributeElementSchema) => value.key === 'list');
    if (!elementListSchema) {
      throw new Error('Unexpected error: Missing list on cms-load schema');
    }

    const settingModeSchema = CMS_LOAD.settings.find((value: AttributeSettingSchema) => value.key === 'animation');
    if (!settingModeSchema) {
      throw new Error('Unexpected error: Missing list on cms-load schema');
    }

    const appliedTo = elementListSchema.appliedTo;

    const error = new AttributeNotFoundError(attributeSelector, appliedTo, true);
    expect(error.stripHTML()).toEqual(
      'The attribute option fs-cmsload-animation="fade" is not found. Add fs-cmsload-animation="fade" to the Collection List.'
    );
  });
});
