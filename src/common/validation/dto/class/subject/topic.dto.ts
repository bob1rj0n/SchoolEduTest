import { Type } from "class-transformer";
import { IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { pagingSectionHandler } from "../../../../../admin/handler/section.handler";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto";
import { TranslationDto } from "../../translation/translation.dto";

export class TopicDtoGroup extends DtoGroups { }

export class TopicGetDto extends PagingDto { }

export class TopicPagingDto extends PagingDto {
    @IsString({
        groups: [TopicDtoGroup.PAGENATION]
    })
    sectionId: string
}

export class TopicDto extends BaseDto {
    @IsNotEmptyObject(
        {
            nullable: false
        },
        {
            groups: [TopicDtoGroup.CREATE, TopicDtoGroup.UPDATE]
        }
    )
    @ValidateNested({
        groups: [TopicDtoGroup.CREATE, TopicDtoGroup.UPDATE]
    })
    @Type(() => TranslationDto)
    name: TranslationDto

    @IsOptional({
        groups: [TopicDtoGroup.UPDATE]
    })
    @IsString({
        groups: [TopicDtoGroup.CREATE, TopicDtoGroup.UPDATE]
    })
    sectionId: string
}