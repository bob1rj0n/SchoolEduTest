import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";
import { Translation } from "../../translation/translation.model";
import { Class } from "../class.model";


@modelOptions({
    schemaOptions: { collection: CollectionNames.SUBJECTS }
})

@index(
    {
        "name.uz": 1
    },
    {
        unique: true,
        background: true,
        name: "subjectname",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Subject extends BaseModel {
    @prop({ trim: true, required: true })
    imgUrl: string

    @prop({ trim: true, required: true, type: () => Translation })
    name: Translation

    @prop({
        required: true,
        ref: CollectionNames.CLASS,
        type: Types.ObjectId
    })
    classId: Ref<Class>
}

export const SubjectModel = getModelForClass(Subject)