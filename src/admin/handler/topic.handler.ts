import { Roles } from "../../common/constants/roles"
import { TopicResponse } from "../../common/db/models/class/subject/section/topic/topic.error"
import { roleService } from "../../common/service/admin/role.service"
import { topicService } from "../../common/service/subject/topic.service"
import { TopicDto, TopicDtoGroup, TopicGetDto } from "../../common/validation/dto/class/subject/topic.dto"
import { validateIt } from "../../common/validation/validate"

export async function createTopicHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.TOPIC_CREATE)

        const data = await validateIt(req.body, TopicDto, TopicDtoGroup.CREATE)

        const result = await topicService.create(data)

        return res.send(TopicResponse.Success(result._id))
    } catch (error) {
        return next(error)
    }
}

export async function getTopicPagingHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.TOPIC)

        const data = await validateIt(req.query, TopicGetDto, TopicDtoGroup.PAGENATION)

        const topic = await topicService.getPaging(data)

        return res.send(TopicResponse.Success(topic))
    } catch (error) {
        return next(error)
    }
}

export async function getBySectionIdHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.TOPIC)

        const data = await validateIt(req.params, TopicDto, TopicDtoGroup.GET_BY_ID)

        const topics = await topicService.getBySectionId(data._id)
        if (!topics.length) throw TopicResponse.NotFound()

        return res.send(TopicResponse.Success(topics))
    } catch (error) {
        return next(error)
    }
}

export async function updateTopicHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.TOPIC_UPDATE)

        const data = await validateIt({ ...req.params, ...req.body }, TopicDto, TopicDtoGroup.UPDATE)
        console.log(data)
        const id = data._id
        const updatedTopic = await topicService.update(id, data)

        return res.send(TopicResponse.Success(updatedTopic._id))
    } catch (error) {
        return next(error)
    }
}

export async function deleteTopicHandler(req, res, next) {
    try {
        await roleService.hasAccess(req.roleId, Roles.TOPIC_DELETE)

        const data = await validateIt(req.params, TopicDto, TopicDtoGroup.DELETE)

        const delTopic = await topicService.delete(data._id)

        return res.send(TopicResponse.Success(delTopic._id))
    } catch (error) {
        return next(error)
    }
}