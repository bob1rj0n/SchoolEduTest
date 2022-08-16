import { ErrorCodes } from "../../../constants/error.codes";
import { BaseResponse } from "../../../reporter/base.response";

export class CategoryResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new CategoryResponse(ErrorCodes.CATEGORY, "category already exists", data)
    }

    static NotFound(data: any = null) {
        return new CategoryResponse(ErrorCodes.CATEGORY + 1, "category not found", data, false, 404)
    }
}