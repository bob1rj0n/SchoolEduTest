import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../constants/collections";
import { BaseModel } from "../base.model";
import { Section } from "../class/subject/section/section.model";
import { Topic } from "../class/subject/section/topic/topic.model";
import { Subject } from "../class/subject/subject.model";
import { Language } from "../translation/translation.model";


export class TestSubjects {
    @prop({
        ref: CollectionNames.SUBJECTS,
        required: true,
        type: Types.ObjectId
    })
    subjectId: Ref<Subject>

    @prop({
        ref: CollectionNames.SECTIONS,
        default: undefined,
        type: Types.ObjectId
    })
    sectionId: Ref<Section>

    @prop({
        ref: CollectionNames.TOPICS,
        default: undefined,
        type: Types.ObjectId
    })
    topicId: Ref<Topic>
}

@modelOptions({
    schemaOptions: { collection: CollectionNames.TEST }
})
@index(
    {
        name: 1
    },
    {
        unique: true,
        background: true,
        name: "testname",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Test extends BaseModel {
    @prop({
        required: true,
        trim: true
    })
    name: string

    @prop({
        enum: Language,
        type: String,
        default: Language.UZ
    })
    language: Language

    @prop({
        default: 0
    })
    questionCount: number

    @prop({
        type: () => [TestSubjects],
        required: true
    })
    subjects: TestSubjects[]

    @prop({
        required: true
    })
    duration: number
}

export const TestModel = getModelForClass(Test)