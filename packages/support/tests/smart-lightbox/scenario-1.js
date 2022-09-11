import { selectAttribute, clickRunCheck, selectItemAndInputSetting } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Smart Lightbox`.page`http://localhost:3000/packages/support/public/scenarios/smart-lightbox/scenario-1.html`;

test('Smart Lightbox - Default', async (t) => {
  await selectAttribute('Smart Lightbox');

  await selectItemAndInputSetting('element-lightbox-wait', '200');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
