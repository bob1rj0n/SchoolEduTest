import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../../constants/collections";
import { BaseModel } from "../base.model";
import { Translation } from "../translation/translation.model";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.REGIONS
    }
})

@index(
    {
        "name.uz": 1
    },
    {
        unique: true,
        background: true,
        name: "uz",
        partialFilterExpression: {
            isDeleted: { $eq: false }
        }
    }
)
@index(
    {
        "name.ru": 1
    },
    {
        unique: true,
        background: true,
        name: "ru",
        partialFilterExpression: {
            isDeleted: { $eq: false }
        }
    }
)
@index(
    {
        "name.en": 1
    },
    {
        unique: true,
        background: true,
        name: "en",
        partialFilterExpression: {
            isDeleted: { $eq: false }
        }
    }
)

export class Region extends BaseModel {

    @prop({
        required: true,
        trim: true,
        type: () => Translation
    })
    name: Translation
}

export const RegionModel = getModelForClass(Region)