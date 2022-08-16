import { BeAnObject, DocumentType, ModelType } from "@typegoose/typegoose/lib/types"
import { QueryOptions, MergeType, Types } from "mongoose"
import { CollectionNames } from "../../constants/collections"
import { CategoryResponse } from "../../db/models/category/category.error"
import { Category, categoryModel } from "../../db/models/category/category.model"
import { CommonServices } from "../common.service"


export class CategoryService extends CommonServices<Category> {
    constructor(model: ModelType<Category>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw CategoryResponse.AlreadyExists(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }

            const res = await this.findPaging(query, data)
            if (!res.length) throw CategoryResponse.NotFound()

            return res
        } catch (error) {
            throw error
        }
    }
}

export const categoryService = new CategoryService(categoryModel)