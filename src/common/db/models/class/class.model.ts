import { getModelForClass, index, ModelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../../constants/collections";
import { BaseModel } from "../base.model";

@ModelOptions({
    schemaOptions: { collection: CollectionNames.CLASS }
})

@index(
    {
        name: 1
    },
    {
        unique: true,
        background: true,
        name: "classname",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Class extends BaseModel {
    @prop({
        required: true,
        trim: true
    })
    name: string
}

export const classModel = getModelForClass(Class)