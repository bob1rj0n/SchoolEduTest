import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { CollectionNames } from "../../constants/collections";
import { NewsResponse } from "../../db/models/news/news.error";
import { News, newsModel } from "../../db/models/news/news.model";
import { CommonServices } from "../common.service";



export class NewsService extends CommonServices<News>{
    constructor(model: ModelType<News>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
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
            const $lookupRole = [
                {
                    $lookup: {
                        from: CollectionNames.CATEGORIES,
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "category"
                    }
                }
            ]
            const $project = {
                $project: {
                    isDeleted: 0,
                    __v: 0,
                    categoryId: 0,
                    category: {
                        isDeleted: 0,
                        __v: 0
                    },
                    type: {
                        isDeleted: 0,
                        __v: 0
                    }
                }
            }

            const $pipeline = [
                $match,
                ...$lookupRole,
                $project,
            ]

            const result = await this.aggregate($pipeline)

            return result[0]
        } catch (error) {
            throw error
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }

            const res = await this.findPaging(query, data)
            if (!res.length) throw NewsResponse.NotFound()

            return res
        } catch (error) {
            throw error
        }
    }

    public async update(id, data, options?: QueryOptions) {
        try {
            return await this.updateOne(id, data, options)
        } catch (error) {
            throw error
        }
    }

    public async getByCategoryId(id) {
        try {
            const $match = {
                $match: {
                    categoryId: new Types.ObjectId(id),
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

            return await this.aggregate($pipeline)
        } catch (error) {
            throw error
        }
    }
}

export const newsService = new NewsService(newsModel)