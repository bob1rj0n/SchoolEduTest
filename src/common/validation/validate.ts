import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BaseResponse } from '../reporter/base.response';

export const validateIt = async <T>(data, classType: ClassConstructor<T>, groups: any): Promise<T> => {
  if (!data) {
    throw BaseResponse.ValidationError('Request body should be object');
  }

  const classData = plainToClass(classType, data as T, {
    excludeExtraneousValues: false,
    enableCircularCheck: true
  });

  const errors = await validate(classData as any, { groups, whitelist: true });

  if (!errors || errors.length === 0) return classData;

  throw BaseResponse.ValidationError(errors);
};


const convertError = (errors?: ValidationError[]) => {
  if (!errors || errors.length == 0) return [];

  return errors.map((item) => {
    return {
      constraints: convertConstraints(item.constraints),
      contexts: convertConstraints(item.contexts),
      property: item.property,
      children: convertError(item.children),
    };
  });
};

const convertConstraints = (data) => {
  if (!data) return [];
  return Object.keys(data).map((key) => {
    return {
      key: key,
      value: data[key],
    };
  });
};