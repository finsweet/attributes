import SchemaSelector from '@src/services/Selector/SchemaSelector';

import AttributeNotHasStyleError from './AttributeNotHasStyleError';

describe('Test Error - Attribute condition setting not match', () => {
  test('Attribute type element not match required setting', () => {
    const attribute = new SchemaSelector('fs-customselect-element', 'fill', true);
    const style = {
      property: 'position',
      value: 'absolute',
    };

    const error = new AttributeNotHasStyleError(attribute, style);

    expect(error.stripHTML()).toEqual(
      'The attribute fs-customselect-element="fill" is found, but does not match the required style. Set the css property of this element to "position: absolute".'
    );
  });
});
