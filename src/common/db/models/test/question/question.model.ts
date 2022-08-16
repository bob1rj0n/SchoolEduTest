import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";
import { Section } from "../../class/subject/section/section.model";
import { Topic } from "../../class/subject/section/topic/topic.model";
import { Subject } from "../../class/subject/subject.model";
import { Translation } from "../../translation/translation.model";
import { Test } from "../test.model";
import crypto from 'node:crypto'


@modelOptions({
    schemaOptions: {
        collection: CollectionNames.QUESTION
    }
})

export class Question {
    @prop({ trim: true })
    title?: string

    @prop({ trim: true })
    image?: string
}

export class Answer extends Question {
    @prop({
        default: crypto.randomUUID()
    })
    uuid: string

    @prop({
        default: false
    })
    isCorrect: boolean
}

export class TestQuestion extends BaseModel {
    @prop({
        required: true,
        type: () => Question
    })
    question: Question

    @prop({
        required: true,
        _id: true,
        type: () => [Answer]
    })
    answers: Answer[]

    @prop({
        ref: CollectionNames.SECTIONS,
        required: true,
        type: Types.ObjectId
    })
    subjectId: Ref<Subject>

    @prop({
        ref: CollectionNames.SECTIONS,
        type: Types.ObjectId
    })
    sectionId: Ref<Section>

    @prop({
        ref: CollectionNames.TOPICS,
        type: Types.ObjectId
    })
    topicId: Ref<Topic>

    @prop({
        required: true,
        ref: CollectionNames.TEST,
        type: Types.ObjectId
    })
    testId: Ref<Test>
}

export const QuestionModel = getModelForClass(TestQuestion)