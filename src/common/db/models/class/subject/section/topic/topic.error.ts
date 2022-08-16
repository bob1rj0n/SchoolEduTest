import { ErrorCodes } from "../../../../../../constants/error.codes"
import { BaseResponse } from "../../../../../../reporter/base.response"


export class TopicResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new TopicResponse(ErrorCodes.TOPICS, "topic already exists", data)
    }

    static NotFound(data?: any): BaseResponse {
        return new TopicResponse(ErrorCodes.TOPICS + 1, "topic not found", data, false, 404)
    }
}