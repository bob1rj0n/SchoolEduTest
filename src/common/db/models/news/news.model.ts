import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../constants/collections";
import { BaseModel } from "../base.model";
import { Category } from "../category/category.model";
import { Translation } from "../translation/translation.model";


export enum ContentType {
    TEXT = 'text',
    VIDEO = 'video',
    IMAGE = 'img',
    LIST = 'list',
    LINK = 'link'
}
export enum Alignment {
    START = 'left',
    END = 'right',
    CENTER = 'center'
}
export enum ListIndicator {
    DOT = 'dot',
    NUMBER = 'number'
}

interface SelfContaining {
    items: SelfContaining[]
}
class ContentData implements SelfContaining {
    @prop({
        default: undefined
    })
    newLine: boolean;

    @prop({
        default: ContentType.TEXT,
        enum: ContentType,
        type: String
    })
    type: ContentType;

    @prop({
        default: undefined
    })
    bold: boolean;

    @prop({
        default: undefined
    })
    underline: boolean;

    @prop({
        default: undefined
    })
    italic: boolean;

    @prop({
        default: undefined
    })
    strikethrough: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    value: string;

    @prop({
        default: 14
    })
    size: number;

    @prop({
        enum: Alignment,
        type: String
    })
    align: Alignment;

    @prop({
        default: undefined
    })
    sup: boolean;

    @prop({
        default: undefined
    })
    sub: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    href: string;

    @prop({
        default: undefined
    })
    items: any[];

    @prop({
        default: undefined,
        type: String,
        enum: ListIndicator
    })
    listIndicator: ListIndicator
}

class Content {
    @prop({
        required: true,
        type: () => [ContentData]
    })
    uz: ContentData[];

    @prop({
        required: true,
        type: () => [ContentData]
    })
    ru: ContentData[];

    @prop({
        required: true,
        type: () => [ContentData]
    })
    en: ContentData[];
}


/******************************************/

////model

export class News extends BaseModel {
    @prop({ trim: true, default: null })
    imgUrl?: string

    @prop({
        ref: CollectionNames.CATEGORIES,
        type: Types.ObjectId,
        required: true
    })
    categoryId: Ref<Category>

    @prop({
        default: undefined,
        trim: true
    })
    tags: string

    @prop({
        trim: true,
        required: true,
        type: () => Translation
    })
    title: Translation

    @prop({
        required: true,
        type: () => Content
    })
    content: Content
}

export const newsModel = getModelForClass(News)