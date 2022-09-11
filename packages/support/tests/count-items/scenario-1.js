import { selectAttribute, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Count Items`.page`http://localhost:3000/packages/support/public/scenarios/count-items/scenario-1.html`;

test('Count Items - Default', async (t) => {
  await selectAttribute('List item counter');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
