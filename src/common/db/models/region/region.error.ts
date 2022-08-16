import { ErrorCodes } from "../../../constants/error.codes";
import { BaseResponse } from "../../../reporter/base.response";



export class RegionResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new RegionResponse(ErrorCodes.REGIONS, "region already exists", data)
    }

    static NotFound(data: any = null) {
        return new RegionResponse(ErrorCodes.REGIONS + 1, "region not found", data, false, 404)
    }
}