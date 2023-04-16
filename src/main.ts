import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import Utils from './utils.js';
import YAML from 'yaml';
import fs from 'fs';

const path = './spotify-web-api/fixed-spotify-open-api.yml';

try {
  await SwaggerParser.parse(path).then((document: OpenAPIV3.Document): void => {
    for (const [key, value] of Object.entries(document.components.schemas)) {
      if (key.includes('Object')) {
        const keyWithoutObject = key.replace('Object', '');

        // SchemaObject / ReferenceObject を再帰的に探索して置き換える
        const f = (
          schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
        ): void => {
          if (Utils.isReferenceObject(schema)) {
            if (schema.$ref === `#/components/schemas/${key}`) {
              schema.$ref = `#/components/schemas/${keyWithoutObject}`;
            }
          } else {
            if (Utils.isArraySchemaObject(schema)) {
              f(schema.items);
            } else {
              // NonArraySchemaObject
              if (schema.properties) {
                for (const [_, propertyValue] of Object.entries(
                  schema.properties,
                )) {
                  f(propertyValue);
                }
              }
              schema?.allOf?.forEach((allOfValue) => f(allOfValue));
              schema?.oneOf?.forEach((oneOfValue) => f(oneOfValue));
            }
          }
        };

        document.components.schemas[keyWithoutObject] = value;
        delete document.components.schemas[key];

        for (const [_, path] of Object.entries(document.paths)) {
          for (const [_, methodValue] of Object.entries(path)) {
            if (Utils.isOperationObject(methodValue)) {
              const parameters = methodValue.parameters;
              if (parameters) {
                for (const [_, parameterValue] of Object.entries(parameters)) {
                  if (
                    parameterValue &&
                    !Utils.isReferenceObject(parameterValue)
                  ) {
                    const schema = parameterValue.schema;
                    f(schema);
                  }
                }
              }

              const responses = methodValue.responses;
              if (responses) {
                for (const [_, responseValue] of Object.entries(responses)) {
                  if (responseValue && Utils.isReferenceObject(responseValue)) {
                    f(responseValue);
                  }
                }
              }
            }
          }
        }

        for (const [_, response] of Object.entries(
          document.components.responses,
        )) {
          if (Utils.isReferenceObject(response)) {
            f(response);
          } else {
            if (response.content) {
              for (const [_, contentValue] of Object.entries(
                response.content,
              )) {
                if (contentValue) {
                  if (contentValue.schema) {
                    f(contentValue.schema);
                  }
                }
              }
            }
          }
        }

        for (const [_, schema] of Object.entries(document.components.schemas)) {
          f(schema);
        }
      }
    }

    fs.writeFile(
      './spotify-open-api.yml',
      YAML.stringify(document),
      function (err) {
        if (err) {
          console.log(err);
        }
      },
    );
  });
} catch (err) {
  console.error(err);
}
