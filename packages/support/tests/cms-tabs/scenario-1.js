import { selectAttribute, selectItem, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Tabs`.page`http://localhost:3000/packages/support/public/scenarios/cms-tabs/scenario-1.html`;

test('CMS Tabs - Validate Instance 1', async (t) => {
  await selectAttribute('CMS Tabs');

  await selectItem('element-tabs-resetix');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
