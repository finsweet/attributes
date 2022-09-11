import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  selectItemAndInputSetting,
  selectInstance,
  selectMultipleInstances,
} from './../helpers/actions';
import {
  assertErrorsCountOnReport,
  assertErrorIsOnReport,
  assertErrorIsOnAttribute,
  assertSuccessReport,
} from './../helpers/assertions';

fixture`CMS Load - Default Attributes - Float`
  .page`http://localhost:3000/packages/support/public/scenarios/cms-load/scenario-3.html`;

test('CMS Load - Validate default - without attribute - ok', async (t) => {
  await selectAttribute('CMS Load');

  await selectMultipleInstances(3);
  await selectInstance(1);

  await selectItem('element-list-duration');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Load - Validate default - with other attribute set - notOk', async (t) => {
  await selectAttribute('CMS Load');

  await selectMultipleInstances(3);
  await selectInstance(2);

  await selectItem('element-list-duration');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('element-list-duration', 'setting-value-not-match');
  await assertErrorIsOnAttribute('element-list-duration', 'setting-value-not-match');
});

test('CMS Load - Validate default - Not default value - ok', async (t) => {
  await selectAttribute('CMS Load');

  await selectMultipleInstances(3);
  await selectInstance(3);

  await selectItemAndInputSetting('element-list-duration', '2000');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Load - Validate default - with attribute - ok', async (t) => {
  await selectAttribute('CMS Load');

  await selectMultipleInstances(4);
  await selectInstance(4);

  await selectItem('element-list-duration');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
