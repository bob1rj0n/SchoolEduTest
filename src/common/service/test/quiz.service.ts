import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { CollectionNames } from "../../constants/collections";
import { QuizResponse } from "../../db/models/test/user.answers/quiz.error";
import { Quiz, quizModel } from "../../db/models/test/user.answers/quiz.model";
import { CommonServices } from "../common.service";
import { setAnswerService } from "./answer.service";
import { questionService } from "./question.service";

export class QuizService extends CommonServices<Quiz>{
    constructor(model: ModelType<Quiz>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (error) {
            throw error
        }
    }

    public async getByIdError(id) {
        try {
            const $match = {
                $match: {
                    _id: new Types.ObjectId(id),
                    isDeleted: false
                }
            }
            const $pipeline = [$match]

            const res = (await this.aggregate($pipeline))[0]
            if (!res) throw QuizResponse.NotFound(id)

            return res
        } catch (e) {
            throw e
        }
    }

    public async getPagingResult(data) {
        try {
            const { page, limit, testId } = data;

            const $skip = {
                $skip: limit * (page - 1)
            }
            const $limit = {
                $limit: limit
            }
            const $match = {
                $match: {
                    testId: new Types.ObjectId(testId),
                    isDeleted: false
                }
            }
            const $lookupUser = {
                $lookup: {
                    from: CollectionNames.USER,
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
            const $unwindUser = {
                $unwind: {
                    path: "$user"
                }
            }
            const $sort = {
                $sort: {
                    trueAnswersCount: -1
                }
            }
            const $project = {
                $project: {
                    userId: 0,
                    isDeleted: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    startedAt: 0,
                    __v: 0,
                    user: {
                        isDeleted: 0,
                        regionId: 0,
                        gender: 0,
                        birthDate: 0,
                        password: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0
                    }
                }
            }

            const $pipeline = [
                $skip,
                $limit,
                $match,
                $lookupUser,
                $unwindUser,
                $sort,
                $project
            ]
            return await this.aggregate($pipeline)
        } catch (error) {
            throw error
        }
    }

    public async getResultOneTest(testId) {
        try {
            const $match = {
                $match: {
                    testId: new Types.ObjectId(testId),
                    isDeleted: false
                }
            }
            const $sort = {
                $sort: {
                    trueAnswersCount: -1
                }
            }
            const $pipeline = [
                $match,
                $sort,
            ]
            return await this.aggregate($pipeline)
        } catch (error) {
            throw error
        }
    }

    public async findByUserAndTestIds(ids) {
        try {
            const { userId, testId } = ids;
            const $sort = {
                $sort: {
                    createdAt: -1
                }
            }
            const $match = {
                $match: {
                    userId: new Types.ObjectId(userId),
                    testId: new Types.ObjectId(testId),
                    isDeleted: false
                }
            }
            const $pipeline = [
                $sort,
                $match,
            ]

            return await this.aggregate($pipeline)
        } catch (error) {
            throw error
        }
    }

    public async getRegisteredTestsPaging(data) {
        try {
            const { page, limit, userId } = data;
            const $sort = {
                $sort: {
                    createdAt: -1
                }
            }
            const $match = {
                $match: {
                    userId: new Types.ObjectId(userId),
                    isDeleted: false
                }
            }
            const $skip = {
                $skip: limit * (page - 1)
            }
            const $limit = {
                $limit: limit
            }
            const $project = {
                $project: {
                    isDeleted: 0,
                    __v: 0
                }
            }
            const $pipeline = [
                $sort,
                $match,
                $skip,
                $limit,
                $project
            ]
            const res = await this.aggregate($pipeline)
            if (!res.length) throw QuizResponse.NotFound()

            return res
        } catch (error) {
            throw error
        }
    }

    public async checkStatusByUserId(UserId) {
        try {
            const $sort = {
                $sort: {
                    createdAt: -1
                }
            }
            const $match = {
                $match: {
                    userId: new Types.ObjectId(UserId),
                    status: "started",
                    isDeleted: false
                }
            }
            const $pipeline = [
                $sort,
                $match
            ]
            const res = await this.aggregate($pipeline)
            if (res[0]) throw QuizResponse.HaveStartedTest({ testId: res[0].testId })
            return
        } catch (error) {
            throw error
        }
    }


    public async updateUserScores(id, data, options?: QueryOptions) {
        try {

            return await this.updateOne(id, data, options)
        } catch (error) {
            throw error
        }
    }

    public async checkAnswer(ids) {
        try {
            const { userId, testId, startedAt } = ids
            const $match = {
                $match: {
                    userId: userId,
                    testId: testId,
                    createdAt: { $gte: (startedAt) },
                    isDeleted: false
                }
            }
            const $pipeline = [$match]
            const userAnswers = await setAnswerService.aggregate($pipeline)

            let count = 0
            for (let item of userAnswers) {
                const answerId = item.answerId;

                const question = await questionService.getById(item.questionId)

                for (let answers of question[0].answers) {
                    if (answers.isCorrect == true && answers._id == answerId) {
                        count += 1;
                    }
                }
            }
            const userScore = await quizService.findByUserAndTestIds(ids)
            if (!userScore.length) throw QuizResponse.NotFound()

            const percent = ((count / userScore[0].questionCount) * 100).toFixed(1)

            const id = userScore[0]._id
            return await this.updateUserScores(id, { trueAnswersCount: count, percent: percent })
        } catch (error) {
            throw error
        }
    }
}

export const quizService = new QuizService(quizModel);