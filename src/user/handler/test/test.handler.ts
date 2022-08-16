import { TestResponse } from "../../../common/db/models/test/test.error"
import { testService } from "../../../common/service/test/test.service"
import { PagingDto } from "../../../common/validation/dto/paging.dto"
import { TestPagingDto } from "../../../common/validation/dto/test/test.dto"
import { DtoGroups } from "../../../common/validation/dtoGroups.dto"
import { validateIt } from "../../../common/validation/validate"

export async function getPagingTestHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, PagingDto, DtoGroups.PAGENATION)

        const tests = await testService.getPaging(data)

        return res.send(TestResponse.Success(tests))
    } catch (error) {
        return next(error)
    }
}

export async function getBySubjectIdPagingHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, TestPagingDto, DtoGroups.PAGENATION)

        const result = await testService.getBySubjectIdPaging(data)
        if (!result.length) throw TestResponse.NotFound()

        return res.send(TestResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}
