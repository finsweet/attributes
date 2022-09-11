import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Mirror Click`.page`http://localhost:3000/packages/support/public/scenarios/mirror-click/scenario-1.html`;

test('Mirror Click - Default', async (t) => {
  await selectAttribute('Mirror click');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
