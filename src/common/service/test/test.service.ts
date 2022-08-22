import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { TestResponse } from "../../db/models/test/test.error";
import { Test, TestModel } from "../../db/models/test/test.model";
import { CommonServices } from "../common.service";


export class TestService extends CommonServices<Test>{
    constructor(model: ModelType<Test>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (error) {
            if (error.code == 11000) throw TestResponse.AlreadyExists(Object.keys(error.keyPattern))
            throw error
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }

            const res = await this.findPaging(query, data)
            if (!res.length) throw TestResponse.NotFound()

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

            const test = (await this.aggregate($pipeline))[0]
            if (!test) throw TestResponse.NotFound(id)

            return test;
        } catch (error) {
            throw error
        }
    }

    public async getBySubjectIdPaging(data) {
        try {
            const { page, limit, subjectId } = data;

            const $skip = {
                $skip: limit * (page - 1)
            }
            const $limit = {
                $limit: limit
            }
            const $match = {
                $match: {
                    "subjects.subjectId": new Types.ObjectId(subjectId),
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
                $skip,
                $limit,
                $project
            ]

            const tests = await this.aggregate($pipeline)
            if (!tests.length) throw TestResponse.NotFound()

            return tests;
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

    public async delete(id) {
        try {
            const data = { isDeleted: true }

            return await this.updateOne(id, data)
        } catch (error) {
            throw error
        }
    }
}

export const testService = new TestService(TestModel)