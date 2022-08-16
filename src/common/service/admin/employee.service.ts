import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { CollectionNames } from "../../constants/collections";
import { EmployeeResponse } from "../../db/models/admin/employee/employee.error";
import { Employee, EmployeeModel } from "../../db/models/admin/employee/employee.model";
import { EmployeeDto, EmployeeGetDto } from "../../validation/dto/admin/employee.dto";
import { CommonServices } from "../common.service";



class EmployeeService extends CommonServices<Employee>{
    constructor(model: ModelType<Employee>) {
        super(model)
    }

    public async create(data: EmployeeDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw EmployeeResponse.AlreadyExists(Object.keys(e.keyPattern))
            throw e
        }
    }

    public async getPaging(data: EmployeeGetDto) {
        try {
            const query: any = { isDeleted: false }

            const $lookupRole = {
                $lookup: {
                    from: CollectionNames.ROLE,
                    localField: "roleId",
                    foreignField: "_id",
                    as: "role"
                }
            }
            const $unwindRole = {
                $unwind: {
                    path: "$role"
                }
            }
            const $project = {
                $project: {
                    _id: 1,
                    firstname: 1,
                    lastname: 1,
                    phoneNumber: 1,
                    password: 1,
                    role: {
                        _id: 1,
                        name: 1,
                        description: 1
                    }
                }
            }

            const $pipeline = [
                $lookupRole,
                $unwindRole,
                $project
            ]

            const emp = await this.findPaging(query, data, $pipeline)
            if (!emp.length) throw EmployeeResponse.NotFound()
            return emp
        } catch (error) {
            throw error
        }
    }

    public async getById(id) {
        try {
            const $match = {
                $match: {
                    _id: new Types.ObjectId(id),
                    isDeleted: false
                }
            }
            const $lookupRole = {
                $lookup: {
                    from: CollectionNames.ROLE,
                    localField: "roleId",
                    foreignField: "_id",
                    as: "role"
                }
            }
            const $unwindRole = {
                $unwind: {
                    path: "$role",
                    preserveNullAndEmptyArrays: true
                }
            }
            const $project = {
                $project: {
                    _id: 1,
                    firstname: 1,
                    lastname: 1,
                    phoneNumber: 1,
                    password: 1,
                    role: {
                        _id: 1,
                        name: 1,
                        description: 1
                    }
                }
            }

            const $pipeline = [
                $match,
                $lookupRole,
                $unwindRole,
                $project
            ]

            const employee = await this.aggregate($pipeline)
            console.log(employee)
            if (!employee[0]) throw EmployeeResponse.NotFound(id)
            
            return employee[0]
        } catch (error) {
            throw error
        }
    }

    public async findAdminById(id) {
        try {
            const admin = await this.model.findById(id)
            if (!admin) throw EmployeeResponse.NotFound(id)
            return admin
        } catch (error) {
            throw error
        }
    }
    public async findByPhoneNumber(PhoneNumber: string) {
        try {

            const emp = await this.model.find({ phoneNumber: PhoneNumber })

            return emp[0]
        } catch (error) {
            throw error
        }
    }

    public async update(id, data: EmployeeDto, options?: QueryOptions) {
        try {
            return await this.updateOne(id, data, options)
        } catch (error) {
            throw error
        }
    }
}

export const employeeService = new EmployeeService(EmployeeModel)