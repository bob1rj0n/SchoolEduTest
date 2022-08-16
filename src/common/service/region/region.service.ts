import { BeAnObject, IObjectWithTypegooseFunction, ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Document, Types } from "mongoose";
import { RegionResponse } from "../../db/models/region/region.error";
import { Region, RegionModel } from "../../db/models/region/region.mode";
import { CommonServices } from "../common.service";


export class RegionService extends CommonServices<Region>{
    constructor(model: ModelType<Region>) {
        super(model)
    }

    public async create(data) {
        try {
            return await super.create(data)
        } catch (error) {
            if (error.code == 11000) throw RegionResponse.AlreadyExists(Object.keys(error.keyPattern))
            throw error
        }
    }

    public async getPaging(data) {
        try {
            const query = { isDeleted: false }

            const res = await this.findPaging(query, data)
            if (!res.length) throw RegionResponse.NotFound()

            return res
        } catch (error) {
            throw error
        }
    }
}

export const regionService = new RegionService(RegionModel)