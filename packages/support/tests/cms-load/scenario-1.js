import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  selectItemAndSelectSetting,
  selectItemAndInputSetting,
  selectInstance,
  selectMultipleInstances,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Load`.page`http://localhost:3000/packages/support/public/scenarios/cms-load/scenario-1.html`;

test('CMS Load - Validate instance 0/1 - Load under', async (t) => {
  await selectAttribute('CMS Load');

  await selectItemAndSelectSetting('element-list-mode', 'load-under');

  await selectItemAndSelectSetting('element-list-animation', 'slide-up');
  await selectItemAndSelectSetting('element-list-easing', 'ease-out');
  await selectItemAndInputSetting('element-list-duration', '2000');
  await selectItemAndInputSetting('element-list-stagger', '100');
  await selectItem('element-list-resetix');

  await selectItem('element-loader');
  await selectItem('element-items-count');
  await selectItem('element-visible-count');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Load - Validate instance 2 - Pagination', async (t) => {
  await selectAttribute('CMS Load');

  await selectMultipleInstances(3);
  await selectInstance(2);

  await selectItemAndSelectSetting('element-list-mode', 'pagination');

  await selectItemAndInputSetting('element-list-pagesiblings', '1,2,3,4');
  await selectItemAndInputSetting('element-list-pageboundary', '5,6,7,8');
  await selectItemAndInputSetting('element-list-duration', '600');

  await selectItemAndSelectSetting('element-list-animation', 'slide-down');
  await selectItemAndSelectSetting('element-list-easing', 'ease-in');
  await selectItemAndInputSetting('element-list-stagger', '300');
  await selectItem('element-list-showquery');
  await selectItem('element-list-resetix');

  await selectItem('element-loader');
  await selectItem('element-items-count');
  await selectItem('element-visible-count');
  await selectItem('element-scroll-anchor');
  await selectItem('element-page-button');
  await selectItem('element-page-dots');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Load - Validate instance 3 - Render all', async (t) => {
  await selectAttribute('CMS Load');

  await selectMultipleInstances(3);
  await selectInstance(3);

  await selectItemAndSelectSetting('element-list-mode', 'render-all');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('CMS Load - Validate instance 4 - Infinite', async (t) => {
  await selectAttribute('CMS Load');

  await selectMultipleInstances(4);
  await selectInstance(4);

  await selectItemAndSelectSetting('element-list-mode', 'infinite');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
