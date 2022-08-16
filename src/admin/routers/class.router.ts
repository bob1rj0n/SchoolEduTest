import { Router } from "express"
import {
    createClassHandler,
    getPagingClassHandler
} from "../handler/class.handler"
import { authToken } from "../middleware/authentication";

const router = Router()

router
    .post("/", authToken, createClassHandler)
    .get("/", authToken, getPagingClassHandler)

export default router;