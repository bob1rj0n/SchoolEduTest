import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsMongoId, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";
import { TranslationDto } from "../translation/translation.dto";

export class QuestionDtoGroup extends DtoGroups { }

export class QuestionGetDto extends PagingDto { }

export class QuestionPagingDto extends PagingDto {
    @IsMongoId({
        groups: [QuestionDtoGroup.PAGENATION]
    })
    testId: string
}

export class Question {
    @IsOptional({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    @IsString({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    title?: string

    @IsOptional({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    @IsString({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    image?: string;
}

export class AnswerDto extends Question {
    @IsBoolean({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    isCorrect: boolean
}

export class QuestionDto extends BaseDto {
    @IsNotEmptyObject(
        {
            nullable: false
        },
        {
            groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
        }
    )
    @ValidateNested({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    @Type(() => Question)
    question: Question;

    @IsArray({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    @ArrayMinSize(1, {
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    @IsNotEmptyObject(
        {
            nullable: false
        },
        {
            groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE],
            each: true
        }
    )
    @ValidateNested({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE],
        each: true
    })
    @Type(() => AnswerDto)
    answers: AnswerDto[]

    @IsOptional({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    subjectId: string;

    @IsOptional({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    sectionId: string;

    @IsOptional({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    topicId: string;

    @IsMongoId({
        groups: [QuestionDtoGroup.CREATE, QuestionDtoGroup.UPDATE]
    })
    testId: string;

}