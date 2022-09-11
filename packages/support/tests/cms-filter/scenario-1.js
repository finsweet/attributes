import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  typeFieldIdentifier,
  clickToggleSelector,
  selectSettingOption,
  typeSettingOption,
  selectFieldSpecialization,
  addField,
} from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`CMS Filter`.page`http://localhost:3000/packages/support/public/scenarios/cms-filter/scenario-1.html`;

test('CMS Filter - Validate instance 0-1', async (t) => {
  await selectAttribute('CMS Filter');

  // settings for list
  await selectItem('element-list-active');
  await clickToggleSelector('element-list-active');
  await typeSettingOption('element-list-active', 'active-class');

  await selectItem('element-list-showquery');
  await clickToggleSelector('element-list-showquery');

  await selectItem('element-list-tagformat');
  //await clickToggleSelector('element-list-tagformat');
  //await typeSettingOption('element-list-active', 'active-class');

  await selectItem('element-list-debounce');
  await clickToggleSelector('element-list-debounce');
  await typeSettingOption('element-list-debounce', '250');
  // await typeFieldIdentifier('element-list-active', 'active-class');

  await selectItem('element-list-highlightclass');
  await clickToggleSelector('element-list-highlightclass');
  await typeSettingOption('element-list-highlightclass', 'highlight-class');

  await selectItem('element-list-easing');
  await clickToggleSelector('element-list-easing');
  await selectSettingOption('element-list-easing', 'ease-out');

  await selectItem('element-list-duration');
  await clickToggleSelector('element-list-duration');
  await typeSettingOption('element-list-duration', '500');

  // add checkbox
  await typeFieldIdentifier('field-field-field-1', 'element-checkbox');
  await clickToggleSelector('element-list-active');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  // add radio

  await addField();
  await typeFieldIdentifier('field-field-field-2', 'element-radio');
  await selectFieldSpecialization('field-field-field-2', 'radio');

  // add toggle

  await addField();
  await typeFieldIdentifier('field-field-field-3', 'element-toggle');
  await selectFieldSpecialization('field-field-field-3', 'toggle-button');

  // add search field

  await addField();
  await typeFieldIdentifier('field-field-field-4', 'element-select, element-checkbox, element-radio');
  await selectFieldSpecialization('field-field-field-4', 'search-field');

  // add select

  await addField();
  await typeFieldIdentifier('field-field-field-5', 'element-select');
  await selectFieldSpecialization('field-field-field-5', 'select');

  // select all elements
  await selectItem('element-results-count');
  await selectItem('element-items-count');
  await selectItem('element-empty');
  await selectItem('element-initial');
  await selectItem('element-tag-template');
  await selectItem('element-tag-text');
  await selectItem('element-tag-remove');
  await selectItem('element-scroll-anchor');

  await selectItem('element-reset');

  await selectItem('element-reset-reset');
  await clickToggleSelector('element-reset-reset');
  await typeSettingOption('element-reset-reset', 'element-radio, element-checkbox');

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);

  // await assertSuccess('element-list');
  // await assertSuccess('element-items-count');
});
