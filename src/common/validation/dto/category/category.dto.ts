import { Type } from "class-transformer";
import { IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";
import { TranslationDto } from "../translation/translation.dto";

export class CategoryDtoGroup extends DtoGroups { }

export class CategoryGetDto extends PagingDto { }

export class CategoryDto extends BaseDto {
    @IsNotEmptyObject({
        nullable: false
    }, {
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @ValidateNested({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @Type(() => TranslationDto)
    name: TranslationDto
}
