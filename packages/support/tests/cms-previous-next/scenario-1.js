import { selectAttribute, selectItem, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Previous Next`
  .page`http://localhost:3000/packages/support/public/scenarios/cms-previous-next/scenario-1.html`;

test('CMS Previous Next - Validate instance 0-1', async (t) => {
  await selectAttribute('CMS PrevNext');

  await selectItem('element-previous-empty');
  await selectItem('element-next-empty');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
