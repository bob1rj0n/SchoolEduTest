import { Type } from "class-transformer";
import { IsMongoId, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";
import { TranslationDto } from "../../translation/translation.dto";

export class SectionDtoGroup extends DtoGroups { }

export class SectionGetDto extends PagingDto { }

export class SectionPagingDto extends PagingDto {
    @IsMongoId({
        groups: [SectionDtoGroup.PAGENATION]
    })
    subjectId: string
}

export class SectionDto extends BaseDto {
    @IsOptional({
        groups: [SectionDtoGroup.UPDATE]
    })
    @IsNotEmptyObject(
        {
            nullable: false
        },
        {
            groups: [SectionDtoGroup.CREATE, SectionDtoGroup.UPDATE]
        }
    )
    @ValidateNested({
        groups: [SectionDtoGroup.CREATE, SectionDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    name: TranslationDto

    @IsOptional({
        groups: [SectionDtoGroup.UPDATE]
    })
    @IsString({
        groups: [SectionDtoGroup.CREATE, SectionDtoGroup.UPDATE]
    })
    subjectId: string
}