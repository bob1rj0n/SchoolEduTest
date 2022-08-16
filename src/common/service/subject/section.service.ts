import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { SectionResponse } from "../../db/models/class/subject/section/section.error";
import { Section, SectionModel } from "../../db/models/class/subject/section/section.model";
import { CommonServices } from "../common.service";

export class SectionService extends CommonServices<Section>{
    constructor(model: ModelType<Section>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (error) {
            if (error.code == 11000) throw SectionResponse.AlreadyExists(Object.keys(error.keyPattern))
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
            if (!res.length) throw SectionResponse.NotFound()
            return res[0]
        } catch (error) {
            throw error
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }

            const res = await this.findPaging(query, data)
            if (!res.length) throw SectionResponse.NotFound()

            return res
        } catch (error) {
            throw error
        }
    }

    public async findByPaging(data) {
        try {
            const { limit, page, subjectId } = data;
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
                    subjectId: new Types.ObjectId(subjectId),
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
            if (!res.length) throw SectionResponse.NotFound()

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
export const sectionService = new SectionService(SectionModel)