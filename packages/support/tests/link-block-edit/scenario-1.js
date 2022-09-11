import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Link Block Edit`.page`http://localhost:3000/packages/support/public/scenarios/link-block-edit/scenario-1.html`;

test('Link Block Edit - Default', async (t) => {
  await selectAttribute('Link blocks in editor');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
