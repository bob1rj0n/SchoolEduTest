import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { AnswerResponse } from "../../db/models/test/user.answers/answer.error";
import { SetAnswer, setAnswerModel } from "../../db/models/test/user.answers/answer.model";
import { CommonServices } from "../common.service";
import { quizService } from "./quiz.service";
import { testService } from "./test.service";


export class AnswerService extends CommonServices<SetAnswer>{
    constructor(model: ModelType<SetAnswer>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (e) {
            throw e
        }
    }

    public async getByQuestionId(ids) {
        try {
            const { userId, questionId, testId, startedAt } = ids;
            const $match = {
                $match: {
                    userId: userId,
                    questionId: questionId,
                    testId: testId,
                    createdAt: { $gte: (startedAt) },
                    isDeleted: false
                }
            }
            const $pipeline = [$match]

            return (await this.aggregate($pipeline))[0]
        } catch (error) {
            throw error
        }
    }

    public async checkTimeByTestId(testId, startedAt) {
        try {
            const test = await testService.getById(new Types.ObjectId(testId))
            const duration = test[0].duration

            const time = new Date(startedAt.getTime() + 1000 * 60 * (duration))

            const nowTime = new Date()

            if (nowTime < time) {
                return true
            }
            else {
                return false
            }
        } catch (error) {
            throw error
        }
    }

    public async updateByIds(ids, data, options?: QueryOptions) {
        try {
            const { userId, questionId, testId, startedAt } = ids
            const $match = {
                $match: {
                    userId: userId,
                    questionId: questionId,
                    testId: testId,
                    createdAt: { $gte: new Date(startedAt) },
                    isDeleted: false
                }
            }

            const $pipeline = [$match]

            const result = (await this.aggregate($pipeline))[0]
            console.log("result : ", result)
            if (!result) throw AnswerResponse.NotFound()
            const id = result._id

            return await this.updateOne(id, data)
        } catch (error) {
            throw error
        }
    }
}

export const setAnswerService = new AnswerService(setAnswerModel);