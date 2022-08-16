import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "../../base.model";
import { User } from "../../user/user.model";
import { Question } from "../question/question.model";
import { Test } from "../test.model";


export class SetAnswer extends BaseModel {
    @prop({
        required: true,
        trim: true
    })
    userId: Ref<User>

    @prop({
        required: true
    })
    questionId: Ref<Question>

    @prop({
        default: null
    })
    answerId: string

    @prop({
        required: true
    })
    testId: Ref<Test>
}

export const setAnswerModel = getModelForClass(SetAnswer)