import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../../constants/collections";
import { BaseModel } from "../base.model";
import { Translation } from "../translation/translation.model";

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.CATEGORIES
    }
})

@index(
    {
        name: 1
    },
    {
        unique: true,
        background: true,
        name: "name",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Category extends BaseModel {
    @prop({
        trim: true,
        required: true,
        type: () => Translation
    })
    name: Translation
}

export const categoryModel = getModelForClass(Category)
