import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsDateString, IsEnum, IsMongoId, IsNotEmptyObject, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { Language } from "../../../db/models/translation/translation.model"
import { BaseDto, DtoGroups } from "../../dtoGroups.dto"
import { PagingDto } from "../paging.dto"

export class TestDtoGroup extends DtoGroups { }

export class TestPagingDto extends PagingDto {
    @IsMongoId({
        groups: [DtoGroups.PAGENATION]
    })
    subjectId: string
}


export class TestSubjectsDto {
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    subjectId: string

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    sectionId?: string

    @IsOptional({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    topicId?: string
}

export class TestDto extends BaseDto {
    @IsOptional({
        groups: [TestDtoGroup.UPDATE]
    })
    @IsString({
        groups: [TestDtoGroup.CREATE, TestDtoGroup.UPDATE]
    })
    name: string

    @IsOptional({
        groups: [TestDtoGroup.UPDATE]
    })
    @IsEnum(Language, {
        groups: [TestDtoGroup.CREATE, TestDtoGroup.UPDATE]
    })
    language: Language

    @IsOptional({
        groups: [TestDtoGroup.CREATE, TestDtoGroup.UPDATE]
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        groups: [TestDtoGroup.CREATE, TestDtoGroup.UPDATE]
    })
    questionCount: number

    @IsOptional({
        groups: [TestDtoGroup.UPDATE]
    })
    @IsArray({
        groups: [TestDtoGroup.CREATE, TestDtoGroup.UPDATE]
    })
    @ValidateNested({
        groups: [TestDtoGroup.CREATE, TestDtoGroup.UPDATE],
        each: true
    })
    @ArrayMinSize(1, {
        groups: [TestDtoGroup.CREATE, TestDtoGroup.UPDATE]
    })
    @Type(() => TestSubjectsDto)
    subjects: TestSubjectsDto;

    @IsOptional({
        groups: [TestDtoGroup.UPDATE]
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        groups: [TestDtoGroup.CREATE, TestDtoGroup.UPDATE]
    })
    duration: number
}

