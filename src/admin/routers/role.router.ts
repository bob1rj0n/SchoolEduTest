import { Router } from "express"
import {
    createRoleHandler,
    getRoleByIdHandler,
    getRolePagingHandler,
    updateRoleHandler
} from "../handler/role.handler"
import { authToken } from "../middleware/authentication"


const router = Router()

router
    .post("/", authToken, createRoleHandler)
    .get("/", authToken, getRolePagingHandler)
    .get("/:_id", authToken, getRoleByIdHandler)
    .patch("/:_id", authToken, updateRoleHandler)

export default router;