import { Roles } from "../../../common/constants/roles"
import { TestResponse } from "../../../common/db/models/test/test.error"
import { BaseResponse } from "../../../common/reporter/base.response"
import { roleService } from "../../../common/service/admin/role.service"
import { testService } from "../../../common/service/test/test.service"
import { withTransaction } from "../../../common/sessions/session"
import { PagingDto } from "../../../common/validation/dto/paging.dto"
import { TestDto, TestDtoGroup } from "../../../common/validation/dto/test/test.dto"
import { DtoGroups } from "../../../common/validation/dtoGroups.dto"
import { validateIt } from "../../../common/validation/validate"


export async function createTestHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.TEST_CREATE)

        const data = await validateIt(req.body, TestDto, TestDtoGroup.CREATE)

        const test = await testService.create(data)

        return res.send(BaseResponse.Success(test._id))
    } catch (error) {
        return next(error)
    }
}

export async function getPagingTestHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.TEST)

        const data = await validateIt(req.query, PagingDto, TestDtoGroup.PAGENATION)

        const tests = await testService.getPaging(data)

        return res.send(TestResponse.Success(tests))
    } catch (error) {
        return next(error)
    }
}

export async function updateTestHandler(req, res, next) {
    try {
        const data = await validateIt({ ...req.params, ...req.body }, TestDto, TestDtoGroup.UPDATE)
        const id = data._id

        const test = await testService.getById(id)
        if (!test.length) throw TestResponse.NotFound(id)

        const updTest = await testService.update(id, data)

        return res.send(TestResponse.Success(updTest._id))
    } catch (error) {
        return next(error)
    }
}

// export async function deleteTestHandler(req, res, next){
//     try {
//         const data=await validateIt(req.params, TestDto, TestDtoGroup.DELETE)
//         const id=data._id

//         const test=await testService.getById(id)
//         if(!test.length) throw TestResponse.NotFound(id)

//         const result=await withTransaction(async (session)=>{

//         })
//     } catch (error) {
//         return next(error)
//     }
// }