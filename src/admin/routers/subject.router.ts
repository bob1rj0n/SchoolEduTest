import { Router } from "express"
import {
    createSubjectHandler,
    deleteSubjectHandler,
    getPagingSubjectHandler,
    getSubjectByIdHandler,
    updateSubjectHandler
} from "../handler/subject.handler"
import { authToken } from "../middleware/authentication";


const router = Router()

router
    .post("/", authToken, createSubjectHandler)
    .get("/get/:_id", authToken, getSubjectByIdHandler)
    .get("/", authToken, getPagingSubjectHandler)
    .patch("/update/:_id", authToken, updateSubjectHandler)
    .delete("/delete/:_id", authToken, deleteSubjectHandler)


export default router;