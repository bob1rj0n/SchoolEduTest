import sha256 from "sha256"
import { Roles } from "../../common/constants/roles"
import { EmployeeResponse } from "../../common/db/models/admin/employee/employee.error"
import { employeeService } from "../../common/service/admin/employee.service"
import { roleService } from "../../common/service/admin/role.service"
import { withTransaction } from "../../common/sessions/session"
import { jwt } from "../../common/utils/jwt"
import { EmployeeDto, EmployeeDtoGroups, EmployeeGetDto } from "../../common/validation/dto/admin/employee.dto"
import { validateIt } from "../../common/validation/validate"


export async function createEmployeeHandler(req, res, next) {
    try {
        // await roleService.hasAccess(req.roleId, Roles.EMPLOYEE_CREATE)

        const data = await validateIt(req.body, EmployeeDto, EmployeeDtoGroups.CREATE)

        console.log("data : ", data)
        data.password = sha256(data.password)

        console.log("password : ", data)

        const employee = await employeeService.create(data)
        return res.send(EmployeeResponse.Success(employee._id))
    } catch (error) {
        return next(error)
    }
}

export async function getPagingEmployeeHandler(req, res, next) {
    try {

        await roleService.hasAccess(req.roleId, Roles.EMPLOYEE)

        const data = await validateIt(req.query, EmployeeGetDto, EmployeeDtoGroups.PAGENATION)

        const employees = await employeeService.getPaging(data)

        return res.send(EmployeeResponse.Success(employees))
    } catch (error) {
        return next(error)
    }
}

export async function getEmployeeByIdHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.EMPLOYEE)

        const data = await validateIt(req.params, EmployeeDto, EmployeeDtoGroups.GET_BY_ID)

        const employee = await employeeService.getById(data._id)
        return res.send(EmployeeResponse.Success(employee))
    } catch (error) {
        return next(error)
    }
}

export async function getEmpByPhoneNumber(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.EMPLOYEE)

        const data = await validateIt(req.body, EmployeeDto, EmployeeDtoGroups.PHONENUMBER)

        const emp = await employeeService.findByPhoneNumber(data.phoneNumber)

        res.send(EmployeeResponse.Success(emp))
    } catch (error) {
        return next(error)
    }
}

export async function updateEmployeeHandler(request, response, next) {
    try {
        await roleService.hasAccess(request.roleId, Roles.EMPLOYEE_UPDATE)

        const id = request.employeeId

        const data = await validateIt(request.body, EmployeeDto, [EmployeeDtoGroups.UPDATE])

        if (data.password) {
            data.password = sha256(data.password)
        }

        let employee = await employeeService.findById(id)
        if (!employee._id) throw EmployeeResponse.NotFound()

        const updatedEmployee = await employeeService.update(id, data)

        return response.send(EmployeeResponse.Success(updatedEmployee._id))
    } catch (error) {
        return next(error)
    }
}

export async function deleteEmpHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.EMPLOYEE_DELETE)

        const data = await validateIt(req.params, EmployeeDto, EmployeeDtoGroups.DELETE)

        const result = await withTransaction(async (session) => {
            const employee = await employeeService.getById(data._id)

            const delEmp = await employeeService.updateOne(employee._id, { isDeleted: true }, { session: session })

            const delRole = await roleService.updateOne(employee.roleId, { isDeleted: true }, { session: session })

            return delEmp._id
        })
        return res.send(EmployeeResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}

export async function signInHandler(req, res, next: Function) {
    try {
        const data = await validateIt(req.body, EmployeeDto, [EmployeeDtoGroups.LOGIN])

        const employee = await employeeService.findByPhoneNumber(data.phoneNumber)
        if (!employee) throw EmployeeResponse.NotFound(data.phoneNumber)
        console.log(employee)
        if (employee.password != sha256(data.password)) throw EmployeeResponse.InvalidPassword()

        const token: any = await jwt.sign({ phonenumber: employee.phoneNumber })
        const result = {
            token: token,
            firstname: employee.firstname,
            lastname: employee.lastname,
            phoneNumber: employee.phoneNumber
        }
        return res.send(EmployeeResponse.Success(result))

    } catch (error) {
        return next(error)
    }
}
