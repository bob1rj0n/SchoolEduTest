import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { CollectionNames } from "../../constants/collections";
import { QuizResponse } from "../../db/models/test/user.answers/quiz.error";
import { Quiz, quizModel, TestStatus } from "../../db/models/test/user.answers/quiz.model";
import { CommonServices } from "../common.service";
import { setAnswerService } from "./answer.service";

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
            const $group = {
                $group: {
                    _id: "$testId",
                    participants: { $sum: 1 },
                    totalPercent: { $sum: "$percent" },
                    maxPercent: { $max: "$percent" }
                }
            }
            const $lookup = {
                $lookup: {
                    from: CollectionNames.TEST,
                    localField: "_id",
                    foreignField: "_id",
                    as: "test"
                }
            }
            const $unwind = {
                $unwind: {
                    path: "$test",
                    preserveNullAndEmptyArrays: true
                }
            }
            const $project = {
                $project: {
                    participants: 1,
                    "avgPercent": { $round: [{ $divide: ["$totalPercent", "$participants"] }, 1] },
                    maxPercent: 1,
                    test: {
                        questionCount: 1
                    }
                }
            }
            const $pipeline = [
                $match,
                $sort,
                $group,
                $lookup,
                $unwind,
                $project,
            ]
            return await this.aggregate($pipeline)
        } catch (error) {
            throw error
        }
    }

    public async findQuizByUserAndTestId(userId, testId) {
        try {
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

            const res = (await this.aggregate($pipeline))[0]
            if (!res) throw QuizResponse.NotFound()

            return res;
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
                    status: TestStatus.STARTED,
                    isDeleted: false
                }
            }
            const $pipeline = [
                $sort,
                $match
            ]
            const res = (await this.aggregate($pipeline))[0]
            if (res) throw QuizResponse.HaveStartedTest({ testId: res.testId })
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

    public async checkAnswer(userId, testId, startedAt) {

        try {
            const $sort = {
                $sort: {
                    createdAt: -1
                }
            }
            const $match = {
                $match: {
                    userId: new Types.ObjectId(userId),
                    testId: new Types.ObjectId(testId),
                    createdAt: { $gte: (startedAt) },
                    isDeleted: false
                }
            }
            const $lookupQuestion = {
                $lookup: {
                    from: CollectionNames.QUESTION,
                    localField: "questionId",
                    foreignField: "_id",
                    as: "question"
                }
            }
            const $unwindQuestion = {
                $unwind: {
                    path: "$question",
                    preserveNullAndEmptyArrays: true
                }
            }


            const $project = {
                $project: {
                    answerId: 1,
                    "trueAnswer": {
                        $filter: {
                            input: "$question.answers",
                            as: "item",
                            cond: {
                                $and: [
                                    { $eq: ["$$item.isCorrect", true] },
                                ]
                            }
                        }
                    }
                }
            }

            const $unwindJavob = {
                $unwind: {
                    path: "$trueAnswer",
                    preserveNullAndEmptyArrays: true
                }
            }
            const $group = {
                $group: {
                    _id: {
                        answer: {
                            $eq: ["$answerId", "$trueAnswer._id"]
                        }
                    },
                    count: { $sum: 1 }
                }
            }
            const $Match = {
                $match: {
                    "_id.answer": true
                }
            }

            const $pipeline = [
                $sort,
                $match,
                $lookupQuestion,
                $unwindQuestion,
                $project,
                $unwindJavob,
                $group,
                $Match
            ]

            let res = (await setAnswerService.aggregate($pipeline))[0]
            if (!res) {
                res = {
                    _id: {
                        answer: true
                    },
                    count: 0
                }
                return res;
            }

            return res;
        } catch (error) {
            throw error;
        }
    }
}

export const quizService = new QuizService(quizModel);