import { selectAttribute, selectItem, clickRunCheck, selectItemAndInputSetting } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Custom slider dots`
  .page`http://localhost:3000/packages/support/public/scenarios/custom-slider-dots/scenario-1.html`;

test('Custom slider dots - Default', async (t) => {
  await selectAttribute('Custom slider dots');

  await selectItem('element-slider-nav');
  await selectItemAndInputSetting('element-content-active', 'slider-active');
  await selectItem('element-slider-remove');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
