import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  typeFieldIdentifier,
  selectFieldSpecialization,
  clickToggleSelector,
  typeSettingOption,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from '../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Field Setting - Values`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/field-settings-values-not-match.html`;

test('Field Setting - Value not match', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await selectItem('field-setting-field-field-1-active');
  await clickToggleSelector('field-setting-field-field-1-active');

  await typeSettingOption('field-setting-field-field-1-active', 'my-class');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('field-setting-field-field-1-active', 'setting-value-not-match');
  await assertErrorIsOnAttribute('field-setting-field-field-1-active', 'setting-value-not-match');

  await writeFileValidationMessage(
    'Options in this tool do not match options set on the page - Field Setting',
    'field-setting-field-field-1-active'
  );
});
