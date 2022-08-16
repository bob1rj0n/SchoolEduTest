import { Router } from "express"
import {
    createQuestionHandler,
    deleteQuestionHandler,
    getByTestIdPaging,
    getPagingQuestionsHandler,
    updateQuestionHandler
} from "../../handler/test/question.handler"
import { authToken } from "../../middleware/authentication";

const router = Router()

router
    .post("/", authToken, createQuestionHandler)
    .get("/tests", authToken, getByTestIdPaging)
    .get("/", authToken, getPagingQuestionsHandler)
    .patch("/update/:_id", authToken, updateQuestionHandler)
    .delete("/delete/:_id", authToken, deleteQuestionHandler)

export default router;