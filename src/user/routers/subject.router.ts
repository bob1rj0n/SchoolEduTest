import { Router } from "express"
import {
    getPagingSubjectHandler
} from "../handler/subject.handler"
import { authTokenUser } from "../middleware/authUser"

const router = Router()

router
    .get("/", authTokenUser, getPagingSubjectHandler)

export default router;