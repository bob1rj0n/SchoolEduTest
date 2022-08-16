import { Transform } from "class-transformer";
import { IsOptional, IsMongoId, IsString, IsPhoneNumber, MinLength } from "class-validator";
import { DtoGroups, BaseDto } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";


export class EmployeeDtoGroups extends DtoGroups { }

export class EmployeeGetDto extends PagingDto { }

export class EmployeeDto extends BaseDto {
    @IsOptional({
        groups: [EmployeeDtoGroups.CREATE, EmployeeDtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            EmployeeDtoGroups.CREATE,
            EmployeeDtoGroups.UPDATE
        ]
    })
    firstname: string;

    @IsOptional({
        groups: [EmployeeDtoGroups.CREATE, EmployeeDtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            EmployeeDtoGroups.CREATE,
            EmployeeDtoGroups.UPDATE
        ]
    })
    lastname: string;

    @Transform(({ value }) => value ? '+' + value.replace(/[^0-9]/g, '') : value)
    @IsPhoneNumber(null, { groups: [EmployeeDtoGroups.CREATE, EmployeeDtoGroups.UPDATE, EmployeeDtoGroups.LOGIN, EmployeeDtoGroups.PHONENUMBER] })
    @IsOptional({ groups: [EmployeeDtoGroups.UPDATE] })
    phoneNumber: string;

    @IsOptional({
        groups: [EmployeeDtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            EmployeeDtoGroups.CREATE,
            EmployeeDtoGroups.UPDATE,
            EmployeeDtoGroups.LOGIN
        ]
    })
    @MinLength(4, {
        groups: [
            EmployeeDtoGroups.CREATE,
            EmployeeDtoGroups.UPDATE,
            EmployeeDtoGroups.LOGIN
        ]
    })
    password: string;

    @IsOptional({ groups: [EmployeeDtoGroups.UPDATE] })
    @IsMongoId({
        groups: [EmployeeDtoGroups.CREATE, EmployeeDtoGroups.UPDATE]
    })
    roleId: string;

}