import { Router } from "express"
import {
    finishAndCheckQuizHandler,
    getPagingResultHandler,
    getRegisteredTestsHandler,
    getResultOneTestHandler,
    registerForTestHandler,
    startQuizHandler
} from "../../handler/test/quiz.handler"
import { authTokenUser } from "../../middleware/authUser";

const router = Router()

router
    .post("/register", authTokenUser, registerForTestHandler)
    .get("/get", authTokenUser, getRegisteredTestsHandler)
    .post("/start", authTokenUser, startQuizHandler)
    .post("/finish", authTokenUser, finishAndCheckQuizHandler)
    .get("/result", authTokenUser, getPagingResultHandler)
    .get("/resultOne/:testId", authTokenUser, getResultOneTestHandler)

export default router;