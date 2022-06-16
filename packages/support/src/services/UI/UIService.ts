import type {
  AttributeSchema,
  AttributeElementSchema,
  AttributeFieldSchema,
  AttributeSettingSchema,
  AttributeSchemaCondition,
  AttributeSettingCondition,
  AttributeSettingConditionSetting,
} from '@global/types/schema';
import type { SchemaUI } from '@src/types/Schema.types';

function isAppliedTo(setting: AttributeSettingSchema, key: string) {
  return (
    (setting.appliedTo && setting.appliedTo.elements && setting.appliedTo.elements.includes(key)) ||
    (setting.appliedTo && setting.appliedTo.fields && setting.appliedTo.fields.includes(key))
  );
}

function getElementsThatDependsOnSetting(elements: AttributeElementSchema[], settingKey: string) {
  return elements.filter((element: AttributeElementSchema) => {
    const elementWithCondition = (
      element.conditions.filter(
        (condition: AttributeSchemaCondition) => condition.condition === 'settings'
      ) as AttributeSettingCondition[]
    ).filter((condition: AttributeSettingCondition) =>
      condition.settings
        .map((conditionSetting: { key: string; value: string }) => {
          return conditionSetting.key;
        })
        .includes(settingKey)
    );

    return elementWithCondition.length > 0;
  });
}

function getSettingsThatDependOnSetting(settings: AttributeSettingSchema[], settingKey: string) {
  return settings.filter((setting: AttributeSettingSchema) => {
    const elementWithCondition = (
      setting.conditions.filter(
        (condition: AttributeSchemaCondition) => condition.condition === 'settings'
      ) as AttributeSettingCondition[]
    ).filter((condition: AttributeSettingCondition) =>
      condition.settings
        .map((conditionSetting: AttributeSettingConditionSetting) => {
          return conditionSetting.key;
        })
        .includes(settingKey)
    );

    return elementWithCondition.length > 0;
  });
}

function getElements(elements: AttributeElementSchema[], settings: AttributeSettingSchema[], required: boolean) {
  return elements
    .filter((item: AttributeElementSchema) => {
      return item.required === required;
    })
    .map((item: AttributeElementSchema) => {
      const elementSettings = settings
        .filter((setting: AttributeSettingSchema) => {
          return isAppliedTo(setting, item.key);
          //&& setting.conditions.filter((settingCondition: AttributeConditions) => settingCondition.type === 'settings').length <= 0;
        })
        .map((setting: AttributeSettingSchema) => {
          const options = (setting.value.type == 'options' && setting.value.options) || [];

          const elementsDependedOnSetting = getElementsThatDependsOnSetting(elements, setting.key);

          const settingsDependedOnSetting = getSettingsThatDependOnSetting(settings, setting.key);

          const hasElementDependendOnSetting =
            elementsDependedOnSetting.length > 0 || settingsDependedOnSetting.length > 0;

          return {
            ...setting,
            options: (hasElementDependendOnSetting && options) || [],
          };
        });

      return {
        ...item,
        settings: elementSettings,
      };
    });
}

function getFields(fields: AttributeFieldSchema[], settings: AttributeSettingSchema[]) {
  const fieldsList = fields.map((field: AttributeFieldSchema) => {
    const fieldSettings = settings.filter((setting: AttributeSettingSchema) => {
      return isAppliedTo(setting, field.key);
    });

    return {
      ...field,
      settings: fieldSettings || [],
    };
  });

  return fieldsList;
}

function getRequiredInstance(elements: AttributeElementSchema[]) {
  return elements.filter((element: AttributeElementSchema) => element.requiresInstance).length > 0;
}

export default function uiService(title: string, schema: AttributeSchema): SchemaUI | null {
  if (title === 'Auto Video' && schema.elements.length === 0 && schema.settings.length === 0) {
    return null;
  }

  const ui: SchemaUI = {
    requiredElements: getElements(schema.elements, schema.settings, true),
    fields: (schema.fields && getFields(schema.fields, schema.settings)) || [],
    notRequiredElements: getElements(schema.elements, schema.settings, false),
    requiredInstance: getRequiredInstance(schema.elements),
  };

  return ui;
}
