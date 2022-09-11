import {
  selectAttribute,
  clickRunCheck,
  selectItem,
  typeFieldIdentifier,
  selectFieldSpecialization,
  clickToggleSelector,
  typeSettingOption,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from './../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Setting not found errors`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/field-settings-not-found.html`;

test('Field setting not found in page', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await selectItem('field-setting-field-field-1-active');
  await clickToggleSelector('field-setting-field-field-1-active');

  await typeSettingOption('field-setting-field-field-1-active', 'my-class');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('field-setting-field-field-1-active', 'field-setting-not-found');
  await assertErrorIsOnAttribute('field-setting-field-field-1-active', 'field-setting-not-found');

  await writeFileValidationMessage('Field option not found', 'field-setting-field-field-1-active');
});
