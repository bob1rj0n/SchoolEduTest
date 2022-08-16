import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../constants/collections";
import { BaseModel } from "../base.model";
import { Region } from "../region/region.mode";

export enum Gender {
    MALE = "male",
    FEMALE = "female",
}

@modelOptions({
    schemaOptions: {
        collection: CollectionNames.USER
    }
})
@index(
    {
        phoneNumber: 1
    },
    {
        unique: true,
        background: true,
        name: "phonenumber",
        partialFilterExpression: {
            isDeleted: { $eq: false }
        }
    }
)

export class User extends BaseModel {
    @prop({
        required: true,
        trim: true
    })
    phoneNumber: string

    @prop({
        required: true,
        trim: true
    })
    firstname: string

    @prop({
        trim: true,
        default: undefined
    })
    lastname?: string

    @prop({
        required: true,
        ref: CollectionNames.REGIONS,
        type: Types.ObjectId
    })
    regionId: Ref<Region>

    @prop({
        enum: Gender,
        required: true,
        default: Gender.MALE,
        type: String
    })
    gender: Gender

    @prop({
        required: true
    })
    birthDate: Date

    @prop({
        trim: true,
        default: undefined
    })
    imgUrl: string

    @prop({
        required: true,
        trim: true
    })
    password: string
}

export const UserModel = getModelForClass(User)