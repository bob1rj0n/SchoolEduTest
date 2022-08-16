import { ModelType } from "@typegoose/typegoose/lib/types"
import { Query, QueryOptions, Types } from "mongoose"
import { TopicResponse } from "../../db/models/class/subject/section/topic/topic.error"
import { Topic, TopicModel } from "../../db/models/class/subject/section/topic/topic.model"
import { CommonServices } from "../common.service"

export class TopicService extends CommonServices<Topic>{
    constructor(model: ModelType<Topic>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (error) {
            if (error.code == 11000) throw TopicResponse.AlreadyExists(Object.keys(error.keyPattern))
            throw error
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }

            const res = await this.findPaging(query, data)
            if (!res.length) throw TopicResponse.NotFound()

            return res
        } catch (error) {
            throw error
        }
    }

    public async getBySectionId(id) {
        try {
            const $match = {
                $match: {
                    sectionId: new Types.ObjectId(id),
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
                $match,
                $project
            ]

            const res = await this.aggregate($pipeline)
            if (!res.length) throw TopicResponse.NotFound()

            return res;
        } catch (error) {
            throw error

        }
    }

    public async findByPaging(data) {
        try {
            const { limit, page, sectionId } = data;
            const $sort = {
                $sort: {
                    createdAt: -1
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
                    sectionId: new Types.ObjectId(sectionId),
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

            const res = await this.aggregate($pipeline)
            if (!res.length) throw TopicResponse.NotFound()

            return res
        } catch (error) {
            throw error
        }
    }

    public async update(id, data, options?: QueryOptions) {
        try {
            return await this.updateOne(id, data)
        } catch (error) {
            throw error
        }
    }

    public async delete(id) {
        try {
            const data = { isDeleted: true }

            return await this.updateOne(id, data)
        } catch (error) {
            throw error
        }
    }
}

export const topicService = new TopicService(TopicModel)