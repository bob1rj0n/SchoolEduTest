import { ErrorCodes } from "../../../../constants/error.codes";
import { BaseResponse } from "../../../../reporter/base.response";



export class RoleResponse extends BaseResponse {
    static NotFound(data: any = null) {
        return new BaseResponse(ErrorCodes.ROLE, 'Role not found', data);
    }
    static AlreadyExists(data: any = null) {
        return new BaseResponse(ErrorCodes.ROLE + 1, 'Role already exists!', data);
    }
    static RoleOfAdmins(data: any = null) {
        return new BaseResponse(ErrorCodes.ROLE + 2, 'There are appropriate admins for this role!!!', data);
    }

    static NotEnoughPermission(data: any = null) {
        return new BaseResponse(ErrorCodes.ROLE + 3, 'Not enough permissions to access!', data);
    }

}