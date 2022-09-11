import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Mirror Input`.page`http://localhost:3000/packages/support/public/scenarios/mirror-input/scenario-1.html`;

test('Mirror Input - Default', async (t) => {
  await selectAttribute('Mirror input values');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
