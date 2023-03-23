import SwaggerParser from "@apidevtools/swagger-parser";

try {
  const api = await SwaggerParser.parse('./spotify-web-api/fixed-spotify-open-api.yml');
  console.log("API name: %s, Version: %s", api.info.title, api.info.version);
}
catch (err) {
  console.error(err);
}
