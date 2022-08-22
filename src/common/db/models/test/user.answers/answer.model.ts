import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";
import { User } from "../../user/user.model";
import { Question } from "../question/question.model";
import { Test } from "../test.model";

@modelOptions({
    schemaOptions: { collection: CollectionNames.ANSWER }
})

export class SetAnswer extends BaseModel {
    @prop({
        required: true,
        type: Types.ObjectId,
        ref: CollectionNames.USER
    })
    userId: Ref<User>

    @prop({
        required: true,
        ref: CollectionNames.QUESTION,
        type: Types.ObjectId
    })
    questionId: Ref<Question>

    @prop({
        default: null,
        type: Types.ObjectId
    })
    answerId: string

    @prop({
        required: true,
        ref: CollectionNames.TEST,
        type: Types.ObjectId
    })
    testId: Ref<Test>
}

export const setAnswerModel = getModelForClass(SetAnswer);