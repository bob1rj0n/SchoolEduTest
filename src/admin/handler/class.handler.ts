import { Roles } from "../../common/constants/roles"
import { ClassResponse } from "../../common/db/models/class/class.error"
import { roleService } from "../../common/service/admin/role.service"
import { classService } from "../../common/service/class/class.service"
import { ClassDto, ClassDtoGroup, ClassGetDto } from "../../common/validation/dto/class/class.dto"
import { validateIt } from "../../common/validation/validate"

export async function createClassHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.CLASS_CREATE)

        const data = await validateIt(req.body, ClassDto, ClassDtoGroup.CREATE)

        const result = await classService.create(data)

        return res.send(ClassResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}

export async function getPagingClassHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.CLASS)

        const data = await validateIt(req.query, ClassGetDto, ClassDtoGroup.PAGENATION)

        const result = await classService.getPaging(data)

        return res.send(ClassResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}