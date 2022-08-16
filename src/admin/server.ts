import express from "express";
import { connectDB } from "../common/db/connection";
import { BaseResponse } from "../common/reporter/base.response";

//routers
import { ENV } from "../common/config";
import roleRouter from "./routers/role.router";
import employeeRouter from "./routers/employee.router";
import newsRouter from "./routers/news.router";
import categoryRouter from "./routers/category.router";
import classRouter from "./routers/class.router";
import subjectRouter from "./routers/subject.router";
import sectionRouter from "./routers/section.router";
import topicRouter from "./routers/topic.router";
import testRouter from "./routers/test/test.router";
import questionRouter from "./routers/test/question.router";
import regionRouter from "./routers/region.router";



!async function () {
    const server = express();

    await connectDB()

    server.use(express.json())

    //routers
    server.use("/role", roleRouter)
    server.use("/employee", employeeRouter)
    server.use("/category", categoryRouter)
    server.use("/news", newsRouter)
    server.use("/class", classRouter)
    server.use("/subject", subjectRouter)
    server.use("/section", sectionRouter)
    server.use("/topic", topicRouter)
    server.use("/test", testRouter)
    server.use("/question", questionRouter)
    server.use("/regions", regionRouter)


    // errorRoutes
    server.use((request, response) => {
        response.status(404).send(BaseResponse.NotFound({ "URL": request.url }))
    })

    // errorHandler
    server.use((error, request, response, next) => {
        console.log(error.message);

        if (error instanceof BaseResponse) {
            response.status(400).send(error)
        }
        else response.status(400).send(BaseResponse.UnknownError(error))
    })


    server.listen(ENV.ADMIN_PORT, ENV.HOST, () => console.log("Admin server running on http://localhost:" + ENV.ADMIN_PORT))

}()