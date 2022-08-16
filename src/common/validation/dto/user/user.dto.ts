import { Transform, Type } from "class-transformer";
import { IsPhoneNumber, IsOptional, IsString, IsEnum, IsDateString } from "class-validator";
import { Gender } from "../../../db/models/user/user.model";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";

export class UserGetDto extends PagingDto { }

export class UserDtoGroup extends DtoGroups { }

export class UserDto extends BaseDto {
    @Transform(({ value }) => value ? '+' + value.replace(/[^0-9]/g, '') : value)
    @IsPhoneNumber(null,
        {
            groups: [
                UserDtoGroup.CREATE,
                UserDtoGroup.UPDATE,
                UserDtoGroup.LOGIN,
                UserDtoGroup.PHONENUMBER
            ]
        }
    )
    @IsOptional({ groups: [UserDtoGroup.UPDATE] })
    phoneNumber: string;

    @IsOptional({
        groups: [UserDtoGroup.UPDATE]
    })
    @IsString({
        groups: [
            UserDtoGroup.CREATE,
            UserDtoGroup.UPDATE
        ]
    })
    firstname: string

    @IsOptional({
        groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE]
    })
    @IsString({
        groups: [
            UserDtoGroup.CREATE,
            UserDtoGroup.UPDATE
        ]
    })
    lastname?: string

    @IsOptional({
        groups: [UserDtoGroup.UPDATE]
    })
    @IsString({
        groups: [
            UserDtoGroup.CREATE,
            UserDtoGroup.UPDATE
        ]
    })
    regionId: string

    @IsOptional({
        groups: [UserDtoGroup.UPDATE]
    })
    @IsEnum(Gender, {
        groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE]
    })
    gender: Gender

    @IsOptional({
        groups: [UserDtoGroup.UPDATE]
    })
    @IsDateString(
        {
            strict: true
        },
        {
            groups: [
                UserDtoGroup.CREATE,
                UserDtoGroup.UPDATE
            ]
        }
    )
    birthDate: Date

    @IsOptional({
        groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE]
    })
    @IsString({
        groups: [
            UserDtoGroup.CREATE,
            UserDtoGroup.UPDATE
        ]
    })
    imgUrl: string
    
    @IsOptional({
        groups: [UserDtoGroup.UPDATE]
    })
    @IsString({
        groups: [
            UserDtoGroup.LOGIN,
            UserDtoGroup.CREATE,
            UserDtoGroup.UPDATE
        ]
    })
    password: string
}