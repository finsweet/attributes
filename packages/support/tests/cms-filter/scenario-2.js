import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  typeFieldIdentifier,
  selectFieldSpecialization,
  selectItemAndInputSetting,
  selectItemAndSelectSetting,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Filter`.page`http://localhost:3000/packages/support/public/scenarios/cms-filter/scenario-2.html`;

test('CMS Filter - Validate field settings for checkbox', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'element-checkbox');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await selectItemAndInputSetting('field-setting-field-field-1-active', 'element-checkbox-active');

  await selectItemAndSelectSetting('field-setting-field-field-1-match', 'any');

  await selectItemAndInputSetting('field-setting-field-field-1-tagformat', 'category');
  await selectItemAndInputSetting('field-setting-field-field-1-tagcategory', 'Search for:');
  await selectItemAndInputSetting('field-setting-field-field-1-debounce', '1000');
  await selectItem('field-setting-field-field-1-highlight');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Filter - Validate field settings for input date', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'element-date');
  await selectFieldSpecialization('field-field-field-1', 'input');

  await selectItemAndInputSetting('field-setting-field-field-1-active', 'element-date-active');

  await selectItemAndSelectSetting('field-setting-field-field-1-match', 'all');

  await selectItem('field-setting-field-field-1-type');
  await selectItem('field-setting-field-field-1-range');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
