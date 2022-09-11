import { selectAttribute, selectItem, clickRunCheck, selectItemAndInputSetting } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Table of contents`.page`http://localhost:3000/packages/support/public/scenarios/toc/scenario-1.html`;

test('Table of contents - Default', async (t) => {
  await selectAttribute('Table of Contents');

  await selectItemAndInputSetting('element-contents-offsettop', '100');
  await selectItemAndInputSetting('element-contents-offsetbottom', '150');
  await selectItem('element-contents-hideurlhash');
  await selectItem('element-table');
  await selectItem('element-ix-trigger');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
