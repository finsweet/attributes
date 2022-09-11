import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  typeFieldIdentifier,
  selectFieldSpecialization,
  selectMultipleInstances,
  selectItemAndInputSetting,
  selectInstance,
} from './../helpers/actions';
import {
  assertErrorsCountOnReport,
  assertErrorIsOnReport,
  assertErrorIsOnAttribute,
  assertSuccessReport,
} from './../helpers/assertions';

fixture`CMS Filter - Default values for fields settings`
  .page`http://localhost:3000/packages/support/public/scenarios/cms-filter/scenario-3.html`;

test('CMS Filter - Validate default - without attribute - ok', async (t) => {
  await selectAttribute('CMS Filter');

  await selectMultipleInstances(3);
  await selectInstance(1);

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await selectItem('field-setting-field-field-1-active');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Filter - Validate default - with other attribute set - notOk', async (t) => {
  await selectAttribute('CMS Filter');

  await selectMultipleInstances(3);
  await selectInstance(2);

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await selectItem('field-setting-field-field-1-active');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('field-setting-field-field-1-active', 'setting-value-not-match');
  await assertErrorIsOnAttribute('field-setting-field-field-1-active', 'setting-value-not-match');
});

test('CMS Filter - Validate default - Not default value - ok', async (t) => {
  await selectAttribute('CMS Filter');

  await selectMultipleInstances(3);
  await selectInstance(3);

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await selectItemAndInputSetting('field-setting-field-field-1-active', 'custom-class');

  await clickRunCheck();
  await assertSuccessReport();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Filter - Validate default - with attribute - ok', async (t) => {
  await selectAttribute('CMS Filter');

  await selectMultipleInstances(4);
  await selectInstance(4);

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await selectItem('field-setting-field-field-1-active');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
