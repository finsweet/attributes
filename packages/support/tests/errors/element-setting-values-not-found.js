import {
  selectAttribute,
  selectItem,
  clickRunCheck,
  selectMultipleInstances,
  selectInstance,
} from './../helpers/actions';
import {
  assertErrorsCountOnReport,
  assertErrorIsOnReport,
  assertErrorIsOnAttribute,
} from './../helpers/assertions';
import {
  writeFileValidationMessage
} from './../helpers/logs';

fixture`Element setting value not found`
    .page`http://localhost:9000/scenarios/errors/element-setting-value-not-found.html`;


test('Setting is found in duplicated element but not directly in exact being tested', async t => {
  await selectAttribute('Copy to clipboard');

  await selectMultipleInstances(1);
  await selectInstance(1);

  await selectItem('element-setting-text');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('element-setting-text', 'attribute-value-not-found');
  await assertErrorIsOnAttribute('element-setting-text', 'attribute-value-not-found');

  await writeFileValidationMessage('Option attribute found in duplicate element but missing in expected one', 'element-setting-text');
})
