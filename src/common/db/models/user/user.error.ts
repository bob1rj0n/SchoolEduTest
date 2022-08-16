import { ErrorCodes } from "../../../constants/error.codes"
import { BaseResponse } from "../../../reporter/base.response"


export class UserResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new UserResponse(ErrorCodes.USER, "user already exists", data)
    }

    static NotFound(data: any = null) {
        return new UserResponse(ErrorCodes.USER + 1, "user not found", data, false, 404)
    }

    static InvalidPassword(data: any = null) {
        return new UserResponse(ErrorCodes.USER + 2, "invalid password", data)
    }
}