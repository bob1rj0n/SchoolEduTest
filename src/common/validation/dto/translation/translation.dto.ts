import { IsString } from "class-validator";
import { DtoGroups } from "../../dtoGroups.dto";

export class TranslationDto {
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    uz: string;

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    ru: string;

    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    en: string;
}