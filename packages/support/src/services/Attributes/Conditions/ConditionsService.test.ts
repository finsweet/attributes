import type { AttributeElementSchema, AttributeSettingSchema } from '$global/types/schema';
import CMS_LOAD from '@src/schemas/cms-load';
import SchemaSelector from '@src/services/Selector/SchemaSelector';

import conditionsService from './ConditionsService';
import { exists } from './Exists/ExistsService';
//mocks
import { isChildOf } from './IsChildOf/IsChildOfService';
import { hasSettings } from './Settings/SettingsService';

jest.mock('./Exists/ExistsService', () => ({
  exists: jest.fn(),
}));

jest.mock('./Settings/SettingsService', () => ({
  hasSettings: jest.fn(),
}));

jest.mock('./IsChildOf/IsChildOfService', () => {
  return {
    isChildOf: jest.fn(),
  };
});

const mockIsChildOf = isChildOf as jest.Mock;
const mockExists = exists as jest.Mock;
const mockhasSettings = hasSettings as jest.Mock;

describe('Test exists conditions', () => {
  const key = 'cmsload';

  beforeEach(() => {
    mockIsChildOf.mockClear();
    mockExists.mockClear();
  });

  test('Check condition that specificy standalone element must exist on page successful', () => {
    const elementSelector: SchemaSelector = new SchemaSelector('fs-cmsload-element', 'items-count');

    const elementSchema = CMS_LOAD.elements.find((element: AttributeElementSchema) => element.key === 'items-count');

    if (!elementSchema) {
      throw new Error('cms load - items count not found in schema');
    }

    const conditions = elementSchema.conditions;

    const instance = 1;

    mockExists.mockReturnValue(true);

    const response = conditionsService(elementSelector, conditions, CMS_LOAD, {
      instance,
      key,
    });

    expect(response).toBe(true);

    expect(mockExists).toHaveBeenCalledTimes(1);
    expect(mockIsChildOf).toHaveBeenCalledTimes(0);
  });
});

describe('Test isChildOf conditions', () => {
  const key = 'cmsload';

  beforeEach(() => {
    mockIsChildOf.mockClear();
  });

  test('Check element is child of css selector successful', () => {
    const elementSelector: SchemaSelector = new SchemaSelector('fs-cmsload-element', 'page-button');

    const elementSchema = CMS_LOAD.elements.find((element: AttributeElementSchema) => element.key === 'page-button');

    if (!elementSchema) {
      throw new Error('cms load - items count not found in schema');
    }

    const conditions = elementSchema.conditions;

    const instance = 1;

    mockIsChildOf.mockReturnValue(true);

    const response = conditionsService(elementSelector, conditions, CMS_LOAD, {
      instance,
      key,
    });

    expect(response).toBe(true);
    expect(mockIsChildOf).toHaveBeenCalledTimes(1);
  });
});

describe('Test settings conditions', () => {
  const key = 'cmsload';

  beforeEach(() => {
    mockhasSettings.mockClear();
  });

  test('Check condition that specificy element has correlation with another settings successfull', () => {
    const elementSelector: SchemaSelector = new SchemaSelector('fs-cmsload-threshold', '-20');

    const elementSchema = CMS_LOAD.settings.find((element: AttributeSettingSchema) => element.key === 'threshold');

    if (!elementSchema) {
      throw new Error('cms load - threshold not found in schema');
    }

    const conditions = elementSchema.conditions;

    const instance = 1;

    mockhasSettings.mockReturnValue(true);

    const response = conditionsService(elementSelector, conditions, CMS_LOAD, {
      instance,
      key,
    });

    expect(response).toBe(true);
    expect(mockhasSettings).toHaveBeenCalledTimes(1);
  });
});
