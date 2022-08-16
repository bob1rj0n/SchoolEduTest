import { SubjectResponse } from "../../common/db/models/class/subject/sebject.error"
import { subjectService } from "../../common/service/subject/subject.service"
import { SubjectDto, SubjectDtoGroup, SubjectGetDto } from "../../common/validation/dto/class/subject/subject.dto"
import { validateIt } from "../../common/validation/validate"

export async function getPagingSubjectHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, SubjectGetDto, SubjectDtoGroup.PAGENATION)

        const subjects = await subjectService.getPaging(data)

        return res.send(SubjectResponse.Success(subjects))
    } catch (error) {
        return next(error)
    }
}
