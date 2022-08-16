import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constants/collections";
import { BaseModel } from "../../base.model";

@modelOptions({
    schemaOptions: { collection: CollectionNames.ROLE }
})

@index(
    {
        name: 1
    },
    {
        unique: true,
        background: true,
        name: "rolename",
        partialFilterExpression: { isDeleted: { $eq: false } }
    }
)

export class Role extends BaseModel {
    @prop({
        trim: true,
        required: true
    })
    name: string

    @prop({ trim: true })
    description: string


    /* ************************ */

    //teachers
    @prop({ default: false })
    teacher: boolean

    @prop({
        default: false
    })
    teacherCreate: boolean

    @prop({
        default: false
    })
    teacherUpdate: boolean

    @prop({
        default: false
    })
    teacherDelete: boolean

    /* ******************* */

    //roles
    @prop({ default: false })
    role: boolean

    @prop({
        default: false
    })
    roleCreate: boolean

    @prop({
        default: false
    })
    roleUpdate: boolean

    @prop({
        default: false
    })
    roleDelete: boolean

    /* ********************** */

    //students

    @prop({ default: false })
    student: boolean

    @prop({
        default: false
    })
    studentUpdate: boolean

    @prop({
        default: false
    })
    studentDelete: boolean

    /* ********************** */

    //employee

    @prop({ default: false })
    employee: boolean

    @prop({
        default: false
    })
    employeeCreate: boolean

    @prop({
        default: false
    })
    employeeUpdate: boolean

    @prop({
        default: false
    })
    employeeDelete: boolean

    /* ********************** */

    //category

    @prop({ default: false })
    category: boolean

    @prop({
        default: false
    })
    categoryCreate: boolean

    @prop({
        default: false
    })
    categoryUpdate: boolean

    @prop({
        default: false
    })
    categoryDelete: boolean

    /* ********************** */

    //news

    @prop({ default: false })
    news: boolean

    @prop({
        default: false
    })
    newsCreate: boolean

    @prop({
        default: false
    })
    newsUpdate: boolean

    @prop({
        default: false
    })
    newsDelete: boolean

    /* ********************** */

    //class

    @prop({ default: false })
    class: boolean

    @prop({
        default: false
    })
    classCreate: boolean

    @prop({
        default: false
    })
    classUpdate: boolean

    @prop({
        default: false
    })
    classDelete: boolean

    /* ********************** */

    //subject

    @prop({ default: false })
    subject: boolean

    @prop({
        default: false
    })
    subjectCreate: boolean

    @prop({
        default: false
    })
    subjectUpdate: boolean

    @prop({
        default: false
    })
    subjectDelete: boolean

    /* ********************** */

    //section

    @prop({ default: false })
    section: boolean

    @prop({
        default: false
    })
    sectionCreate: boolean

    @prop({
        default: false
    })
    sectionUpdate: boolean

    @prop({
        default: false
    })
    sectionDelete: boolean

    /* ********************** */

    //topic

    @prop({ default: false })
    topic: boolean

    @prop({
        default: false
    })
    topicCreate: boolean

    @prop({
        default: false
    })
    topicUpdate: boolean

    @prop({
        default: false
    })
    topicDelete: boolean

    /* ********************** */

    //test

    @prop({ default: false })
    test: boolean

    @prop({
        default: false
    })
    testCreate: boolean

    @prop({
        default: false
    })
    testUpdate: boolean

    @prop({
        default: false
    })
    testDelete: boolean

}

export const RoleModel = getModelForClass(Role)