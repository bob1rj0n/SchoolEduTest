import { prop } from "@typegoose/typegoose";

export enum Language {
    UZ = "uz",
    RU = "ru",
    EN = "en"
}

export class Translation {
    @prop({
        required: true,
        trim: true
    })
    uz: string;

    @prop({
        required: true,
        trim: true
    })
    ru: string;

    @prop({
        required: true,
        trim: true
    })
    en: string;
}