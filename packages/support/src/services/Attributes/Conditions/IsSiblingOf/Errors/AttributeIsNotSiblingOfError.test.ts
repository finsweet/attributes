import type { AttributeElementSchema, DOMSelector } from '@global/types/schema';
import COPY_CLIP from '@src/schemas/copy-clip';
import SchemaSelector from '@src/services/Selector/SchemaSelector';
import type { ElementItemSelector } from '@src/types/Schema.types';

import AttributeIsNotSiblingOfError from './AttributeIsNotSiblingOfError';

describe('Test Error - Attribute not found', () => {
  test('Attribute type element not sibling of required element', () => {
    const attributeSelector = new SchemaSelector('fs-copyclip-element', 'copy-sibling', true);

    const attributeList = COPY_CLIP.elements.find((value: AttributeElementSchema) => value.key === 'click');
    if (!attributeList) {
      throw new Error('Unexpected error: Missing clip on copy-clip schema');
    }

    const conditionalSelector = new SchemaSelector('fs-copyclip-element', 'click', true);

    const isSiblingOfConditions: ElementItemSelector[] = [
      {
        elementAttribute: attributeList,
        elementSelector: conditionalSelector,
      },
    ];

    const error = new AttributeIsNotSiblingOfError(attributeSelector, isSiblingOfConditions);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-copyclip-element="copy-sibling" is found, but not in the correct location. Move fs-copyclip-element="copy-sibling" to be a sibling of a Button, Link Block, Text Link or Div Block with the attribute fs-copyclip-element="click".'
    );
  });

  test('Attribute type element not sibling of required applied to', () => {
    const attributeSelector = new SchemaSelector('fs-copyclip-element', 'copy-sibling', true);

    const attributeList = COPY_CLIP.elements.find((value: AttributeElementSchema) => value.key === 'click');
    if (!attributeList) {
      throw new Error('Unexpected error: Missing clip on copy-clip schema');
    }

    const isSiblingOfConditions: DOMSelector[] = attributeList.appliedTo;

    const error = new AttributeIsNotSiblingOfError(attributeSelector, [isSiblingOfConditions]);
    expect(error.stripHTML()).toEqual(
      'The attribute fs-copyclip-element="copy-sibling" is found, but not in the correct location. Move fs-copyclip-element="copy-sibling" to be a sibling of a Button, Link Block, Text Link or Div Block.'
    );
  });
});
