import type { AttributeSchema, AttributeSchemaCondition, AttributeSchemaConditions } from '@global/types/schema';
import type { SchemaSelector, SchemaSettings } from '@src/types/Schema.types';

import { exists } from './Exists/ExistsService';
import { isChildOf } from './IsChildOf/IsChildOfService';
import { isParentOf } from './IsParentOf/isParentOfService';
import { isSiblingOf } from './IsSiblingOf/IsSiblingOfService';
import { hasLink } from './Link/LinkService';
import { hasSettings } from './Settings/SettingsService';
import { hasStyle } from './Style/StyleService';

interface AttributeConditionsByType {
  [key: string]: AttributeSchemaConditions;
}

/**
 * Assert all conditions are meet by element.
 *
 * @param conditions
 * @param elementSelector
 * @param schema
 * @param schemaSettings
 * @returns
 */
export default function conditionsService(
  elementSelector: SchemaSelector,
  conditions: AttributeSchemaConditions,
  schema: AttributeSchema,
  schemaSettings: SchemaSettings
) {
  // group conditions by type
  const conditionsByType = conditions.reduce((acc: AttributeConditionsByType, condition: AttributeSchemaCondition) => {
    if (acc[condition.condition]) {
      return {
        ...acc,
        [condition.condition]: [...acc[condition.condition], condition],
      };
    }
    return {
      ...acc,
      [condition.condition]: [condition],
    };
  }, {});

  Object.keys(conditionsByType).forEach((type: string) => {
    switch (type) {
      case 'exists': {
        exists(elementSelector, conditionsByType[type], schema, schemaSettings);
        break;
      }
      case 'isChildOf': {
        isChildOf(elementSelector, conditionsByType[type], schema, schemaSettings);
        break;
      }

      case 'isSiblingOf': {
        isSiblingOf(elementSelector, conditionsByType[type], schema, schemaSettings);
        break;
      }

      case 'isParentOf': {
        isParentOf(elementSelector, conditionsByType[type], schema, schemaSettings);
        break;
      }

      case 'hasLink': {
        hasLink(elementSelector, conditionsByType[type]);
        break;
      }

      case 'hasStyle': {
        hasStyle(elementSelector, conditionsByType[type]);
        break;
      }

      case 'settings': {
        hasSettings(elementSelector, conditionsByType[type], schema, schemaSettings);
        break;
      }

      default: {
        throw new Error(`Unsupported type for multiples ${type} conditions`);
      }
    }
  });

  return true;
}

// export function elementConditions() {

// }
