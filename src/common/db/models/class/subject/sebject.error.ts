import { ErrorCodes } from "../../../../constants/error.codes";
import { BaseResponse } from "../../../../reporter/base.response";


export class SubjectResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new SubjectResponse(ErrorCodes.SUBJECTS, "subject already exists", data)
    }

    static NotFound(data: any = null) {
        return new SubjectResponse(ErrorCodes.SUBJECTS + 1, "subject not found", data, false, 404)
    }
}