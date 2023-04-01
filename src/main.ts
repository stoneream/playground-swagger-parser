import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPIV3_1 } from "openapi-types";

const path = './spotify-web-api/fixed-spotify-open-api.yml';

try {
  await SwaggerParser.parse(path)
    .then((document: OpenAPIV3_1.Document): void => {
      console.log(document.components.schemas);

      const components = document.components;

      for (const [schemaName, schema] of Object.entries(components.schemas)) {
        console.log(schemaName)
        for (const [propertyName, property] of Object.entries(schema.properties)) {
          console.log(`${propertyName} : ${property}`)
        }
      }
    });
} catch(err) {
  console.error(err);
}
