import { Roles } from "../../common/constants/roles"
import { SectionResponse } from "../../common/db/models/class/subject/section/section.error"
import { roleService } from "../../common/service/admin/role.service"
import { sectionService } from "../../common/service/subject/section.service"
import { SectionDto, SectionDtoGroup, SectionGetDto, SectionPagingDto } from "../../common/validation/dto/class/subject/section.dto"
import { validateIt } from "../../common/validation/validate"

export async function createSectionHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SECTION_CREATE)

        const data = await validateIt(req.body, SectionDto, SectionDtoGroup.CREATE)

        const result = await sectionService.create(data)

        return res.send(SectionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function getByIdHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SECTION)

        const data = await validateIt(req.params, SectionDto, SectionDtoGroup.GET_BY_ID)

        const result = await sectionService.getById(data._id)

        return res.send(SectionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function getPagingSectionHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SECTION)

        const data = await validateIt(req.query, SectionGetDto, SectionDtoGroup.PAGENATION)

        const result = await sectionService.getPaging(data)

        return res.send(SectionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}
///test
export async function pagingSectionHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SECTION)

        const data = await validateIt(req.query, SectionPagingDto, SectionDtoGroup.PAGENATION)

        const result = await sectionService.findByPaging(data)

        return res.send(SectionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function updateSectionHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SECTION_UPDATE)

        const data = await validateIt({ ...req.params, ...req.body }, SectionDto, SectionDtoGroup.UPDATE)
        const id = data._id

        const rsult = await sectionService.update(id, data)

        return res.send(SectionResponse.Success(rsult._id))
    } catch (e) {
        return next(e)
    }
}

export async function deleteSectionHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SECTION_DELETE)

        const data = await validateIt(req.params, SectionDto, SectionDtoGroup.DELETE)

        const del = await sectionService.delete(data._id)

        return res.send(SectionResponse.Success(del._id))
    } catch (error) {
        return next(error)
    }
}