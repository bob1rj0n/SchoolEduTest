import { ErrorCodes } from "../../../../constants/error.codes"
import { BaseResponse } from "../../../../reporter/base.response"


export class QuestionResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new QuestionResponse(ErrorCodes.QUESTION, "question already exists", data)
    }

    static NotFound(data: any = null) {
        return new QuestionResponse(ErrorCodes.QUESTION + 1, "question not found", data, false, 404)
    }
}