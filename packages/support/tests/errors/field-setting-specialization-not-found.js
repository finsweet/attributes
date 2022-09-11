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

fixture`Field Setting - Specialization`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/field-settings-specialization-range.html`;

test('Field Setting - Specialization Range', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'input');

  await selectItem('field-setting-field-field-1-range');

  await clickRunCheck();

  await assertErrorsCountOnReport(2);

  await assertErrorIsOnReport('field-setting-field-field-1-range', 'field-setting-not-found', 1);
  await assertErrorIsOnAttribute('field-setting-field-field-1-range', 'field-setting-not-found', 1);

  await assertErrorIsOnReport('field-setting-field-field-1-range', 'field-setting-not-found', 2);
  await assertErrorIsOnAttribute('field-setting-field-field-1-range', 'field-setting-not-found', 2);

  await writeFileValidationMessage('Special field type not found', 'field-setting-field-field-1-range');
});
