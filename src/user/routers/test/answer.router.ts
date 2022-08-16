import { Router } from "express"
import {
    createAnswerHandler,
    updateAnswerHandler
} from "../../handler/test/answer.handler"
import { authTokenUser } from "../../middleware/authUser"

const router = Router()

router
    .post("/", authTokenUser, createAnswerHandler)
    .patch("/", authTokenUser, updateAnswerHandler)


export default router;