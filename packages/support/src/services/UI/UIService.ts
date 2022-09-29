import type {
  AttributeSchema,
  AttributeElementSchema,
  AttributeFieldSchema,
  AttributeSettingSchema,
  AttributeValue,
  AttributeSchemaCondition,
  AttributeSettingCondition,
  AttributeSettingConditionSetting,
} from '$global/types/schema';
import type { SchemaUI } from '@src/types/Schema.types';

function isSettingAppliedTo(setting: AttributeSettingSchema, key: string) {
  return (
    (setting.appliedTo && setting.appliedTo.elements && setting.appliedTo.elements.includes(key)) ||
    (setting.appliedTo && setting.appliedTo.fields && setting.appliedTo.fields.includes(key))
  );
}

function isElementAppliedTo(elementKey: string, field: AttributeFieldSchema) {
  const { specializations } = field;

  return specializations.some((specialization) =>
    specialization.appliedTo.some((appliedTo) => appliedTo.element === elementKey)
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

function getOptions(values: AttributeValue | AttributeValue[]) {
  if (Array.isArray(values)) {
    const valueOptions = values.find((value) => value.type === 'options');
    return (valueOptions && valueOptions.type === 'options' && valueOptions.options) || [];
  }

  return (values.type == 'options' && values.options) || [];
}

function getElements(
  elements: AttributeElementSchema[],
  fields: AttributeFieldSchema[] | undefined,
  settings: AttributeSettingSchema[],
  required: boolean
) {
  return elements
    .filter((item: AttributeElementSchema) => {
      return item.required === required;
    })
    .filter((item) => {
      if (fields === undefined) {
        return true;
      }

      return !fields.some((field) =>
        field.specializations.some((specialization) =>
          specialization.appliedTo.some((appliedTo) => appliedTo.element === item.key)
        )
      );
    })
    .map((item: AttributeElementSchema) => {
      const elementSettings = settings
        .filter((setting: AttributeSettingSchema) => {
          return isSettingAppliedTo(setting, item.key);
          //&& setting.conditions.filter((settingCondition: AttributeConditions) => settingCondition.type === 'settings').length <= 0;
        })
        .map((setting: AttributeSettingSchema) => {
          const { value } = setting;

          const options = getOptions(value);

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

function getFields(
  fields: AttributeFieldSchema[],
  elements: AttributeElementSchema[],
  settings: AttributeSettingSchema[]
) {
  const fieldsList = fields.map((field: AttributeFieldSchema) => {
    const fieldSettings = settings.filter((setting: AttributeSettingSchema) => {
      return isSettingAppliedTo(setting, field.key);
    });

    const fieldElements = elements.filter((element: AttributeElementSchema) => {
      return isElementAppliedTo(element.key, field);
    });

    return {
      ...field,
      settings: fieldSettings || [],
      elements: fieldElements || [],
    };
  });

  return fieldsList;
}

function getRequiredInstance(elements: AttributeElementSchema[]) {
  return elements.filter((element: AttributeElementSchema) => element.requiresInstance).length > 0;
}

function getSettings(settings: AttributeSettingSchema[]) {
  return settings.filter((setting) => !setting.appliedTo.elements && !setting.appliedTo.fields);
}

export default function uiService(title: string, schema: AttributeSchema): SchemaUI | null {
  if (title === 'Auto Video' && schema.elements.length === 0 && schema.settings.length === 0) {
    return null;
  }

  const ui: SchemaUI = {
    requiredElements: getElements(schema.elements, schema.fields, schema.settings, true),
    fields: (schema.fields && getFields(schema.fields, schema.elements, schema.settings)) || [],
    notRequiredElements: getElements(schema.elements, schema.fields, schema.settings, false),
    settings: getSettings(schema.settings),
    requiredInstance: getRequiredInstance(schema.elements),
  };

  return ui;
}
