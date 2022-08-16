import { Roles } from "../../common/constants/roles"
import { RoleResponse } from "../../common/db/models/admin/role/role.error"
import { roleService } from "../../common/service/admin/role.service"
import { RoleDto, RoleDtoGroup, RoleGetDto } from "../../common/validation/dto/admin/role.dto"
import { validateIt } from "../../common/validation/validate"


export async function createRoleHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE_CREATE)

        const data = await validateIt(req.body, RoleDto, RoleDtoGroup.CREATE)

        const role = await roleService.create(data)

        return res.send(RoleResponse.Success(role._id))
    } catch (error) {
        return next(error)
    }
}

export async function getRolePagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE)

        const data = await validateIt(req.query, RoleGetDto, RoleDtoGroup.PAGENATION)

        const role = await roleService.getPaging(data)

        return res.send(RoleResponse.Success(role))

    } catch (error) {
        return next(error)
    }
}

export async function getRoleByIdHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE)

        const data = await validateIt(req.params, RoleDto, RoleDtoGroup.GET_BY_ID)

        const role = await roleService.getById(data._id)
        if (!role) throw RoleResponse.NotFound()

        return res.send(RoleResponse.Success(role))
    } catch (error) {
        return next(error)
    }
}

export async function updateRoleHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.ROLE_UPDATE)

        const data = await validateIt({ ...req.params, ...req.body }, RoleDto, RoleDtoGroup.UPDATE)
        const id = data._id

        const role = await roleService.getById(id)
        if (!role) throw RoleResponse.NotFound(id)

        const updateRole = await roleService.update(id, data)

        return res.send(RoleResponse.Success(updateRole))
    } catch (error) {
        return next(error)
    }
}