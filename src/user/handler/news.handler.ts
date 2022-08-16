import { NewsResponse } from "../../common/db/models/news/news.error"
import { newsService } from "../../common/service/news/news.service"
import { NewsDto, NewsDtoGroup, NewsGetDto } from "../../common/validation/dto/news/news.dto"
import { validateIt } from "../../common/validation/validate"

export async function getPagingNewsHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, NewsGetDto, NewsDtoGroup.PAGENATION)

        const news = await newsService.getPaging(data)

        return res.send(NewsResponse.Success(news))
    } catch (error) {
        return next(error)
    }
}

export async function getNewsByIdHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, NewsDto, NewsDtoGroup.GET_BY_ID)

        const news = await newsService.getById(data._id)
        if (!news) throw NewsResponse.NotFound()

        return res.send(NewsResponse.Success(news))
    } catch (error) {
        return next(error)
    }
}
