import { ErrorCodes } from "../../../../constants/error.codes";
import { BaseResponse } from "../../../../reporter/base.response";

export class QuizResponse extends BaseResponse {
    static NotFound(data?: any): BaseResponse {
        return new QuizResponse(ErrorCodes.QUIZ, "quiz not found", data, false, 404)
    }

    static NotEnoughPermission(data: any = null) {
        return new QuizResponse(ErrorCodes.QUIZ + 1, "not enough permission", data)
    }

    static TestNotFinished(data: any = null) {
        return new QuizResponse(ErrorCodes.QUIZ + 2, "test not finished", data)
    }

    static TestNotStarted(data: any = null) {
        return new QuizResponse(ErrorCodes.QUIZ + 3, "test not started", data)
    }

    static TestError(data: any = null) {
        return new QuizResponse(ErrorCodes.QUIZ + 4, "test started or already finished", data)
    }

    static HaveStartedTest(data: any = null) {
        return new QuizResponse(ErrorCodes.QUIZ + 5, "you have a started test", data)
    }
}