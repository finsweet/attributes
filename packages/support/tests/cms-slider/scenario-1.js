import { selectAttribute, selectItem, clickRunCheck } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Slider`.page`http://localhost:3000/packages/support/public/scenarios/cms-slider/scenario-1.html`;

test('CMS Slider - Validate instance 0-1', async (t) => {
  await selectAttribute('CMS Slider');

  await selectItem('element-slider-resetix');
  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
