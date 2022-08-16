import { Router } from "express"
import {
    createNewsHandler,
    deleteNewsHandler,
    getByCategoryIdHandler,
    getByIdNewsHandler,
    getPagingNewsHandler,
    updateNewsHandler
} from "../handler/news.handler"
import { authToken } from "../middleware/authentication"


const router = Router()


router
    .post("/", authToken, createNewsHandler)
    .get("/:_id", authToken, getByIdNewsHandler)
    .get("/", authToken, getPagingNewsHandler)
    .patch("/:_id", authToken, updateNewsHandler)
    .delete("/:_id", authToken, deleteNewsHandler)
    .get("/id/:_id", authToken, getByCategoryIdHandler)


export default router;