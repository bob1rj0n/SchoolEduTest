import { Types } from "mongoose"
import { TestResponse } from "../../../common/db/models/test/test.error"
import { QuizResponse } from "../../../common/db/models/test/user.answers/quiz.error"
import { TestStatus } from "../../../common/db/models/test/user.answers/quiz.model"
import { BaseResponse } from "../../../common/reporter/base.response"
import { quizService } from "../../../common/service/test/quiz.service"
import { testService } from "../../../common/service/test/test.service"
import { QuizDto, QuizDtoGroup, QuizPagingDto, QuizGetDto } from "../../../common/validation/dto/test/quiz.dto"
import { validateIt } from "../../../common/validation/validate"


export async function registerForTestHandler(req, res, next) {
    try {
        req.body.userId = (req.userId).toString()

        const data = await validateIt(req.body, QuizDto, QuizDtoGroup.REGISTER)

        const test = await testService.getById(data.testId)
        if (!test.length) throw TestResponse.NotFound(data.testId)

        data.questionCount = test[0].questionCount
        const result = await quizService.create(data)

        return res.send(BaseResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}

export async function getRegisteredTestsHandler(req, res, next) {
    try {
        req.query.userId = (req.userId).toString()
        const data = await validateIt(req.query, QuizPagingDto, QuizDtoGroup.PAGENATION)

        const tests = await quizService.getRegisteredTestsPaging(data)

        return res.send(BaseResponse.Success(tests))
    } catch (error) {
        return next(error)
    }
}


export async function startQuizHandler(req, res, next) {
    try {
        const userId = (req.userId).toString()

        const data = await validateIt(req.query, QuizDto, QuizDtoGroup.GET_BY_ID)

        await quizService.checkStatusByUserId(userId)

        const test = await quizService.getByIdError(data._id)
        if (test.status != "pending") throw QuizResponse.TestError(data._id)

        const startDate = new Date()
        const quiz = await quizService.updateUserScores(data._id, { status: TestStatus.STARTED, startedAt: startDate })

        return res.send(BaseResponse.Success(quiz))
    } catch (error) {
        return next(error)
    }
}

export async function finishedQuizHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, QuizDto, QuizDtoGroup.GET_BY_ID)

        const test = await quizService.getByIdError(data._id)

        if (test.status != "started") throw QuizResponse.TestNotStarted(data.testId)

        const finishDate = new Date()
        const quiz = await quizService.updateUserScores(data._id, { status: TestStatus.FINISHED, finishedAt: finishDate })

        return res.send(BaseResponse.Success(quiz))
    } catch (error) {
        return next(error)
    }
}

export async function checkAnswerHandler(req, res, next) {
    try {
        req.body.userId = (req.userId).toString()
        const data = await validateIt(req.body, QuizDto, QuizDtoGroup.CHECK_ASNWER)

        const test = await quizService.findByUserAndTestIds({ userId: data.userId, testId: data.testId })/////ozgartirish
        if (test[0].status != "finished") throw QuizResponse.TestNotFinished()

        const ids = {
            userId: data.userId,
            testId: data.testId,
            startedAt: test[0].startedAt
        }

        const result = await quizService.checkAnswer(ids)

        return res.send(BaseResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function getPagingResultHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, QuizPagingDto, QuizDtoGroup.PAGENATION)

        const results = await quizService.getPagingResult(data)

        return res.send(QuizResponse.Success(results))
    } catch (error) {
        return next(error)
    }
}


export async function getResultOneTestHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, QuizDto, QuizDtoGroup.STATISTICS)

        const result = await quizService.getResultOneTest(data.testId)
        let allPercent = 0;
        for (const item of result) {
            allPercent += item.percent
        }
        const count = await quizService.getCount({ testId: new Types.ObjectId(data.testId) })
        const avgPercent = parseInt((allPercent / count.totalCount).toFixed(1))

        const Result = {
            participantCount: count.totalCount,
            questionCount: result[0].questionCount,
            avgPercent: avgPercent,
            maxPercent: result[0].percent
        }

        return res.send(QuizResponse.Success(Result))
    } catch (error) {
        return next(error)
    }
}