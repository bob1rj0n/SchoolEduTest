import { Router } from "express"
import {
    getBySectionIdHandler,
    getPagingTopicHandler
} from "../handler/topic.handler"
import { authTokenUser } from "../middleware/authUser";

const router = Router()

router
    .get("/", authTokenUser, getPagingTopicHandler)
    .get("/search", authTokenUser, getBySectionIdHandler)

export default router;