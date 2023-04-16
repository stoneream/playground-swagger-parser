import { OpenAPIV3 } from 'openapi-types';

class Utils {
  static kebabToCamel(s: string): string {
    return s.replace(/-./g, (ss) => ss.charAt(1).toUpperCase());
  }

  static snakeToCamel(s: string): string {
    return s.replace(/_./g, (ss) => ss.charAt(1).toUpperCase());
  }

  static isReferenceObject = (
    property: unknown,
  ): property is OpenAPIV3.ReferenceObject => {
    return (
      typeof property === 'object' && property !== null && '$ref' in property
    );
  };

  static isOperationObject = (
    any: unknown,
  ): any is OpenAPIV3.OperationObject => {
    return typeof any === 'object' && any !== null && 'responses' in any;
  };

  static isArraySchemaObject = (
    any: unknown,
  ): any is OpenAPIV3.ArraySchemaObject => {
    return typeof any === 'object' && any !== null && 'items' in any;
  };
}

export default Utils;
