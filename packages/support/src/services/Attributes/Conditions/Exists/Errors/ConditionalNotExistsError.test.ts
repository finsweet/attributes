import type { AttributeElementSchema } from '@global/types/schema';
import CMS_LOAD from '@src/schemas/cms-load';
import MIRROR_CLICK from '@src/schemas/mirror-click';
import SchemaSelector from '@src/services/Selector/SchemaSelector';

import ConditionalNotExistsError from './ConditionalNotExistsError';

describe('Test Conditional Exists Error', () => {
  test('Test Element Schema Conditional element not found', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-element', 'loader', true);

    const conditionalSelector = new SchemaSelector('fs-cmsload-element', 'list', true);

    const attributeSchema = CMS_LOAD.elements.find((value: AttributeElementSchema) => value.key === 'list');
    if (!attributeSchema) {
      throw new Error('Unexpected error: Missing loader on cms-load schema');
    }

    const appliedTo = attributeSchema.appliedTo;

    const error = new ConditionalNotExistsError(attributeSelector, conditionalSelector, appliedTo);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsload-element="loader" is found, but is missing a required attribute in the setup. Add fs-cmsload-element="list" to a Collection List.'
    );
  });

  /** @TODO create testcafe */
  test('Test Element Schema Conditional selector not found', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-element', 'loader', true);

    const attributeSchema = CMS_LOAD.elements.find((value: AttributeElementSchema) => value.key === 'list');
    if (!attributeSchema) {
      throw new Error('Unexpected error: Missing loader on cms-load schema');
    }

    const appliedTo = attributeSchema.appliedTo;

    const error = new ConditionalNotExistsError(attributeSelector, null, appliedTo);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsload-element="loader" is found, but is missing a required component in the setup. Add Collection List.'
    );
  });

  test('Test Setting Schema Conditional element not found', () => {
    const attributeSelector = new SchemaSelector('fs-mirrorclick-delay', '0', true);

    const conditionalSelector = new SchemaSelector('fs-mirrorclick-element', 'target', true);

    const attributeSchema = MIRROR_CLICK.elements.find((value: AttributeElementSchema) => value.key === 'target');
    if (!attributeSchema) {
      throw new Error('Unexpected error: Missing target on mirrorclick schema');
    }

    const appliedTo = attributeSchema.appliedTo;

    const error = new ConditionalNotExistsError(attributeSelector, conditionalSelector, appliedTo);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-mirrorclick-delay="0" is found, but is missing a required attribute in the setup. Add fs-mirrorclick-element="target" to a Div Block or any element on the page.'
    );
  });
});
