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

            // SchemaObjectのケース
            // ReferenceObjectのケース

          }
        }
      }
    });
} catch (err) {
  console.error(err);
}
