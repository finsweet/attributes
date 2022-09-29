import type {
  AttributeSchema,
  AttributeSchemaCondition,
  AttributeSchemaConditions,
  AttributeSettingCondition,
  AttributeSettingConditionSetting,
} from '$global/types/schema';
import SettingNotMatchError from '@src/services/Attributes/Conditions/Settings/Errors/SettingNotMatchError';
import { createSchemaSelectorFromSchema } from '@src/services/Attributes/Schema/SchemaService';
import { queryAttributeValue } from '@src/services/DOM/Queries/QueriesService';
import SchemaSelectorCreator from '@src/services/Selector/SchemaSelector';
import type { SchemaSettings, SchemaSelector } from '@src/types/Schema.types';

export function hasSettings(
  elementSelector: SchemaSelector,
  conditions: AttributeSchemaConditions,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
) {
  conditions.forEach((condition: AttributeSchemaCondition) => {
    const conditionType = condition as AttributeSettingCondition;

    const { element, settings } = conditionType;
    const conditionSelector = createSchemaSelectorFromSchema(schema, 'elements', element, schemaSettings);

    settings.forEach((setting: AttributeSettingConditionSetting) => {
      const settingSelector = createSchemaSelectorFromSchema(
        schema,
        'settings',
        setting.key,
        schemaSettings,
        setting.value
      );
      isSettingMatch(elementSelector, conditionSelector, settingSelector);
    });
  });

  return true;
}

/**
 * Assert condition settings is meet by other element in page.
 *
 * @param elementSelector
 * @param conditionSelector
 * @param settingSelector
 * @returns
 */
export default function isSettingMatch(
  elementSelector: SchemaSelector,
  conditionSelector: SchemaSelector,
  settingSelector: SchemaSelector
) {
  const conditionalSelector = conditionSelector.getElementSelector();

  let attributeDOM = '';
  try {
    attributeDOM = queryAttributeValue(conditionalSelector, settingSelector.attribute);
    if (attributeDOM !== settingSelector.getValue()) {
      throw new Error('Values not match');
    }

    return true;
  } catch (e) {
    const currentSelector = new SchemaSelectorCreator(
      settingSelector.getAttribute(),
      attributeDOM,
      settingSelector.getInitial()
    );

    throw new SettingNotMatchError(elementSelector, currentSelector, settingSelector);
  }
}
