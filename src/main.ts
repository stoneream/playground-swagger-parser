import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPIV3 } from "openapi-types";
import { OpenAPIV3_1 } from "openapi-types";

const path = './spotify-web-api/fixed-spotify-open-api.yml';

const kebabToCamel = (s: string): string => s.replace(/-./g, (ss) => ss.charAt(1).toUpperCase());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isReferenceObject = (property: any): property is OpenAPIV3_1.ReferenceObject =>
  property.$ref !== undefined;

const resolveType = (schema: OpenAPIV3_1.SchemaObject): string => {
  if (schema.type) {
    switch (schema.type) {
      case 'string':
        return 'String';
      case 'integer':
        return 'Int';
      case 'boolean':
        return 'Boolean';
      case 'array':
        return `List[${resolveType(schema.items as OpenAPIV3_1.SchemaObject)}]`;
      default:
        return 'String';
    }
  } else {
    return 'String';
  }
}

const handleOperation = (
  httpMethod: OpenAPIV3_1.HttpMethods,
  path: string,
  operationObject?: OpenAPIV3_1.OperationObject
): void => {

  if (operationObject) {
    if (operationObject.operationId) {
      // console.log(kebabToCamel(operationObject.operationId));
      const operationId = kebabToCamel(operationObject.operationId)

      const queryParameters = operationObject.parameters.filter((parameter: OpenAPIV3_1.ParameterObject) => parameter.in == 'query');
      const pathParameters = operationObject.parameters.filter((parameter: OpenAPIV3_1.ParameterObject) => parameter.in == 'path');

      const f = (parameter: OpenAPIV3_1.ParameterObject) => { }

      const body = operationObject.requestBody;
      if (isReferenceObject(body)) {
        // do nothing
      } else {
        // do nothing
        const mediaTypeObject = body.content.applicationJson.schema;

        if (isReferenceObject(mediaTypeObject)) {
          // do nothing
        } else {
          mediaTypeObject
        }
      }
    }

    // response
    //    ok
    //    error
  }
}

try {
  await SwaggerParser.parse(path)
    .then((document: OpenAPIV3_1.Document): void => {
      console.log(document.components.schemas);

      const components = document.components;

      const schemas = components.schemas;
      for (const [schemaName, schema] of Object.entries(schemas)) {
        const properties = schema.properties

        if (properties) {
          console.log(`=== ${schemaName} ===`)
          for (const [propertyName, property] of Object.entries(properties)) {
            console.log(propertyName, property)


            if (!isReferenceObject(property)) {
              if (property.allOf) {
                // do nothing
              } else {
                // do nothing
              }

            } else {
              // do nothing
            }

          }
        }
      }

      const paths = document.paths
      for (const [path, pathItem] of Object.entries(paths)) {
        handleOperation(OpenAPIV3.HttpMethods.GET, path, pathItem.get);
        handleOperation(OpenAPIV3.HttpMethods.POST, path, pathItem.post);
        handleOperation(OpenAPIV3.HttpMethods.PUT, path, pathItem.put);
        handleOperation(OpenAPIV3.HttpMethods.DELETE, path, pathItem.delete);
      }

    });
} catch (err) {
  console.error(err);
}
