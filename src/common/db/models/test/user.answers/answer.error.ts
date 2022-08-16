import { ErrorCodes } from "../../../../constants/error.codes"
import { BaseResponse } from "../../../../reporter/base.response"

export class AnswerResponse extends BaseResponse {
    static NotFound(data?: any): BaseResponse {
        return new AnswerResponse(ErrorCodes.ANSWER, "answer not found", data, false, 404)
    }

    static NotEnoughPermission(data: any = null) {
        return new AnswerResponse(ErrorCodes.ANSWER + 1, "not enough permission", data)
    }

    static AlreadyExists(data: any = null) {
        return new AnswerResponse(ErrorCodes.ANSWER + 2, "answer already exists", data)
    }
}