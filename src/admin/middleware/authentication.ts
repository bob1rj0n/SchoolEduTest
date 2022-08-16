import { EmployeeResponse } from "../../common/db/models/admin/employee/employee.error";
import { BaseResponse } from "../../common/reporter/base.response";
import { employeeService } from "../../common/service/admin/employee.service";
import { jwt } from "../../common/utils/jwt";


export async function authToken(req, res, next) {
    try {
        const { phonenumber } = await jwt.verify(req.headers.token)

        const employee = await employeeService.findByPhoneNumber(phonenumber)
        if (!employee) throw BaseResponse.InvalidToken()

        req.roleId = employee.roleId
        req.employeeId = employee._id
        return next()
    } catch (error) {
        return next(BaseResponse.UnAuthorizationError(error))
    }
}