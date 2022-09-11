import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  selectItemAndInputSetting,
  selectMultipleInstances,
  selectInstance,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Social share`.page`http://localhost:3000/packages/support/public/scenarios/social-share/scenario-1.html`;

test('Social share - Default', async (t) => {
  await selectAttribute('Social Share');

  await selectMultipleInstances(4);
  await selectInstance(1);

  await selectItem('element-facebook');

  await selectItemAndInputSetting('element-facebook-width', 200);
  await selectItemAndInputSetting('element-facebook-height', 300);

  await selectItem('element-twitter');
  await selectItem('element-reddit');
  await selectItem('element-linkedin');

  await selectItemAndInputSetting('element-linkedin-width', 300);
  await selectItemAndInputSetting('element-linkedin-height', 400);

  await selectItem('element-telegram');
  await selectItem('element-pinterest');

  await selectItem('element-content');
  await selectItem('element-url');
  await selectItem('element-facebook-hashtags');
  await selectItem('element-twitter-hashtags');
  await selectItem('element-twitter-username');
  await selectItem('element-pinterest-description');
  await selectItem('element-pinterest-image');

  await clickRunCheck();

  await assertSuccessReport();

  await assertErrorsCountOnReport(0);
});

test('Social share - Instances', async (t) => {
  await selectAttribute('Social Share');

  await selectMultipleInstances(4);
  await selectInstance(2);

  await selectItem('element-facebook');

  await selectItem('element-twitter');
  await selectItem('element-reddit');
  await selectItem('element-linkedin');

  await selectItem('element-telegram');
  await selectItem('element-pinterest');

  await selectItem('element-content');
  await selectItem('element-url');
  await selectItem('element-facebook-hashtags');
  await selectItem('element-twitter-hashtags');
  await selectItem('element-twitter-username');
  await selectItem('element-pinterest-description');
  await selectItem('element-pinterest-image');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('Social share - CMS List Scope', async (t) => {
  await selectAttribute('Social Share');

  await selectMultipleInstances(4);
  await selectInstance(3);

  await selectItem('element-facebook');

  await selectItem('element-twitter');
  await selectItem('element-reddit');
  await selectItem('element-linkedin');

  await selectItem('element-telegram');
  await selectItem('element-pinterest');
  await selectItem('element-content');
  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});

test('Social share - Case insensitive', async (t) => {
  await selectAttribute('Social Share');

  await selectMultipleInstances(4);
  await selectInstance(4);

  await selectItem('element-facebook');

  await selectItemAndInputSetting('element-facebook-width', 1200);
  await selectItemAndInputSetting('element-facebook-height', 1300);

  await selectItem('element-twitter');
  await selectItem('element-reddit');
  await selectItem('element-linkedin');

  await selectItemAndInputSetting('element-linkedin-width', 1300);
  await selectItemAndInputSetting('element-linkedin-height', 1400);

  await selectItem('element-telegram');
  await selectItem('element-pinterest');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
