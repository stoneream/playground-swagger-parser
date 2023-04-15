import { OpenAPIV3 } from 'openapi-types';
import Utils from './utils.js';

const ResolveType = (schema: OpenAPIV3.SchemaObject): string => {
  console.log('schema: ', schema);
  const baseType = ((): string => {
    if (schema.type) {
      switch (schema.type) {
        case 'string':
          return 'String';
        case 'integer':
          return 'Int';
        case 'boolean':
          return 'Boolean';
        case 'array':
          return `List[${ResolveType(schema.items as OpenAPIV3.SchemaObject)}]`;
        case 'object':
          if (schema['x-spotify-docs-type']) {
            return Utils.removeWord(schema['x-spotify-docs-type'], 'Object');
          } else {
            return '???';
          }
        default:
          return '???';
      }
    }

    if (schema.allOf) {
      if (schema.allOf.length > 1) {
        throw new Error('allOf.length > 1');
      }

      if (schema.allOf.at(0)['x-spotify-docs-type']) {
        return Utils.removeWord(
          schema.allOf.at(0)['x-spotify-docs-type'],
          'Object',
        );
      } else {
        return '???';
      }
    }

    return '???';
  })();

  if (schema.nullable) {
    return `Option[${baseType}]`;
  } else {
    return `${baseType}`;
  }
};

export default ResolveType;
