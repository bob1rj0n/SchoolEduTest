import { ErrorCodes } from "../../../constants/error.codes"
import { BaseResponse } from "../../../reporter/base.response"


export class TestResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new TestResponse(ErrorCodes.TEST, "test already exists", data)
    }

    static NotFound(data: any = null) {
        return new TestResponse(ErrorCodes.TEST + 1, "test not found", data, false, 404)
    }

    static TestNotStarted(data: any = null) {
        return new TestResponse(ErrorCodes.TEST + 2, "test not started", data)
    }
}