import { IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";

export class ClassDtoGroup extends DtoGroups { }

export class ClassGetDto extends PagingDto { }

export class ClassDto extends BaseDto {
    @IsString({
        groups: [ClassDtoGroup.CREATE, ClassDtoGroup.UPDATE]
    })
    name: string
}