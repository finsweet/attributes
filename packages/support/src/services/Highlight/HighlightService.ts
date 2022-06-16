import type {
  AttributeElementSchema,
  AttributeSettingSchema,
  AttributeFieldSchema,
  AttributeSchema,
  FieldSpecialization,
  InstanceFieldSpecializationAppliedTo,
  DOMSelector,
} from '@global/types/schema';
import { getParentElement } from '@src/services/Attributes/Fields/FieldsService';
import {
  getSchemaItem,
  createSchemaSelectorFromSchema,
  createSchemaSelectorFromItem,
} from '@src/services/Attributes/Schema/SchemaService';
import { queryChildrenOfElements } from '@src/services/DOM/Queries/QueriesService';
import type { HighlightBackupStyle, Highlight } from '@src/types/Highlight.types';
import type { SchemaInputType } from '@src/types/Input.types';
import type { SchemaSettings } from '@src/types/Schema.types';

const highlightStyle: HighlightBackupStyle = {
  ['backgroundColor']: {
    keyHyphenCase: 'background-color',
    value: 'rgba(0, 138, 0, 0.5)',
  },
  ['box-shadow']: {
    keyHyphenCase: 'box-shadow',
    value: '2px 1px 1px black',
  },
  ['opacity']: {
    keyHyphenCase: 'opacity',
    value: '0.5',
  },
};

function createElementHighlight(key: string, schema: AttributeSchema): Highlight {
  const schemaItem = getSchemaItem(schema, 'elements', key) as AttributeElementSchema;

  const { appliedTo } = schemaItem;

  const htmlElements: HTMLElement[] = appliedTo
    .map((domSelector: DOMSelector): HTMLElement[] => {
      return domSelector.selectors
        .map((selector: string) => {
          const selectorElements = document.querySelectorAll<HTMLElement>(selector);
          return Array.from(selectorElements);
        })
        .flat();
    })
    .flat();

  return {
    elements: htmlElements,
    backupStyles: [],
  };
}

function createElementSettingHighlight(
  key: string,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): Highlight {
  const schemaItem = getSchemaItem(schema, 'settings', key) as AttributeSettingSchema;

  const { appliedTo } = schemaItem;

  const htmlElements: HTMLElement[] =
    (appliedTo.elements &&
      appliedTo.elements
        .map((element: string) => {
          const elementSelector = createSchemaSelectorFromSchema(schema, 'elements', element, schemaSettings);

          const elements = document.querySelectorAll<HTMLElement>(elementSelector.getElementSelector());

          return Array.from(elements);
        })
        .flat()) ||
    [];

  return {
    elements: htmlElements,
    backupStyles: [],
  };
}

function createFieldHighlight(
  key: string,
  specializationKey: string | null,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): Highlight {
  if (!specializationKey) {
    return {
      elements: [],
      backupStyles: [],
    };
  }

  const schemaItem = getSchemaItem(schema, 'fields', key) as AttributeFieldSchema;

  const { specializations } = schemaItem;

  const selectedSpecialization = specializations.find(
    (specializationEntry: FieldSpecialization) => specializationEntry.key === specializationKey
  );

  if (!selectedSpecialization) {
    throw new Error(`Selected specialization not exists: ${specializationKey}`);
  }

  const appliedToFields: InstanceFieldSpecializationAppliedTo[] = selectedSpecialization.appliedTo.filter(
    (appliedToEntry: InstanceFieldSpecializationAppliedTo) => appliedToEntry.type !== 'component'
  );

  const htmlElements: (HTMLElement | null)[] = appliedToFields
    .map((appliedTo: InstanceFieldSpecializationAppliedTo) => {
      const { parent, selectors } = appliedTo;

      const parentElement = getParentElement(parent, schema, schemaSettings);

      if (parent && parentElement === null) {
        return null;
      }

      return selectors
        .map((domSelector: DOMSelector) => {
          const elements: HTMLElement[] = domSelector.selectors
            .map((selector: string) => {
              if (parentElement) {
                return Array.from(parentElement.querySelectorAll<HTMLElement>(selector));
              }
              return Array.from(document.querySelectorAll<HTMLElement>(selector));
            })
            .flat();

          return elements;
        })
        .flat();
    })
    .flat();

  const elements = htmlElements.filter((element: HTMLElement | null) => element !== null) as HTMLElement[];

  return {
    elements: elements,
    backupStyles: [],
  };
}

