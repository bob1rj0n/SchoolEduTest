import { QuestionResponse } from "../../../common/db/models/test/question/question.error"
import { BaseResponse } from "../../../common/reporter/base.response"
import { setAnswerService } from "../../../common/service/test/answer.service"
import { questionService } from "../../../common/service/test/question.service"
import { SetAnswerDto, SetAnswerDtoGroup } from "../../../common/validation/dto/test/answer.dto"
import { QuestionPagingDto, QuestionDtoGroup, AnswerDto } from "../../../common/validation/dto/test/question.dto"
import { validateIt } from "../../../common/validation/validate"

export async function getQuestionByTestIdPaging(req, res, next) {
    try {
        const data = await validateIt(req.query, QuestionPagingDto, QuestionDtoGroup.PAGENATION)

        const result = await questionService.getByTestIdPaging(data)
        if (!result.length) throw QuestionResponse.NotFound()

        return res.send(QuestionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}
