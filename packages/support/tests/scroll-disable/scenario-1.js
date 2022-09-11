import { selectAttribute, selectItem, clickRunCheck, selectItemAndInputSetting } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Scroll Disable`.page`http://localhost:3000/packages/support/public/scenarios/scroll-disable/scenario-1.html`;

test('Scroll Disable - Default', async (t) => {
  await selectAttribute('Disable scrolling');

  await selectItem('element-when-visible');
  await selectItem('element-smart-nav');
  await selectItem('element-preserve');

  await selectItem('element-disable-gap');
  await selectItemAndInputSetting('element-disable-media', '(max-width: 478px)');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
