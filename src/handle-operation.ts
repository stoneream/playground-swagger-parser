import { OpenAPIV3 } from 'openapi-types';
import Utils from './utils.js';

const HandleOperation = (
  httpMethod: OpenAPIV3.HttpMethods,
  path: string,
  operationObject?: OpenAPIV3.OperationObject,
): void => {
  if (operationObject) {
    if (operationObject.operationId) {
      const operationId = Utils.kebabToCamel(operationObject.operationId);

      const queryParameters = operationObject.parameters.filter(
        (parameter: OpenAPIV3.ParameterObject) => parameter.in == 'query',
      );
      const pathParameters = operationObject.parameters.filter(
        (parameter: OpenAPIV3.ParameterObject) => parameter.in == 'path',
      );

      operationId;
      queryParameters;
      pathParameters;
      httpMethod;
      path;

      const body = operationObject.requestBody;
      if (Utils.isReferenceObject(body)) {
        // do nothing
      } else {
        // do nothing
        const mediaTypeObject = body.content.applicationJson.schema;

        if (Utils.isReferenceObject(mediaTypeObject)) {
          // do nothing
        } else {
          // do nothing
        }
      }
    }

    // response
    //    ok
    //    error
  }
};

export default HandleOperation;
