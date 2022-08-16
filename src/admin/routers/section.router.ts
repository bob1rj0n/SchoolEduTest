import { Router } from "express"
import {
    createSectionHandler,
    deleteSectionHandler,
    getByIdHandler,
    getPagingSectionHandler,
    pagingSectionHandler,
    updateSectionHandler
} from "../handler/section.handler"
import { authToken } from "../middleware/authentication";

const router = Router()

router
    .post("/", authToken, createSectionHandler)
    .get("/test", authToken, pagingSectionHandler)
    .get("/:_id", authToken, getByIdHandler)
    .get("/", authToken, getPagingSectionHandler)
    .patch("/update/:_id", authToken, updateSectionHandler)
    .delete("/delete/:_id", authToken, deleteSectionHandler)

export default router;