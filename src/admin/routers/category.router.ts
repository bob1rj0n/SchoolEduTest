import { Router } from "express"
import {
    createCategoryHandler,
    getcategoryPagingHandler
} from "../handler/category.hanldler"
import { authToken } from "../middleware/authentication";

const router = Router()

router
    .post("/", authToken, createCategoryHandler)
    .get("/", authToken, getcategoryPagingHandler)


export default router;
