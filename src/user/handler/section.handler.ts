import { SectionResponse } from "../../common/db/models/class/subject/section/section.error"
import { sectionService } from "../../common/service/subject/section.service"
import { SectionDtoGroup, SectionGetDto, SectionPagingDto } from "../../common/validation/dto/class/subject/section.dto"
import { validateIt } from "../../common/validation/validate"

export async function getPagingSectionHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, SectionGetDto, SectionDtoGroup.PAGENATION)

        const result = await sectionService.getPaging(data)

        return res.send(SectionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function getBySubjectIdHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, SectionPagingDto, SectionDtoGroup.PAGENATION)

        const result = await sectionService.findByPaging(data)

        return res.send(SectionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}