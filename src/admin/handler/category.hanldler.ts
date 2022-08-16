import { CategoryResponse } from "../../common/db/models/category/category.error"
import { BaseResponse } from "../../common/reporter/base.response"
import { categoryService } from "../../common/service/category/category.service"
import { CategoryDto, CategoryDtoGroup, CategoryGetDto } from "../../common/validation/dto/category/category.dto"
import { validateIt } from "../../common/validation/validate"


export async function createCategoryHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, CategoryDto, CategoryDtoGroup.CREATE)

        const category = await categoryService.create(data)

        return res.send(BaseResponse.Success(category._id))
    } catch (error) {
        return next(error)
    }
}

export async function getcategoryPagingHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, CategoryGetDto, CategoryDtoGroup.PAGENATION)

        const category = await categoryService.getPaging(data)

        const total = await categoryService.getCount()

        const result = {
            data: category,
            ...total
        }

        return res.send(BaseResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

