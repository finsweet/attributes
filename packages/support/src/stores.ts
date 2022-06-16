import type { SupportedAttributeData } from '@finsweet/attributes-docs/src/utils/types';
import type { AttributeSchema, AttributeElementSchema } from '@global/types/schema';
import {
  // elements
  addElement,
  deleteElement,
  findElement, // elements ettings
  addElementSetting,
  enableElementSetting,
  disableElementSetting,
  disableElementSettings,
  getFieldSettingOption,
  setElementSettingOption,
  getElementSettingOption,
  findElementSetting,
  findElementSettingIndex, // fields
  addField,
  getFields,
  deleteField,
  findField,
  getLastIndexField, // field settings
  setFieldidentifier,
  setFieldSpecialization,
  addFieldSetting,
  enableFieldSetting,
  disableFieldSetting,
  disableFieldSettings,
  setFieldSettingOption,
  findFieldSetting,
  findFieldSettingIndex, // usability
  findInvalidAttributes,
  findValidAttributes,
} from '@src/services/SchemaInput/SchemaInputService';
import { persistStore, loadStore } from '@src/services/Store/Store.service';
import type { AttributeLoaded, SchemaUI } from '@src/types/Schema.types';
import { writable, derived, get } from 'svelte/store';

import type { SchemaInput, SchemaInputConfig } from './types/Input.types';

export const WALKTHROUGH_MODES = {
  INITIALIZING: 'INITIALIZING',
  READY: 'READY',
};

export const SCHEMA_MODES = {
  LOADING: 'LOADING',
  READY: 'READY',
};

export const VALIDATE_MODES = {
  VALIDATING: 'VALIDATING',
  READY: 'READY',
};

const SUPPORT_FORM = 'support-form';
const SUPPORT_INSTANCES = 'support-instances';
const SUPPORT_KEY = 'support-key';
const SUPPORT_SELECT_INSTANCE = 'support-select-instance';

/**
 * Walkthrough - Number of instances in Walkthrough
 */

export const schemaInstances = writable<number>(loadStore<number>(SUPPORT_INSTANCES, 1));

schemaInstances.subscribe((instances: number) => {
  persistStore<number>(SUPPORT_INSTANCES, instances);
});
/**
 * Walkthrough mode
 */
export const walkthroughMode = writable<string>(WALKTHROUGH_MODES.INITIALIZING);

/**
 * Is Loading Walkthrough?
 */
export const isLoadingWalkthrough = derived(walkthroughMode, ($mode) => $mode === WALKTHROUGH_MODES.INITIALIZING);

export const validatingMode = writable<string>(VALIDATE_MODES.READY);

export const isValidating = derived(validatingMode, ($mode) => $mode === VALIDATE_MODES.VALIDATING);

/**
 * Schema mode
 */
export const schemaMode = writable<string>(SCHEMA_MODES.LOADING);

/**
 * Is Loading Schema?
 */
export const isLoadingSchema = derived(schemaMode, ($mode) => $mode === SCHEMA_MODES.LOADING);

/**
 * SchemaSettings - Selected instance in Walkthrough
 */
export const schemaSettingsInstance = writable<number>(loadStore<number>(SUPPORT_SELECT_INSTANCE, 1));

schemaSettingsInstance.subscribe((instance: number) => {
  persistStore<number>(SUPPORT_SELECT_INSTANCE, instance);
});

/**
 * SchemaSettings - Selected Attribute Schema in Attribute
 */
export const schemaSettingsKey = writable<string | null>(null);

schemaSettingsKey.subscribe((key: string | null) => {
  if (key) {
    persistStore<string | null>(SUPPORT_KEY, key);
  }
});

/**
 * Walkthrough - Attribute
 */
export const schemas = writable<AttributeLoaded[]>([]);

schemas.subscribe((schemasAttributes) => {
  if (schemasAttributes.length > 0) {
    schemaSettingsKey.set(loadStore<string | null>(SUPPORT_KEY, null));
  }
});

/**
 * Walkthrough - Attribute Schema
 */
export const schemaData = writable<AttributeSchema | null>(null);

export const schemaUI = writable<SchemaUI | null>(null);

export const toggleAttributeSelector = writable<string | null>(null);

export const appError = writable<boolean>(false);

/**
 * Walkthrough - Attribute - Selected
 *
 * Search in schemas Attributes[] for schemaSettingsKey
 */
export const schemaSelected = derived([schemaSettingsKey, schemas], ([$schemaSettingsKey, $schemas]) => {
  if (!$schemas || $schemas.length <= 1) {
    return null;
  }

  const selectSchema: SupportedAttributeData | undefined = $schemas.find(
    (schema: SupportedAttributeData) => schema.key === $schemaSettingsKey
  );

  if (!selectSchema) {
    return null;
  }
  return selectSchema;
});

/**
 * Schema Input
 */

export const schemaForm = writable<SchemaInput[]>(loadStore<SchemaInput[]>(SUPPORT_FORM, []));

/** Support - Reset button show when dirty */

