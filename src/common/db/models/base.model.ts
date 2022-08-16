import { index, modelOptions, prop } from "@typegoose/typegoose";


@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

@index(
    {
        isDeleted: 1
    },
    {
        background: true,
        name: "isDeleted",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class BaseModel {
    @prop({ default: false })
    isDeleted: boolean

    createdAt?: Date;
    updatedAt: Date;

}