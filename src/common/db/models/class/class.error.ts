import { ErrorCodes } from "../../../constants/error.codes"
import { BaseResponse } from "../../../reporter/base.response"


export class ClassResponse extends BaseResponse {
    static NotFound(data: any = null): BaseResponse {
        return new ClassResponse(ErrorCodes.CLASS, "class not found", data, false, 404)
    }

    static AlreadyExists(data: any = null) {
        return new ClassResponse(ErrorCodes.CLASS + 1, "class already exists", data)
    }
}