import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPIV3_1 } from "openapi-types";

try {
  await SwaggerParser.parse('./spotify-web-api/fixed-spotify-open-api.yml')
    .then((document: OpenAPIV3_1.Document): void => {
      console.log(document.components);
    })
    .then((_): void => {
      console.error("unsupported version");
    });

}
catch (err) {
  console.error(err);
}
