import {
  selectAttribute,
  clickToggleSelector,
  selectItem,
  clickRunCheck,
  typeFieldIdentifier,
  selectItemAndInputSetting,
  selectMultipleInstances,
  selectFieldSpecialization,
  selectInstance,
  selectItemAndSelectSetting,
  toggleMultipleInstances,
} from './../helpers/actions';
import {
  assertSelectorName,
  assertSelectorValue,
  assertSelectorInputValue,
  assertSelectorSelectValue,
  assertErrorsCountOnReport,
  assertStatusEmpty,
  assertStatusSuccess,
  assertStatusError,
} from './../helpers/assertions';

fixture`UI - Instances`.page`http://localhost:3000/packages/support/public/scenarios/ui/instances.html`;

test('Input states are isolated by instances', async (t) => {
  await selectAttribute('CMS Load');

  await assertStatusEmpty('element-list');

  await clickRunCheck();
  await assertErrorsCountOnReport(0);

  await assertStatusSuccess('element-list');

  await selectMultipleInstances(2);
  await selectInstance(2);

  await assertStatusEmpty('element-list');

  // assert no status

  await clickRunCheck();
  await assertErrorsCountOnReport(0);

  await toggleMultipleInstances();
  await selectMultipleInstances(3);
  await selectInstance(3);

  await clickRunCheck();
  await assertErrorsCountOnReport(0);
});

// test('States/Messages are reseted when change instance', async t => {

// });
