import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { RoleResponse } from "../../db/models/admin/role/role.error";
import { Role, RoleModel } from "../../db/models/admin/role/role.model";
import { CommonServices } from "../common.service";



class RoleService extends CommonServices<Role>{
    constructor(model: ModelType<Role>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw RoleResponse.AlreadyExists(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }

            const res = await this.findPaging(query, data)
            if (!res.length) throw RoleResponse.NotFound()

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

            const role = await this.aggregate($pipeline)
            return role[0]
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

    public async hasAccess(id, access) {
        try {
            const role = await this.model.findById(id)

            if (!role) throw RoleResponse.NotFound(id)

            if (!role[access]) throw RoleResponse.NotEnoughPermission(id)

        } catch (error) {
            throw error
        }
    }
}

export const roleService = new RoleService(RoleModel)