export const isDirty = derived(
  [schemaSettingsKey, schemaSettingsInstance, schemaData, schemaForm],
  ([$schemaSettingsKey, $schemaSettingsInstance, $schemaData, $schemaForm]) => {
    const nonRequiredItems =
      $schemaData?.elements
        .filter((element: AttributeElementSchema) => element.required === false)
        .map((element: AttributeElementSchema) => element.key) || [];

    const dirtyItems = $schemaForm.find((value: SchemaInput) => {
      return (
        ((value.type === 'elementSetting' && value.enable) ||
          (value.type === 'fieldSetting' && value.enable) ||
          (value.type === 'field' && (value.identifier !== '' || value.specialization !== '')) ||
          (value.type === 'element' &&
            (nonRequiredItems.indexOf(value.element) !== -1 || value.validation !== null))) &&
        value.instance === $schemaSettingsInstance &&
        value.key === $schemaSettingsKey
      );
    });

    return !!dirtyItems;
  }
);

export const isSubmitted = writable<boolean>(false);

function getSchemaInputConfig(): SchemaInputConfig {
  const key = get(schemaSettingsKey);

  if (key === null) {
    throw new Error('Missing selected schema key to handle forms');
  }
  const settings = {
    instance: get(schemaSettingsInstance),
    key,
  };

  return settings;
}

export const schemaFormActions = {
  subscribe: schemaForm.subscribe,
  /**
   * Elements
   */
  addElement: function (value: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(addElement(values, value, getSchemaInputConfig()));
  },
  removeElement: function (value: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(deleteElement(values, value, getSchemaInputConfig()));
  },
  findElement: function (value: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return findElement(values, value, getSchemaInputConfig());
  },
  /**
   * Element Settings
   */
  addElementSetting: function (parent: string, setting: string, value: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(addElementSetting(values, parent, setting, value, getSchemaInputConfig()));
  },
  enableElementSetting: function (parent: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(enableElementSetting(values, parent, setting, getSchemaInputConfig()));
  },
  disableElementSetting: function (parent: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(disableElementSetting(values, parent, setting, getSchemaInputConfig()));
  },
  disableElementSettings: function (parent: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(disableElementSettings(values, parent, getSchemaInputConfig()));
  },
  getElementSettingOption: function (parent: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return getElementSettingOption(values, parent, setting, getSchemaInputConfig());
  },
  setElementSettingOption: function (parent: string, setting: string, option: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(setElementSettingOption(values, parent, setting, option, getSchemaInputConfig()));
  },
  findElementSetting: function (parent: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return findElementSetting(values, parent, setting, getSchemaInputConfig());
  },
  findElementSettingIndex: function (parent: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return findElementSettingIndex(values, parent, setting, getSchemaInputConfig());
  },
  /**
   * Field
   */
  addField: function (fieldKey: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(addField(values, fieldKey, getSchemaInputConfig()));

    return `field-${getLastIndexField(values, fieldKey, getSchemaInputConfig())}`;
  },
  getFields: function () {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return getFields(values, getSchemaInputConfig());
  },
  setFieldValue: function (fieldKey: string, fieldIndex: string, value: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(setFieldidentifier(values, fieldKey, fieldIndex, value, getSchemaInputConfig()));
  },
  setFieldSpecialization: function (fieldKey: string, fieldIndex: string, value: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(setFieldSpecialization(values, fieldKey, fieldIndex, value, getSchemaInputConfig()));
  },
  deleteField: function (fieldKey: string, fieldIndex: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(deleteField(values, fieldKey, fieldIndex, getSchemaInputConfig()));
  },
  findField: function (fieldKey: string, fieldIndex: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return findField(values, fieldKey, fieldIndex, getSchemaInputConfig());
  },
  /**
   * Field Settings
   */
  addFieldSetting: function (fieldKey: string, fieldIndex: string, setting: string, value: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(addFieldSetting(values, fieldKey, fieldIndex, setting, value, getSchemaInputConfig()));
  },
  setFieldSettingOption: function (fieldKey: string, fieldIndex: string, setting: string, option: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(setFieldSettingOption(values, fieldKey, fieldIndex, setting, option, getSchemaInputConfig()));
  },

  enableFieldSetting: function (fieldKey: string, fieldIndex: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(enableFieldSetting(values, fieldKey, fieldIndex, setting, getSchemaInputConfig()));
  },
  disableFieldSetting: function (fieldKey: string, fieldIndex: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(disableFieldSetting(values, fieldKey, fieldIndex, setting, getSchemaInputConfig()));
  },
  disableFieldSettings: function (fieldKey: string, fieldIndex: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    schemaForm.set(disableFieldSettings(values, fieldKey, fieldIndex, getSchemaInputConfig()));
  },
  getFieldSettingOption: function (fieldKey: string, fieldIndex: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return getFieldSettingOption(values, fieldKey, fieldIndex, setting, getSchemaInputConfig());
  },
  findFieldSetting: function (fieldKey: string, fieldIndex: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return findFieldSetting(values, fieldKey, fieldIndex, setting, getSchemaInputConfig());
  },
  findFieldSettingIndex: function (fieldKey: string, fieldIndex: string, setting: string) {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return findFieldSettingIndex(values, fieldKey, fieldIndex, setting, getSchemaInputConfig());
  },
  /**
   * Usability
   */
  findInvalidAttributes: function () {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return findInvalidAttributes(values, getSchemaInputConfig());
  },
  findValidAttributes: function () {
    let values: SchemaInput[] = [];
    schemaForm.subscribe((id) => (values = id));
    return findValidAttributes(values, getSchemaInputConfig());
  },
  set: schemaForm.set,
  update: schemaForm.update,
};

schemaForm.subscribe((form: SchemaInput[]) => {
  const formWithoutValidations = form.map((formItem: SchemaInput) => ({ ...formItem, validation: null }));
  persistStore<SchemaInput[]>(SUPPORT_FORM, formWithoutValidations);
});
