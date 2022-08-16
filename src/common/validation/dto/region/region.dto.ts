import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";
import { TranslationDto } from "../translation/translation.dto";
export class RegionDtoGroup extends DtoGroups { }

export class RegionGetDto extends PagingDto { }

export class RegionDto extends BaseDto {
    @IsNotEmptyObject(
        {
            nullable: false
        },
        {
            groups: [RegionDtoGroup.CREATE, RegionDtoGroup.UPDATE]
        }
    )
    @ValidateNested({
        groups: [RegionDtoGroup.CREATE, RegionDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    name: TranslationDto
}