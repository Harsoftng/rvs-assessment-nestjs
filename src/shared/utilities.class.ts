import { HttpResponseStatusEnum } from './types/http-response-status.enum';

export class Utilities {
  static getHttpResponse(
    message: string,
    status: HttpResponseStatusEnum = HttpResponseStatusEnum.ERROR,
  ) {
    return {
      status,
      message,
    };
  }
}
