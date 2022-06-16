import CMS_FILTER from '@src/schemas/cms-filter';
import CMS_SORT from '@src/schemas/cms-sort';
import type { SchemaInputField } from '@src/types/Input.types';
import type { SchemaSettings } from '@src/types/Schema.types';

import {
  validateField, // validateSpecializationApplyTo,
} from './FieldsService';

describe('Test field service', () => {
  it('Test specialization with parent and selector', async () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>
          <div class="w-dyn-items" fs-cmsfilter-element="list">
            <div fs-cmsfilter-field="element-checkbox">
          </div>
          <div class="w-form" fs-cmsfilter-element="filters">
          <label class="w-checkbox">
            <input type="checkbox">
            <span fs-cmsfilter-field="element-checkbox"></span>
          </label>
          </div>
        </body>
      </html>
    `;

    const input: SchemaInputField = {
      field: 'field',
      index: 'field-1',
      specialization: 'checkbox',
      identifier: 'element-checkbox',
      type: 'field',
      validation: null,
      instance: 1,
      key: 'cmsfilter',
    };

    const schemaSettings: SchemaSettings = {
      instance: 1,
      key: 'cmsfilter',
    };

    const response = await validateField(input, CMS_FILTER, schemaSettings);

    expect(response.input.validation?.status).toBeTruthy();
  });

  it('Test specialization cms sort case - button trigger', async () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>

        </body>
      </html>
    `;

    const input: SchemaInputField = {
      field: 'field',
      index: 'field-1',
      specialization: 'button-trigger',
      identifier: 'button-trigger',
      type: 'field',
      validation: null,
      instance: 1,
      key: 'cmssort',
    };

    const schemaSettings: SchemaSettings = {
      instance: 1,
      key: 'cmssort',
    };

    const response = await validateField(input, CMS_SORT, schemaSettings);

    expect(response.input.validation?.status).toBeFalsy();
  });

  it('Test specialization cms sort case - select trigger', async () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>

        </body>
      </html>
    `;

    const input: SchemaInputField = {
      field: 'field',
      index: 'field-1',
      specialization: 'select-trigger',
      identifier: 'select-trigger',
      type: 'field',
      validation: null,
      instance: 1,
      key: 'cmssort',
    };

    const schemaSettings: SchemaSettings = {
      instance: 1,
      key: 'cmssort',
    };

    const response = await validateField(input, CMS_SORT, schemaSettings);

    expect(response.input.validation?.status).toBeFalsy();
  });

  it('Test specialization cms sort case - dropdown trigger', async () => {
    global.document.documentElement.innerHTML = `
      <html>
        <body>

        </body>
      </html>
    `;

    const input: SchemaInputField = {
      field: 'field',
      index: 'field-1',
      specialization: 'dropdown-trigger',
      identifier: 'dropdown-trigger',
      type: 'field',
      validation: null,
      instance: 1,
      key: 'cmssort',
    };

    const schemaSettings: SchemaSettings = {
      instance: 1,
      key: 'cmssort',
    };

    const response = await validateField(input, CMS_SORT, schemaSettings);

    expect(response.input.validation?.status).toBeFalsy();
  });
});
