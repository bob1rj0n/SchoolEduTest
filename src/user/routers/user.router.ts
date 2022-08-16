import { Router } from "express"
import {
    createUserHandler,
    deleteUserHandler,
    getUserByIdHandler,
    logInUserHandler,
    updateUserHandler
} from "../handler/user.handler"
import { authTokenUser } from "../middleware/authUser";


const router = Router()

router
    .post("/login", logInUserHandler)
    .post("/", createUserHandler)
    .get("/:_id", authTokenUser, getUserByIdHandler)
    .patch("/update", authTokenUser, updateUserHandler)
    .delete("/delete/:_id", authTokenUser, deleteUserHandler)

export default router;