import { OpenAPIV3 } from 'openapi-types';

class Utils {
  static kebabToCamel(s: string): string {
    return s.replace(/-./g, (ss) => ss.charAt(1).toUpperCase());
  }

  static snakeToCamel(s: string): string {
    return s.replace(/_./g, (ss) => ss.charAt(1).toUpperCase());
  }

  static removeWord(s: string, word: string): string {
    return s.replace(word, '');
  }

  static isReferenceObject = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    property: any,
  ): property is OpenAPIV3.ReferenceObject => property?.$ref !== undefined;
}

export default Utils;
