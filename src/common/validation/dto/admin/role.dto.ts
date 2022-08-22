import { IsString, IsBoolean, IsOptional } from "class-validator";
import { DtoGroups, BaseDto } from "../../dtoGroups.dto";
import { PagingDto } from "../paging.dto";


export class RoleDtoGroup extends DtoGroups { }

export class RoleGetDto extends PagingDto { }

export class RoleDto extends BaseDto {
  @IsOptional({
    groups: [RoleDtoGroup.UPDATE]
  })
  @IsString({
    groups: [RoleDtoGroup.UPDATE, RoleDtoGroup.CREATE],
  })
  name: string;

  @IsOptional({
    groups: [RoleDtoGroup.UPDATE]
  })
  @IsString({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  description: string

  /** *********************************************** */

  //category
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  category: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  categoryCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  categoryUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  categoryDelete: boolean;


  /** ******************************* */

  // students
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  student: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  studentUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  studentDelete: boolean;


  /** ******************************* */

  //role
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  role: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleDelete: boolean;

  /** ******************************* */

  //employee
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employee: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeDelete: boolean;

  /** ******************************* */

  //news
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  news: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  newsCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  newsUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  newsDelete: boolean;


  /** ******************************* */

  //class
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  class: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  classCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  classUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  classDelete: boolean;

  /** ******************************* */

  //subject
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  subject: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  subjectCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  subjectUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  subjectDelete: boolean;

  /** ******************************* */

  //section
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  section: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  sectionCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  sectionUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  sectionDelete: boolean;


  /** ******************************* */

  //topic
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  topic: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  topicCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  topicUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  topicDelete: boolean;

  /** ******************************* */

  //test
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  test: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  testCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  testUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  testDelete: boolean;


  /** ******************************* */

  //statistics
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  statistics: boolean;

}
