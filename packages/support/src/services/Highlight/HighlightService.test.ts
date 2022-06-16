import CMS_LOAD from '@src/schemas/cms-load';

import { createHighlight } from './HighlightService';

describe('Highlight elements on page', () => {
  test('Create highlight setup for attribute', () => {
    const schemaSettings = {
      instance: 3,
      key: 'cmsload',
    };

    const response = createHighlight('list', 'element', null, null, CMS_LOAD, schemaSettings);

    expect(response.backupStyles.length).toBe(0);

    expect(response.elements.length).toBe(0);
  });
});