function createFieldSettingHighlight(
  fieldKey: string,
  identifier: string | null,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): Highlight {
  if (!identifier) {
    return {
      elements: [],
      backupStyles: [],
    };
  }

  const schemaItem = getSchemaItem(schema, 'fields', fieldKey) as AttributeFieldSchema;
  const schemaSelector = createSchemaSelectorFromItem(schemaItem, 'fields', schemaItem.key, schemaSettings, identifier);
  const elements = Array.from(document.querySelectorAll<HTMLElement>(schemaSelector.getElementSelector()));

  return {
    elements: elements,
    backupStyles: [],
  };
}

export function createHighlight(
  key: string,
  type: SchemaInputType,
  identifier: string | null,
  specializationKey: string | null,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
): Highlight {
  switch (type) {
    case 'element':
      return createElementHighlight(key, schema);
    case 'elementSetting':
      return createElementSettingHighlight(key, schema, schemaSettings);
    case 'field':
      return createFieldHighlight(key, specializationKey, schema, schemaSettings);
    case 'fieldSetting':
      return createFieldSettingHighlight(key, identifier, schema, schemaSettings);
  }
}

export function enableHighlight(highlight: Highlight): HighlightBackupStyle[] {
  const { elements, backupStyles } = highlight;

  let styles: HighlightBackupStyle[] = [...backupStyles];

  styles = applyHighlightElements(elements, backupStyles);

  return styles;
}

export function applyHighlightElements(elements: HTMLElement[], styles: HighlightBackupStyle[]) {
  elements.forEach(function (element) {
    styles = applyHighlightElement(element, styles);
  });
  return styles;
}

export function applyHighlightElement(element: HTMLElement, styles: HighlightBackupStyle[]) {
  styles = saveStyle(element, styles);
  highlightElement(element);
  return styles;
}

export function disableHighlight(highlight: Highlight) {
  const { elements, backupStyles } = highlight;

  let styles: HighlightBackupStyle[] = [...backupStyles];

  styles = applyBackupElements(elements, backupStyles);
  return styles;
}

function saveStyle(element: HTMLElement, styles: HighlightBackupStyle[]) {
  const computedStyles = window.getComputedStyle(element);

  const highlightBackup: HighlightBackupStyle = {};

  Object.keys(highlightStyle).forEach((key) => {
    const { keyHyphenCase } = highlightStyle[key];

    const property = computedStyles.getPropertyValue(keyHyphenCase);
    highlightBackup[key] = {
      keyHyphenCase: highlightStyle[key].keyHyphenCase,
      value: property,
    };
  });

  styles.push(highlightBackup);
  return styles;
}

export function rollbackElement(element: HTMLElement, styles: HighlightBackupStyle[]) {
  const backupStyles = styles.shift();
  if (backupStyles === undefined) {
    throw new Error('No backup style found');
  }
  rollbackStyleElement(element, backupStyles);
  return styles;
}

export function applyBackupElements(elements: HTMLElement[], styles: HighlightBackupStyle[]) {
  if (styles.length === 0) {
    return styles;
  }
  elements.forEach(function (element: HTMLElement) {
    styles = rollbackElement(element, styles);
  });

  return styles;
}

export function applyBackupChildrenOfSelectors(
  selectors: string[],
  styles: HighlightBackupStyle[]
): HighlightBackupStyle[] {
  if (selectors && selectors.length > 0) {
    const elements: HTMLElement[] | null = queryChildrenOfElements(selectors);

    if (Array.isArray(elements)) {
      elements.forEach((element) => {
        const backupStyles = styles.shift();
        if (backupStyles === undefined) {
          throw new Error('No backup style found');
        }
        rollbackStyleElement(element, backupStyles);
      });
    }
  }
  return styles;
}

export function highlightElement(element: HTMLElement) {
  Object.keys(highlightStyle).forEach((key) => {
    const { keyHyphenCase, value } = highlightStyle[key];

    element.style.setProperty(keyHyphenCase, value);
  });
}

export function rollbackStyleElement(element: HTMLElement, backupStyles: HighlightBackupStyle) {
  Object.keys(backupStyles).forEach((keyCamelCase: string) => {
    const { keyHyphenCase, value } = backupStyles[keyCamelCase];
    element.style.setProperty(keyHyphenCase, value);
  });
}
