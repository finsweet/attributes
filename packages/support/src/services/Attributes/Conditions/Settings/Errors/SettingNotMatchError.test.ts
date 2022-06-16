import SchemaSelector from '@src/services/Selector/SchemaSelector';

import SettingNotMatchError from './SettingNotMatchError';

describe('Test Error - Attribute condition setting not match', () => {
  test('Attribute type element not match required setting', () => {
    const attributeSelector = new SchemaSelector('fs-cmsload-element', 'page-button', true);
    // const conditionSelector = new SchemaSelector('fs-cmsload-element', 'list');
    const currentSelector = new SchemaSelector('fs-cmsload-mode', 'load-under');
    const settingSelector = new SchemaSelector('fs-cmsload-mode', 'pagination');

    const error = new SettingNotMatchError(
      attributeSelector,
      //conditionSelector,
      currentSelector,
      settingSelector
    );

    expect(error.stripHTML()).toEqual(
      'The attribute fs-cmsload-element="page-button" is used, but missing a required option attribute that supports it. Change fs-cmsload-mode="load-under" to fs-cmsload-mode="pagination".'
    );
  });
});
