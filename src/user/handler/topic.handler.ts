import { TopicResponse } from "../../common/db/models/class/subject/section/topic/topic.error"
import { topicService } from "../../common/service/subject/topic.service"
import { TopicDtoGroup, TopicGetDto, TopicPagingDto } from "../../common/validation/dto/class/subject/topic.dto"
import { validateIt } from "../../common/validation/validate"

export async function getPagingTopicHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, TopicGetDto, TopicDtoGroup.PAGENATION)

        const result = await topicService.getPaging(data)

        return res.send(TopicResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}

export async function getBySectionIdHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, TopicPagingDto, TopicDtoGroup.PAGENATION)

        const result = await topicService.findByPaging(data)

        return res.send(TopicResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}