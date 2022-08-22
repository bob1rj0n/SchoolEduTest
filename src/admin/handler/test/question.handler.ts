import { QuestionResponse } from "../../../common/db/models/test/question/question.error"
import { questionService } from "../../../common/service/test/question.service"
import { testService } from "../../../common/service/test/test.service"
import { withTransaction } from "../../../common/sessions/session"
import { QuestionDto, QuestionDtoGroup, QuestionGetDto, QuestionPagingDto } from "../../../common/validation/dto/test/question.dto"
import { validateIt } from "../../../common/validation/validate"

export async function createQuestionHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, QuestionDto, QuestionDtoGroup.CREATE)

        const test = await testService.getById(data.testId)

        // const result = await withTransaction(async (session) => {

        const question = await questionService.create(data)//, { session: session })//

        const query = { $inc: { questionCount: 1 } }
        await testService.updateOne(test._id, query)//, { session: session })//

        //     return question
        // })

        return res.send(QuestionResponse.Success(question._id))
    } catch (error) {
        return next(error)
    }
}

export async function getPagingQuestionsHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, QuestionGetDto, QuestionDtoGroup.PAGENATION)

        const result = await questionService.getPaging(data)

        return res.send(QuestionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function getByTestIdPaging(req, res, next) {
    try {
        const data = await validateIt(req.query, QuestionPagingDto, QuestionDtoGroup.PAGENATION)

        const result = await questionService.getByTestIdPaging(data)

        return res.send(QuestionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function updateQuestionHandler(req, res, next) {
    try {
        const data = await validateIt({ ...req.params, ...req.body }, QuestionDto, QuestionDtoGroup.UPDATE)
        const id = data._id

        await questionService.getById(id)

        const updatedQuestion = await questionService.update(id, data)

        return res.send(QuestionResponse.Success(updatedQuestion._id))
    } catch (error) {
        return next(error)
    }
}

export async function deleteQuestionHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, QuestionDto, QuestionDtoGroup.DELETE)

        const foundQuestion = await questionService.getById(data._id)

        const result = await withTransaction(async (session) => {
            const question = await questionService.delete(data._id, { session: session })

            const query = { $inc: { questionCount: -1 } }
            await testService.updateOne(foundQuestion.testId, query, { session: session })

            return question._id
        })

        return res.send(QuestionResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}