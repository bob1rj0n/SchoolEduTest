import { exitCode } from "process"
import { Roles } from "../../common/constants/roles"
import { SubjectResponse } from "../../common/db/models/class/subject/sebject.error"
import { roleService } from "../../common/service/admin/role.service"
import { SubjectService, subjectService } from "../../common/service/subject/subject.service"
import { SubjectDto, SubjectDtoGroup, SubjectGetDto } from "../../common/validation/dto/class/subject/subject.dto"
import { validateIt } from "../../common/validation/validate"

export async function createSubjectHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SUBJECT_CREATE)

        const data = await validateIt(req.body, SubjectDto, SubjectDtoGroup.CREATE)

        const subject = await subjectService.create(data)

        return res.send(SubjectResponse.Success(subject._id))
    } catch (error) {
        return next(error)
    }
}

export async function getSubjectByIdHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SUBJECT)

        const data = await validateIt(req.params, SubjectDto, SubjectDtoGroup.GET_BY_ID)

        const subject = await subjectService.getById(data._id)
        if (!subject) throw SubjectResponse.NotFound(data._id)

        return res.send(SubjectResponse.Success(subject))
    } catch (error) {
        return next(error)
    }
}

export async function getPagingSubjectHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SUBJECT)

        const data = await validateIt(req.query, SubjectGetDto, SubjectDtoGroup.PAGENATION)

        const result = await subjectService.getPaging(data)

        return res.send(SubjectResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}


export async function updateSubjectHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SUBJECT_UPDATE)

        const data = await validateIt({ ...req.params, ...req.body }, SubjectDto, SubjectDtoGroup.UPDATE)
        const id = data._id

        const rsult = await subjectService.update(id, data)

        return res.send(SubjectResponse.Success(rsult._id))
    } catch (e) {
        return next(e)
    }
}

export async function deleteSubjectHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.SUBJECT_DELETE)

        const data = await validateIt(req.params, SubjectDto, SubjectDtoGroup.DELETE)

        const del = await subjectService.delete(data._id)

        return res.send(SubjectResponse.Success(del._id))
    } catch (error) {
        return next(error)
    }
}