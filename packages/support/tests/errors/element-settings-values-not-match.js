import { selectAttribute, clickRunCheck, selectItem, clickToggleSelector, typeSettingOption } from '../helpers/actions';
import { assertErrorsCountOnReport, assertErrorIsOnReport, assertErrorIsOnAttribute } from '../helpers/assertions';
import { writeFileValidationMessage } from './../helpers/logs';

fixture`Element Setting - Values`
  .page`http://localhost:3000/packages/support/public/scenarios/errors/element-setting-values-not-match.html`;

test('Element Setting - Value not match', async (t) => {
  await selectAttribute('CMS Load');

  await selectItem('element-list-duration');
  await clickToggleSelector('element-list-duration');

  await typeSettingOption('element-list-duration', '300');

  await clickRunCheck();

  await assertErrorsCountOnReport(1);

  await assertErrorIsOnReport('element-list-duration', 'setting-value-not-match');
  await assertErrorIsOnAttribute('element-list-duration', 'setting-value-not-match');

  await writeFileValidationMessage(
    'Options in this tool do not match options set on the page - Element Setting',
    'element-list-duration'
  );
});
