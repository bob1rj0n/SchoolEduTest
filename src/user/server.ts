import express from "express"
import { ENV } from "../common/config"
import { connectDB } from "../common/db/connection"
import { BaseResponse } from "../common/reporter/base.response"

///routers
import userRouter from "./routers/user.router";
import testRouter from "./routers/test/test.router";
import questionRouter from "./routers/test/question.router";
import newsRouter from "./routers/news.router";
import subjectRouter from "./routers/subject.router";
import sectionRouter from "./routers/section.router";
import topicRouter from "./routers/topic.router";
import answerRouter from "./routers/test/answer.router";
import quizRouter from "./routers/test/quiz.router";


!async function () {
    const server = express()

    await connectDB()

    server.use(express.json())

    ////routers
    server.use("/users", userRouter)
    server.use("/news", newsRouter)
    server.use("/tests", testRouter)
    server.use("/questions", questionRouter)
    server.use("/subjects", subjectRouter)
    server.use("/sections", sectionRouter)
    server.use("/topics", topicRouter)
    server.use("/answers", answerRouter)
    server.use("/quiz", quizRouter)

    ////error router
    server.use((req, res) => {
        res.status(404).send(BaseResponse.NotFound({ "URL": req.url }))
    })

    ///error handler
    server.use((err, req, res, next) => {

        if (err instanceof BaseResponse) {
            res.status(400).send(err)
        }
        else res.status(400).send(BaseResponse.UnknownError(err))
    })

    server.listen(ENV.USER_PORT, ENV.HOST, () => {
        console.log("User server running on http://localhost:" + ENV.USER_PORT)
    })
}()