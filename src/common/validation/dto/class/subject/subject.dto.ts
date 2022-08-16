import { Transform, Type } from "class-transformer";
import { IsMongoId, IsNotEmptyObject, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";
import { TranslationDto } from "../../translation/translation.dto";


export class SubjectDtoGroup extends DtoGroups { }

export class SubjectGetDto extends PagingDto { }

export class SubjectDto extends BaseDto {
    @IsOptional({
        groups: [SubjectDtoGroup.UPDATE]
    })
    @IsString({
        groups: [SubjectDtoGroup.CREATE, SubjectDtoGroup.UPDATE]
    })
    imgUrl: string

    @IsOptional({
        groups: [SubjectDtoGroup.UPDATE]
    })
    @IsNotEmptyObject(
        {
            nullable: false
        },
        {
            groups: [SubjectDtoGroup.CREATE, SubjectDtoGroup.UPDATE]
        }
    )
    @ValidateNested({
        groups: [SubjectDtoGroup.CREATE, SubjectDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    name: TranslationDto

    @IsOptional({
        groups: [SubjectDtoGroup.UPDATE]
    })
    @IsMongoId({
        groups: [SubjectDtoGroup.CREATE, SubjectDtoGroup.UPDATE]
    })
    classId: string
}