import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import Utils from './utils.js';
import HandleComponentSchema from './handle-component-schema.js';

const path = './spotify-web-api/fixed-spotify-open-api.yml';

try {
  await SwaggerParser.dereference(path).then(
    (document: OpenAPIV3.Document): void => {
      console.log(document.components.schemas);

      const components = document.components;

      // schemas
      for (const [schemaName, schema] of Object.entries(components.schemas)) {
        if (!Utils.isReferenceObject(schema)) {
          HandleComponentSchema(schemaName, schema);
        }
      }

      // paths
      // const paths = document.paths;
      // for (const [path, pathItem] of Object.entries(paths)) {
      //   handleOperation(OpenAPIV3.HttpMethods.GET, path, pathItem.get);
      //   handleOperation(OpenAPIV3.HttpMethods.POST, path, pathItem.post);
      //   handleOperation(OpenAPIV3.HttpMethods.PUT, path, pathItem.put);
      //   handleOperation(OpenAPIV3.HttpMethods.DELETE, path, pathItem.delete);
      // }
    },
  );
} catch (err) {
  console.error(err);
}
