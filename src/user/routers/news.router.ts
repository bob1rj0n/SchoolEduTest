import { Router } from "express"
import { getNewsByIdHandler, getPagingNewsHandler } from "../handler/news.handler"
import { authTokenUser } from "../middleware/authUser";

const router = Router()

router
    .get("/", authTokenUser, getPagingNewsHandler)
    .get("/:_id", authTokenUser, getNewsByIdHandler)

export default router;