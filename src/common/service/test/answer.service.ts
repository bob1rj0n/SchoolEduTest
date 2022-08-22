import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { AnswerResponse } from "../../db/models/test/user.answers/answer.error";
import { SetAnswer, setAnswerModel } from "../../db/models/test/user.answers/answer.model";
import { TestStatus } from "../../db/models/test/user.answers/quiz.model";
import { BaseResponse } from "../../reporter/base.response";
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

    public async checkTime(testId, startedAt) {
        try {
            const test = await testService.getById(new Types.ObjectId(testId))
            const duration = test.duration

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

    public async updateWithoutId(data, startedAt, options?: QueryOptions) {
        try {
            const query = {
                userId: new Types.ObjectId(data.userId),
                questionId: new Types.ObjectId(data.questionId),
                testId: new Types.ObjectId(data.testId),
                createdAt: { $gte: (startedAt) },
                isDeleted: false
            }

            return await this.updateOneByQuery(query, { answerId: new Types.ObjectId(data.answerId) })
        } catch (error) {
            throw error
        }
    }
}

export const setAnswerService = new AnswerService(setAnswerModel);