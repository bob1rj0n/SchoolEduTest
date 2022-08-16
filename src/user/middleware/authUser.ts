import { UserResponse } from "../../common/db/models/user/user.error";
import { BaseResponse } from "../../common/reporter/base.response";
import { userService } from "../../common/service/user/user.service";
import { jwt } from "../../common/utils/jwt";

export async function authTokenUser(req, res, next) {
    try {
        const { phonenumber } = await jwt.verify(req.headers.token)

        const user = await userService.findByPhonNumber(phonenumber)

        if (!user) throw UserResponse.NotFound(phonenumber)

        req.userId = user._id
        next()
    } catch (error) {
        return next(BaseResponse.UnAuthorizationError(error))
    }
}