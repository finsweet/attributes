import {
  selectAttribute,
  clickToggleSelector,
  selectItem,
  clickRunCheck,
  typeFieldIdentifier,
  selectItemAndInputSetting,
  selectMultipleInstances,
  selectFieldSpecialization,
  selectInstance,
  clickSettingType,
  selectItemAndSelectSetting,
  typeSettingOption,
} from './../helpers/actions';
import {
  assertSelectorName,
  assertSelectorValue,
  assertSelectorInputValue,
  assertSelectorSelectValue,
} from './../helpers/assertions';

fixture`UI - Selectors`.page`http://localhost:3000/packages/support/public/scenarios/ui/selectors.html`;

test('Test element selector', async (t) => {
  await selectAttribute('CMS Filter');

  await clickToggleSelector('element-list');

  await assertSelectorName('element-list', 'fs-cmsfilter-element');
  await assertSelectorValue('element-list', 'list');
});

test('Test element setting selector - default boolean', async (t) => {
  await selectAttribute('CMS Filter');

  await clickToggleSelector('element-list-showquery');

  await assertSelectorName('element-list-showquery', 'fs-cmsfilter-showquery');
  await assertSelectorValue('element-list-showquery', 'true');
});

test('Test element setting selector - default string', async (t) => {
  await selectAttribute('CMS Filter');

  await clickToggleSelector('element-list-active');

  await assertSelectorName('element-list-active', 'fs-cmsfilter-active');
  await assertSelectorInputValue('element-list-active', 'fs-cmsfilter_active');
});

test('Test element setting selector - custom string input', async (t) => {
  await selectAttribute('CMS Filter');

  await selectItemAndInputSetting('element-list-active', 'my-element-active-class');

  await assertSelectorName('element-list-active', 'fs-cmsfilter-active');
  await assertSelectorInputValue('element-list-active', 'my-element-active-class');
});

test('Test element setting selector - select', async (t) => {
  await selectAttribute('CMS Filter');

  await selectItemAndSelectSetting('element-list-easing', 'ease-out');

  await assertSelectorName('element-list-easing', 'fs-cmsfilter-easing');
  await assertSelectorSelectValue('element-list-easing', 'ease-out');
});

test('Test field selector', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'radio');

  await clickToggleSelector('field-field-field-1');

  await assertSelectorName('field-field-field-1', 'fs-cmsfilter-field');
  await assertSelectorValue('field-field-field-1', 'products');
});

test('Test field selector - change after being open', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'radio');

  await clickToggleSelector('field-field-field-1');

  await assertSelectorName('field-field-field-1', 'fs-cmsfilter-field');
  await assertSelectorValue('field-field-field-1', 'products');

  await typeFieldIdentifier('field-field-field-1', 'categories');
  await assertSelectorValue('field-field-field-1', 'categories');

  await clickToggleSelector('field-field-field-1');
  await clickToggleSelector('field-field-field-1');

  await assertSelectorValue('field-field-field-1', 'categories');
});

test('Test field setting selector', async (t) => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'categories');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await selectItemAndInputSetting('field-setting-field-field-1-active', 'my-field-active-class');
  await assertSelectorName('field-setting-field-field-1-active', 'fs-cmsfilter-active');
  await assertSelectorInputValue('field-setting-field-field-1-active', 'my-field-active-class');
});

test('Test field selector - multiple types - select boolean', async (t) => {
  await selectAttribute('Form Submit Actions');
  await selectItem('element-form-reset');

  await clickToggleSelector('element-form-reset');

  await clickSettingType('element-form-reset', 'boolean');

  await assertSelectorName('element-form-reset', 'fs-formsubmit-reset');
  await assertSelectorValue('element-form-reset', 'true');
});

test('Test field selector - multiple types - select int', async (t) => {
  await selectAttribute('Form Submit Actions');
  await selectItem('element-form-reset');

  await clickToggleSelector('element-form-reset');

  await clickSettingType('element-form-reset', 'int');
  await typeSettingOption('element-form-reset', '2000');

  await assertSelectorName('element-form-reset', 'fs-formsubmit-reset');
  await assertSelectorInputValue('element-form-reset', '2000');
});
