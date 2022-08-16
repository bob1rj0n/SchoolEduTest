import { IsMongoId, IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";

export class SetAnswerDtoGroup extends DtoGroups { }



export class SetAnswerDto extends BaseDto {
    @IsOptional({
        groups: [SetAnswerDtoGroup.CREATE, SetAnswerDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [SetAnswerDtoGroup.CREATE, SetAnswerDtoGroup.UPDATE]
    })
    userId: string

    @IsMongoId({
        groups: [SetAnswerDtoGroup.CREATE, SetAnswerDtoGroup.UPDATE]
    })
    questionId: string

    @IsMongoId({
        groups: [SetAnswerDtoGroup.CREATE, SetAnswerDtoGroup.UPDATE]
    })
    answerId: string

    @IsMongoId({
        groups: [SetAnswerDtoGroup.CREATE, SetAnswerDtoGroup.UPDATE]
    })
    testId: string
}