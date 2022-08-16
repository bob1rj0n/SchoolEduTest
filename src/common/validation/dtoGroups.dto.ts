import { IsMongoId, IsOptional } from "class-validator";

export class DtoGroups {

  static CREATE = "create";
  static GET = "get";
  static UPDATE = "update";
  static DELETE = "delete";
  static LOGIN = "login";
  static REGISTER = "register";
  static VERIFY = "verify";
  static GET_BY_ID = "getById";
  static PAGENATION = "pagination";
  static PHONENUMBER = "phonenumber"
}

export class BaseDto {
  @IsOptional({ groups: [DtoGroups.PAGENATION, DtoGroups.UPDATE] })
  @IsMongoId({
    groups: [
      DtoGroups.UPDATE,
      DtoGroups.DELETE,
      DtoGroups.GET_BY_ID,
      DtoGroups.PAGENATION,
    ],
  })
  _id?: string;

  isDeleted?: boolean;
}

