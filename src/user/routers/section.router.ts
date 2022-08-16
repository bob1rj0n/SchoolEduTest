import { Router } from "express"
import {
    getBySubjectIdHandler,
    getPagingSectionHandler
} from "../handler/section.handler"
import { authTokenUser } from "../middleware/authUser";

const router = Router()

router
    .get("/", authTokenUser, getPagingSectionHandler)
    .get("/search", authTokenUser, getBySubjectIdHandler)

export default router;