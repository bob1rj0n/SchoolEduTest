import { Roles } from "../../common/constants/roles"
import { RoleResponse } from "../../common/db/models/admin/role/role.error"
import { NewsResponse } from "../../common/db/models/news/news.error"
import { roleService } from "../../common/service/admin/role.service"
import { newsService } from "../../common/service/news/news.service"
import { NewsDto, NewsDtoGroup, NewsGetDto } from "../../common/validation/dto/news/news.dto"
import { validateIt } from "../../common/validation/validate"


export async function createNewsHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.NEWS_CREATE)

        const data = await validateIt(req.body, NewsDto, NewsDtoGroup.CREATE)

        const news = await newsService.create(data)

        return res.send(NewsResponse.Success(news._id))
    } catch (error) {
        return next(error)
    }
}

export async function getByIdNewsHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.NEWS)

        const data = await validateIt(req.params, NewsDto, NewsDtoGroup.GET_BY_ID)

        const news = await newsService.getById(data._id)
        if (!news) throw NewsResponse.NotFound()

        return res.send(NewsResponse.Success(news))
    } catch (error) {
        return next(error)
    }
}

export async function getPagingNewsHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.NEWS)

        const data = await validateIt(req.query, NewsGetDto, NewsDtoGroup.PAGENATION)

        const news = await newsService.getPaging(data)

        return res.send(NewsResponse.Success(news))
    } catch (error) {
        return next(error)
    }
}


export async function getByCategoryIdHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, NewsDto, NewsDtoGroup.GET_BY_ID)

        const result = await newsService.getByCategoryId(data._id)
        if (!result.length) throw NewsResponse.NotFound(data._id)

        return res.send(NewsResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function updateNewsHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.NEWS_UPDATE)

        const data = await validateIt({ ...req.params, ...req.body }, NewsDto, NewsDtoGroup.UPDATE)
        const id = data._id

        const news = await newsService.getById(id)
        if (!news) throw NewsResponse.NotFound(id)

        const updateNews = await newsService.update(id, data)
        return res.send(NewsResponse.Success(updateNews._id))
    } catch (error) {
        return next(error)
    }
}

export async function deleteNewsHandler(req, res, next: Function) {
    try {
        await roleService.hasAccess(req.roleId, Roles.NEWS_DELETE)

        const data = await validateIt(req.params, NewsDto, NewsDtoGroup.DELETE)

        const news = await newsService.getById(data._id)
        if (!news) throw NewsResponse.NotFound(data._id)

        const deleteNews = await newsService.updateOne(data._id, { isDeleted: true })

        res.send(NewsResponse.Success(deleteNews._id))
    } catch (error) {
        return next(error)
    }
}