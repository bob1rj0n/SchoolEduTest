import { TestResponse } from "../../../common/db/models/test/test.error";
import { AnswerResponse } from "../../../common/db/models/test/user.answers/answer.error";
import { QuizResponse } from "../../../common/db/models/test/user.answers/quiz.error";
import { TestStatus } from "../../../common/db/models/test/user.answers/quiz.model";
import { BaseResponse } from "../../../common/reporter/base.response";
import { setAnswerService } from "../../../common/service/test/answer.service";
import { quizService } from "../../../common/service/test/quiz.service";
import { testService } from "../../../common/service/test/test.service";
import { SetAnswerDto, SetAnswerDtoGroup } from "../../../common/validation/dto/test/answer.dto";
import { validateIt } from "../../../common/validation/validate";

export async function createAnswerHandler(req, res, next) {
    try {
        req.body.userId = (req.userId).toString();

        const data = await validateIt(req.body, SetAnswerDto, SetAnswerDtoGroup.CREATE)

        const test = await quizService.findByUserAndTestIds({ userId: data.userId, testId: data.testId })//ozgartirish
        console.log("status ", test)
        if (test[0].status != "started") throw QuizResponse.TestNotStarted(data.testId)

        //for check time
        const time = await setAnswerService.checkTimeByTestId(data.testId, test[0].startedAt)
        if (time == false) {
            test[0]._id
            const quiz = await quizService.updateUserScores(test[0]._id, { status: TestStatus.FINISHED, finishedAt: new Date() })
            const result = {
                result: quiz,
                message: "Time is already up"
            }
            res.send(BaseResponse.Success(result))
        }

        const ids = {
            userId: data.userId,
            questionId: data.questionId,
            testId: data.testId,
            startedAt: test[0].startedAt
        }

        const answer = await setAnswerService.getByQuestionId(ids)
        if (answer) throw AnswerResponse.AlreadyExists(answer._id)

        const result = await setAnswerService.create(data)

        return res.send(BaseResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}

export async function updateAnswerHandler(req, res, next) {
    try {
        req.body.userId = (req.userId).toString()

        const data = await validateIt(req.body, SetAnswerDto, SetAnswerDtoGroup.UPDATE)

        const test = await quizService.findByUserAndTestIds({ userId: data.userId, testId: data.testId })//ozgartirish
        if (test[0].status != "started") throw QuizResponse.TestNotStarted({ testId: test[0].testId })
        console.log("startedAt : ", test)

        ///for check time
        const time = await setAnswerService.checkTimeByTestId(data.testId, test[0].startedAt)
        if (time == false) {
            test[0]._id
            const quiz = await quizService.updateUserScores(test[0]._id, { status: TestStatus.FINISHED, finishedAt: new Date() })
            const result = {
                result: quiz,
                message: "Time is already up"
            }
            res.send(BaseResponse.Success(result))
        }


        const ids = {
            userId: data.userId,
            questionId: data.questionId,
            testId: data.testId,
            startedAt: test[0].startedAt,
        }

        const result = await setAnswerService.updateByIds(ids, data)

        return res.send(BaseResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}