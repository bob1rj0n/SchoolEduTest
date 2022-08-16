import { ModelType } from "@typegoose/typegoose/lib/types"
import { QueryOptions, Types } from "mongoose"
import { UserResponse } from "../../db/models/user/user.error"
import { User, UserModel } from "../../db/models/user/user.model"
import { CommonServices } from "../common.service"

export class UserService extends CommonServices<User>{
    constructor(model: ModelType<User>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (error) {
            if (error.code == 11000) throw UserResponse.AlreadyExists(Object.keys(error.keyPattern))
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
            return await this.aggregate($pipeline)
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

    public async findByPhonNumber(Phonenumber) {
        try {
            const $match = {
                $match: {
                    phoneNumber: Phonenumber,
                    isDeleted: false
                }
            }
            const $pipeline = [
                $match
            ]

            return (await this.aggregate($pipeline))[0]
        } catch (error) {
            throw error
        }
    }
}

export const userService = new UserService(UserModel)