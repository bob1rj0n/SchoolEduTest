import { ErrorCodes } from "../constants/error.codes";


export class BaseResponse {
  public constructor(
    public code: number,
    public message: string,
    public data: any,
    public success: boolean = false,
    public statusCode: number = 400,
    public time = new Date()
  ) { }
  static UnknownError(data?: any) {
    return new BaseResponse(ErrorCodes.BASE, 'Unknown error!', data);
  }
  static ValidationError(data?: any) {
    return new BaseResponse(ErrorCodes.BASE + 1, 'Validation Error!', data);
  }

  static Success(data: any = null) {
    return new BaseResponse(0, 'OK', data, true, 200)
  }

  static UnAuthorizationError(data: any = null) {
    return new BaseResponse(401, 'Unauthorized!', data, false, 401)
  }

  static NotFound(data: any = null) {
    return new BaseResponse(404, 'Not found!', data, false, 404)
  }

  static InvalidToken(data: any = null) {
    return new BaseResponse(401, "Invalid token!", data, false, 401)
  }

  static InvalidImg(data: any = null) {
    return new BaseResponse(400, "Invalid img input", data)
  }
}
