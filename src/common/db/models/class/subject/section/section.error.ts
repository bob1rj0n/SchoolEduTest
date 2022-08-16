import { ErrorCodes } from "../../../../../constants/error.codes";
import { BaseResponse } from "../../../../../reporter/base.response";


export class SectionResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new SectionResponse(ErrorCodes.SECTIONS, "section already exists", data)
    }

    static NotFound(data?: any): BaseResponse {
        return new SectionResponse(ErrorCodes.SECTIONS + 1, "section not found", data, false, 404)
    }
}