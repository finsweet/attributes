import { selectAttribute, selectItem, clickRunCheck, typeFieldIdentifier, addField } from './../helpers/actions';
import { assertErrorsCountOnReport, assertSuccessReport } from './../helpers/assertions';

fixture`Rich Text`.page`http://localhost:3000/packages/support/public/scenarios/rich-text/scenario-1.html`;

test('Rich Text - Default', async (t) => {
  await selectAttribute('Powerful Rich Text');

  await selectItem('element-rich-text-sanitize');
  await selectItem('element-rich-text-resetix');

  await typeFieldIdentifier('field-component-field-1', 'page-component');

  await addField();
  await typeFieldIdentifier(
    'field-component-field-2',
    'external-component=/packages/support/public/scenarios/rich-text/component.html'
  );

  await clickRunCheck();
  await assertSuccessReport();
  await assertErrorsCountOnReport(0);
});
