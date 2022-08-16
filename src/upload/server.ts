import express from "express"
import { ENV } from "../common/config";
import fileUpload from "express-fileupload";

import fileRouter from "./upload.router"
import { BaseResponse } from "../common/reporter/base.response";
import path from "path";

!async function () {
    const server = express();

    server.use(express.json())
    server.use(fileUpload())

    //router
    server.use(fileRouter)

    //static folders
    server.use("/profileImg", express.static(path.join(process.cwd(), "uploads", "user")))
    

    ///error url
    server.use((req, res) => {
        res.status(404).send(BaseResponse.NotFound({ "URL": req.url }))
    })

    //error handler
    server.use((err, req, res, next) => {
        console.log(err.message)

        if (err instanceof BaseResponse) {
            res.status(400).send(err)
        }
        else res.status(400).send(BaseResponse.UnknownError(err))
    })
    server.listen(ENV.FILES_PORT, ENV.HOST, () => {
        console.log("Files server running on http://localhost:" + ENV.FILES_PORT)
    })
}()