import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPIV3_1 } from "openapi-types";

const path = './spotify-web-api/fixed-spotify-open-api.yml';

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

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const isReferenceObject = (property: any): property is OpenAPIV3_1.ReferenceObject =>
              property.$ref !== undefined;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const isSchemaObject = (property: any): property is OpenAPIV3_1.SchemaObject =>
              !isReferenceObject(property)

            if (isSchemaObject(property)) {
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
    });
} catch (err) {
  console.error(err);
}
