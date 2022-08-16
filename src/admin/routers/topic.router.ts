import { Router } from "express"
import {
    createTopicHandler,
    deleteTopicHandler,
    getBySectionIdHandler,
    getTopicPagingHandler,
    updateTopicHandler
} from "../handler/topic.handler";
import { authToken } from "../middleware/authentication";

const router = Router()

router
    .post("/", authToken, createTopicHandler)
    .get("/", authToken, getTopicPagingHandler)
    .get("/:_id", authToken, getBySectionIdHandler)
    .patch("/update/:_id", authToken, updateTopicHandler)
    .delete("/delete/:_id", authToken, deleteTopicHandler)

export default router;