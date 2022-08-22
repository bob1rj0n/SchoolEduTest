import { AnswerResponse } from "../../../common/db/models/test/user.answers/answer.error";
import { QuizResponse } from "../../../common/db/models/test/user.answers/quiz.error";
import { TestStatus } from "../../../common/db/models/test/user.answers/quiz.model";
import { BaseResponse } from "../../../common/reporter/base.response";
import { setAnswerService } from "../../../common/service/test/answer.service";
import { quizService } from "../../../common/service/test/quiz.service";
import { SetAnswerDto, SetAnswerDtoGroup } from "../../../common/validation/dto/test/answer.dto";
import { validateIt } from "../../../common/validation/validate";

export async function createAnswerHandler(req, res, next) {
    try {
        req.body.userId = (req.userId).toString();

        const data = await validateIt(req.body, SetAnswerDto, SetAnswerDtoGroup.CREATE)

        const test = await quizService.findQuizByUserAndTestId(data.userId, data.testId)//ozgartirish
        if (test.status != TestStatus.STARTED) throw QuizResponse.TestNotStarted(data.testId)

        //for check time
        const time = await setAnswerService.checkTime(data.testId, test.startedAt)
        if (time == false) {
            const quiz = await quizService.updateUserScores(test._id, { status: TestStatus.FINISHED, finishedAt: new Date() })
            const result = {
                result: quiz,
                message: "Time is already up"
            }
            res.send(BaseResponse.Success(result))
        }

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

        const test = await quizService.findQuizByUserAndTestId(data.userId, data.testId)//ozgartirish
        if (test.status != TestStatus.STARTED) throw QuizResponse.TestNotStarted({ testId: test.testId })

        ///for check time
        const time = await setAnswerService.checkTime(data.testId, test.startedAt)
        if (time == false) {
            const quiz = await quizService.updateUserScores(test._id, { status: TestStatus.FINISHED, finishedAt: new Date() })
            const result = {
                result: quiz,
                message: "Time is already up"
            }
            res.send(BaseResponse.Success(result))
        }

        const result = await setAnswerService.updateWithoutId(data, test.startedAt)

        return res.send(BaseResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}