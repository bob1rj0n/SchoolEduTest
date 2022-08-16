import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";
import { User } from "../../user/user.model";
import { Question } from "../question/question.model";
import { Test } from "../test.model";

export enum TestStatus {
    PENDING = "pending",
    STARTED = "started",
    FINISHED = "finished"
}
@modelOptions({
    schemaOptions: { collection: CollectionNames.SCORES }
})

export class Quiz extends BaseModel {
    @prop({
        ref: CollectionNames.USER,
        type: Types.ObjectId
    })
    userId: Ref<User>

    @prop({
        ref: CollectionNames.TEST,
        type: Types.ObjectId
    })
    testId: Ref<Test>

    @prop({
        default: undefined
    })
    startedAt: Date;

    @prop({
        default: undefined
    })
    finishedAt: Date

    @prop({})
    questionCount: number

    @prop({
        default: 0
    })
    trueAnswersCount: number

    @prop({ default: 0 })
    percent: number

    @prop({
        default: TestStatus.PENDING,
        type: String,
        enum: TestStatus
    })
    status: TestStatus
}

export const quizModel = getModelForClass(Quiz);