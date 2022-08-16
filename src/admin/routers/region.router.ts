import { Router } from "express"
import {
    createRegionHandler,
    getPagingRegionHandler
} from "../handler/region.handler"
import { authToken } from "../middleware/authentication";

const router = Router()

router
    .post("/", authToken, createRegionHandler)
    .get("/", authToken, getPagingRegionHandler)

export default router;