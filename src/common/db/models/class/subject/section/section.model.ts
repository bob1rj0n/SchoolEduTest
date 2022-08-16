import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../../constants/collections";
import { BaseModel } from "../../../base.model";
import { Translation } from "../../../translation/translation.model";
import { Subject } from "../subject.model";


@modelOptions({
    schemaOptions: { collection: CollectionNames.SECTIONS }
})
@index(
    {
        "name.uz": 1,
    },
    {
        unique: true,
        background: true,
        name: "sectionname",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Section extends BaseModel {
    @prop({
        required: true,
        trim: true,
        type: () => Translation
    })
    name: Translation

    @prop({
        ref: CollectionNames.SUBJECTS,
        required: true,
        type: Types.ObjectId
    })
    subjectId: Ref<Subject>
}

export const SectionModel = getModelForClass(Section)