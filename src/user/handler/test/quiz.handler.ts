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

        data.questionCount = test.questionCount
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
        req.body.userId = (req.userId).toString()

        const data = await validateIt(req.body, QuizDto, QuizDtoGroup.REGISTER)

        await quizService.checkStatusByUserId(data.userId)

        const test = await quizService.findQuizByUserAndTestId(data.userId, data.testId)
        if (test.status != TestStatus.PENDING) throw QuizResponse.TestError(data._id)

        const startDate = new Date()
        const quiz = await quizService.updateUserScores(test._id, { status: TestStatus.STARTED, startedAt: startDate })

        return res.send(BaseResponse.Success(quiz))
    } catch (error) {
        return next(error)
    }
}

export async function finishAndCheckQuizHandler(req, res, next) {
    try {
        req.body.userId = (req.userId).toString()
        const data = await validateIt(req.body, QuizDto, QuizDtoGroup.REGISTER)

        const test = await quizService.findQuizByUserAndTestId(data.userId, data.testId)
        // if (test.status != TestStatus.STARTED) throw QuizResponse.TestNotStarted(data.testId)

        const result = await quizService.checkAnswer(data.userId, data.testId, test.startedAt)

        const percent = parseInt(((result.count / test.questionCount) * 100).toFixed())


        const finishDate = new Date()
        const quiz = await quizService.updateUserScores(test._id, {
            trueAnswersCount: result.count,
            percent: percent,
            status: TestStatus.FINISHED,
            finishedAt: finishDate
        })

        return res.send(BaseResponse.Success(quiz))
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

        return res.send(QuizResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}