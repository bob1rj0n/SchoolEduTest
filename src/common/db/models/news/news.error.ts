import { ErrorCodes } from "../../../constants/error.codes";
import { BaseResponse } from "../../../reporter/base.response";



export class NewsResponse extends BaseResponse {
    static NotFound(data: any = null) {
        return new NewsResponse(ErrorCodes.NEWS, "news not found", data, false, 404)
    }

    static NotEnoughPermission(data: any = null) {
        return new NewsResponse(ErrorCodes.NEWS + 1, "not enough permission to access", data)
    }
}