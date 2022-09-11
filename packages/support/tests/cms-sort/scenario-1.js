import {
  selectAttribute,
  clickRunCheck,
  typeFieldIdentifier,
  selectItemAndInputSetting,
  selectMultipleInstances,
  selectFieldSpecialization,
  selectInstance,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Sort`.page`http://localhost:3000/packages/support/public/scenarios/cms-sort/scenario-1.html`;

test('CMS Sort - Validate select trigger - Instance 1', async (t) => {
  await selectAttribute('CMS Sort');

  await selectMultipleInstances(5);
  await selectInstance(1);

  await selectItemAndInputSetting('element-list-duration', '200');

  await typeFieldIdentifier('field-field-field-1', 'sort-select');
  await selectFieldSpecialization('field-field-field-1', 'select-trigger');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Sort - Validate button trigger - Instance 2', async (t) => {
  await selectAttribute('CMS Sort');

  await selectMultipleInstances(5);
  await selectInstance(2);

  await selectItemAndInputSetting('element-list-duration', '300');

  await typeFieldIdentifier('field-field-field-1', 'sort-button');
  await selectFieldSpecialization('field-field-field-1', 'button-trigger');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Sort - Validate dropdown trigger - Instance 3', async (t) => {
  await selectAttribute('CMS Sort');

  await selectMultipleInstances(5);
  await selectInstance(3);

  await typeFieldIdentifier('field-field-field-1', 'sort-dropdown');
  await selectFieldSpecialization('field-field-field-1', 'dropdown-trigger');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
