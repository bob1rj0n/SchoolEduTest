import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsMongoId, IsNotEmptyObject, IsNumber, IsOptional, IsString, IsUrl, ValidateIf, ValidateNested } from "class-validator";
import { ContentType, Alignment, ListIndicator } from "../../../db/models/news/news.model";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";
import { TranslationDto } from "../translation/translation.dto";

export class NewsDtoGroup extends DtoGroups { }

export class NewsGetDto extends PagingDto { }

//validate data
class ContentDataDto {
    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    newLine: boolean;

    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsEnum(ContentType, {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    type: ContentType;

    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    bold: boolean;

    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    underline: boolean;


    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    italic: boolean;

    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    strikethrough: boolean;


    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsString({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    value: string;

    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2
    }, {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    size: number;

    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsEnum(Alignment, {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    align: Alignment;

    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    sup: boolean;

    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @ValidateIf((data) => [ContentType.TEXT, ContentType.LINK].includes(data.type), {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsBoolean({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    sub: boolean;


    @ValidateIf((data) => data.type == ContentType.LIST, {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @ValidateNested({
        each: true,
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsArray({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @ArrayMinSize(1, {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @Type(() => ContentDataDto)
    items: ContentDataDto[];

    @ValidateIf((data) => data.type == ContentType.LINK, {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsUrl({}, {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    href: string;

    @ValidateIf((data) => data.type == ContentType.LIST, {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsEnum(ListIndicator, {
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    listIndicator: ListIndicator;
}

class ContentDto {
    @ValidateNested({
        each: true,
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsArray({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @Type(() => ContentDataDto)
    uz: ContentDataDto;

    @ValidateNested({
        each: true,
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsArray({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @Type(() => ContentDataDto)
    ru: ContentDataDto;

    @ValidateNested({
        each: true,
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsNotEmptyObject({
        nullable: false
    }, {
        each: true,
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @Type(() => ContentDataDto)
    en: ContentDataDto;
}

/* ***************************************************** */

//model

export class NewsDto extends BaseDto {
    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsString({
        groups: [
            NewsDtoGroup.CREATE,
            NewsDtoGroup.UPDATE
        ]
    })
    imgUrl: string

    @IsOptional({
        groups: [NewsDtoGroup.UPDATE]
    })
    @IsString({
        groups: [
            NewsDtoGroup.CREATE,
            NewsDtoGroup.UPDATE
        ]
    })
    categoryId: string

    @IsOptional({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @IsString({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    tags: string

    @IsOptional({
        groups: [NewsDtoGroup.UPDATE]
    })
    @IsNotEmptyObject(
        {
            nullable: false
        },
        {
            groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
        }
    )
    @ValidateNested({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    title: TranslationDto

    @IsOptional({
        groups: [NewsDtoGroup.UPDATE]
    })
    @IsNotEmptyObject(
        {
            nullable: false
        },
        {
            groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
        }
    )
    @ValidateNested({
        groups: [NewsDtoGroup.CREATE, NewsDtoGroup.UPDATE]
    })
    @Type(() => ContentDto)
    content: ContentDto
}

