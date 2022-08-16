import { Transform } from "class-transformer";
import { IsDateString, IsEnum, IsMongoId, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { TestStatus } from "../../../db/models/test/user.answers/quiz.model";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";

export class QuizDtoGroup extends DtoGroups {
    static START = "start";
    static END = "end";
    static CHECK_ASNWER = "checkanswer";
    static STATISTICS = "statistics";
}

export class QuizGetDto extends PagingDto { }

export class QuizPagingDto extends PagingDto {
    @IsOptional({
        groups: [QuizDtoGroup.PAGENATION]
    })
    @IsMongoId({
        groups: [QuizDtoGroup.PAGENATION]
    })
    userId: string

    @IsOptional({
        groups: [QuizDtoGroup.PAGENATION]
    })
    @IsMongoId({
        groups: [QuizDtoGroup.PAGENATION]
    })
    testId: string
}

export class QuizDto extends BaseDto {
    @IsMongoId({
        groups: [QuizDtoGroup.REGISTER, QuizDtoGroup.START, QuizDtoGroup.CHECK_ASNWER]
    })
    userId: string

    @IsMongoId({
        groups: [QuizDtoGroup.REGISTER, QuizDtoGroup.STATISTICS, QuizDtoGroup.CHECK_ASNWER]
    })
    testId: string

    @IsOptional({
        groups: [QuizDtoGroup.START, QuizDtoGroup.END],
    })
    @IsDateString(
        {
            strict: false,
        },
        {
            groups: [QuizDtoGroup.START],
        },
    )
    startedAt: Date

    @IsOptional({
        groups: [QuizDtoGroup.START, QuizDtoGroup.END],
    })
    @IsDateString(
        {
            strict: false,
        },
        {
            groups: [QuizDtoGroup.END],
        },
    )
    finishedAt: Date

    @IsOptional({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    @Transform(({ value }) => Number(value))
    @IsNumber(
        {
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 0,
        },
        {
            groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE],
        },
    )
    @IsPositive({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    questionCount: number

    @IsOptional({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    @Transform(({ value }) => Number(value))
    @IsNumber(
        {
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 0,
        },
        {
            groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE],
        },
    )
    @IsPositive({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    trueAnswersCount: number

    @IsOptional({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    @Transform(({ value }) => Number(value))
    @IsNumber(
        {
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 0,
        },
        {
            groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE],
        },
    )
    @IsPositive({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    percent: number

    @IsOptional({
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    @IsEnum(TestStatus, {
        groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
    })
    status: TestStatus
}