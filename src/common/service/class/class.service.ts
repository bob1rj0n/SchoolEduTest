import { ModelType } from "@typegoose/typegoose/lib/types";
import { ClassResponse } from "../../db/models/class/class.error";
import { Class, classModel } from "../../db/models/class/class.model";
import { CommonServices } from "../common.service";

export class ClassService extends CommonServices<Class>{
    constructor(model: ModelType<Class>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        }
        catch (e) {
            if (e.code == 11000) throw ClassResponse.AlreadyExists(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }
            return await this.findPaging(query, data)
        } catch (error) {
            throw error
        }
    }
}

export const classService = new ClassService(classModel);