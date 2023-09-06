import type { AttributeElements, AttributeSettings } from './base';

export type SchemaGroups = {
  [key: string]: {
    key: string;
    name: string;
  };
};

export type SchemaSettings<Settings extends AttributeSettings> = {
  [Key in keyof Settings]?: Settings[Key] & {
    name: string;
    description?: string;
    group?: string;
  } & (
      | {
          type: 'select' | 'boolean' | 'text' | 'int' | 'float';
        }
      | {
          type: 'tuple';
          values: Array<{
            name: string;
            type: 'select' | 'boolean' | 'text' | 'int' | 'float';
          }>;
        }
    );
};

export type Schema<Elements extends AttributeElements, Settings extends AttributeSettings> = {
  groups: SchemaGroups[string][];
  elements: Array<{
    key: Elements[number];
    name: string;
    description?: string;
    // TODO: Fix this allowedTypes cannot find name `AnyElement` type error, seems @webflow/designer-extension-typings is not being loaded well
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    allowedTypes?: AnyElement['type'][];
    required?: boolean;
    settings?: SchemaSettings<Settings>[keyof SchemaSettings<Settings>][];
    group?: string;
    conditions?: Array<{
      condition: 'is-child-of';
      element: Elements[number];
    }>;
  }>;
};
