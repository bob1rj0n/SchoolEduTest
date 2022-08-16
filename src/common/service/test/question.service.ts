import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { QuestionResponse } from "../../db/models/test/question/question.error";
import { Question, QuestionModel } from "../../db/models/test/question/question.model";
import { CommonServices } from "../common.service";


export class QuestionService extends CommonServices<Question>{
    constructor(model: ModelType<Question>) {
        super(model)
    }

    public async create(data, options?: QueryOptions) {
        try {
            return await super.create(data)
        } catch (e) {
            throw e
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }

            const res = await this.findPaging(query, data)
            if (!res.length) throw QuestionResponse.NotFound()

            return res
        } catch (error) {
            throw error
        }
    }

    public async getById(id) {
        try {
            const $match = {
                $match: {
                    _id: new Types.ObjectId(id),
                    isDeleted: false
                }
            }

            const $pipeline = [
                $match
            ]

            return await this.aggregate($pipeline)
        } catch (error) {
            throw error
        }
    }

    public async getByTestIdPaging(data) {
        try {
            const { page, limit, testId } = data
            const $sort = {
                $sort: {
                    createdAt: 1
                }
            }
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

            return this.aggregate($pipeline)
        } catch (error) {
            throw error
        }
    }

    public async update(id, data, options?: QueryOptions) {
        try {
            return await this.updateOne(id, data)
        } catch (e) {
            throw e
        }
    }

    public async delete(id, options?: QueryOptions) {
        try {
            const data = { isDeleted: true }

            return await this.updateOne(id, data)
        } catch (error) {
            throw error
        }
    }
}

export const questionService = new QuestionService(QuestionModel);