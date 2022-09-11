import { selectAttribute, selectItem, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Custom Select`.page`http://localhost:3000/packages/support/public/scenarios/custom-select/scenario-1.html`;

test('Custom Select - Default', async (t) => {
  await selectAttribute('Custom Form Select');

  await selectItem('element-label');
  await selectItem('element-dropdown-hideinitial');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
