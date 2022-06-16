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
  selectItemAndSelectSetting,
} from './../helpers/actions';
import {
  assertSelectorName,
  assertSelectorValue,
  assertSelectorInputValue,
  assertSelectorSelectValue,
} from './../helpers/assertions';


fixture`UI - Selectors`
    .page`http://localhost:9000/scenarios/ui/selectors.html`;

test('Test element selector', async t => {

  await selectAttribute('CMS Filter');

  await clickToggleSelector('element-list');


  await assertSelectorName('element-list', 'fs-cmsfilter-element');
  await assertSelectorValue('element-list', 'list');
});

test('Test element setting selector - boolean', async t => {

  await selectAttribute('CMS Filter');

  await clickToggleSelector('element-setting-showquery');

  await assertSelectorName('element-setting-showquery', 'fs-cmsfilter-showquery');
  await assertSelectorValue('element-setting-showquery', 'true');
});


test('Test element setting selector - input', async t => {

  await selectAttribute('CMS Filter');

  await selectItemAndInputSetting('element-setting-active', 'my-element-active-class');

  await assertSelectorName('element-setting-active', 'fs-cmsfilter-active');
  await assertSelectorInputValue('element-setting-active', 'my-element-active-class');
});

test('Test element setting selector - select', async t => {

  await selectAttribute('CMS Filter');

  await selectItemAndSelectSetting('element-setting-easing', 'ease-out');

  await assertSelectorName('element-setting-easing', 'fs-cmsfilter-easing');
  await assertSelectorSelectValue('element-setting-easing', 'ease-out');
});


test('Test field selector', async t => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'products');
  await selectFieldSpecialization('field-field-field-1', 'radio');

  await clickToggleSelector('field-field-field-1');

  await assertSelectorName('field-field-field-1', 'fs-cmsfilter-field');
  await assertSelectorValue('field-field-field-1', 'products');
});

test('Test field selector - change after being open', async t => {
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

test('Test field setting selector', async t => {
  await selectAttribute('CMS Filter');

  await typeFieldIdentifier('field-field-field-1', 'categories');
  await selectFieldSpecialization('field-field-field-1', 'checkbox');

  await selectItemAndInputSetting('field-setting-field-field-1-active', 'my-field-active-class');
  await assertSelectorName('field-setting-field-field-1-active', 'fs-cmsfilter-active');
  await assertSelectorInputValue('field-setting-field-field-1-active', 'my-field-active-class');
});
