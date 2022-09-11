import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Custom Favicon`.page`http://localhost:3000/packages/support/public/scenarios/custom-favicon/scenario-1.html`;

test('Custom Favicon - Default', async (t) => {
  await selectAttribute('Custom favicon by page');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
