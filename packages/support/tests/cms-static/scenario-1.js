import { selectAttribute, selectItem, clickRunCheck, selectItemAndInputSetting } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Static`.page`http://localhost:3000/packages/support/public/scenarios/cms-static/scenario-1.html`;

test('CMS Static - Default - First static item', async (t) => {
  await selectAttribute('CMS Static');

  await selectItemAndInputSetting('element-static-item-order', '5');
  await selectItem('element-static-item-interactive');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Static - Default - Second static item', async (t) => {
  await selectAttribute('CMS Static');

  // await selectItemAndInputSetting('element-static-item-order', '3');
  // await selectItem('element-static-item-interactive');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
