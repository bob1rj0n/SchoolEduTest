import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { SubjectResponse } from "../../db/models/class/subject/sebject.error";
import { Subject, SubjectModel } from "../../db/models/class/subject/subject.model";
import { CommonServices } from "../common.service";

export class SubjectService extends CommonServices<Subject>{
    constructor(model: ModelType<Subject>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw SubjectResponse.AlreadyExists(Object.keys(e.keyPattern))
            throw e
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

            return res[0]
        } catch (error) {
            throw error
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }

            const res = await this.findPaging(query, data)
            if (!res.length) throw SubjectResponse.NotFound()

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

export const subjectService = new SubjectService(SubjectModel)