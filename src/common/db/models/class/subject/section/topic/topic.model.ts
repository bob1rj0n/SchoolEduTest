import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose"
import { Types } from "mongoose"
import { CollectionNames } from "../../../../../../constants/collections"
import { BaseModel } from "../../../../base.model"
import { Translation } from "../../../../translation/translation.model"
import { Section } from "../section.model"

@modelOptions({
    schemaOptions: { collection: CollectionNames.TOPICS }
})
@index(
    {
        "name.uz": 1,
    },
    {
        unique: true,
        background: true,
        name: "topicname",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Topic extends BaseModel {
    @prop({
        required: true,
        trim: true,
        type: () => Translation
    })
    name: Translation

    @prop({
        ref: CollectionNames.SECTIONS,
        required: true,
        type: Types.ObjectId
    })
    sectionId: Ref<Section>
}

export const TopicModel = getModelForClass(Topic)