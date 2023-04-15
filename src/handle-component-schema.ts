import { OpenAPIV3 } from 'openapi-types';
import Utils from './utils.js';
import ResolveType from './resolve-type.js';

const HandleComponentSchemas = (
  schemaName: string,
  schemaObject: OpenAPIV3.SchemaObject,
): void => {
  console.debug('=== schemaName: ', schemaName);

  if (schemaObject.type === 'object') {
    if (schemaObject.properties) {
      const results: Array<string> = [];
      for (const [propertyName, property] of Object.entries(
        schemaObject.properties,
      )) {
        if (!Utils.isReferenceObject(property)) {
          results.push(
            `${Utils.snakeToCamel(propertyName)}: ${ResolveType(property)}`,
          );
        } else {
          // todo handle reference object
        }
      }

      const caseClass = `
case class ${Utils.removeWord(schemaName, 'Object')} {
${results.join(',\n')}
}`;

      console.log('caseClass: ', caseClass);
    } else {
      // todo handle allOf
    }
  } else {
    console.warn('unsupported schemaObject type: ', schemaObject.type);
  }
};

export default HandleComponentSchemas;
