import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Select`.page`http://localhost:3000/packages/support/public/scenarios/cms-select/scenario-1.html`;

test('CMS Select - Validate instance 0-1', async (t) => {
  await selectAttribute('CMS Select');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
