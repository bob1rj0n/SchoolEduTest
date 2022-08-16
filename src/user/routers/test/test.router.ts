import { Router } from "express"
import {
    getBySubjectIdPagingHandler,
    getPagingTestHandler,
} from "../../handler/test/test.handler"
import { authTokenUser } from "../../middleware/authUser"

const router = Router()

router.get("/test", authTokenUser, getPagingTestHandler)
router.get("/", authTokenUser, getBySubjectIdPagingHandler)


export default router;