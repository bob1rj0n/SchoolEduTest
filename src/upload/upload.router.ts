import { Router } from "express"
import { uploafFileHandler } from "./upload.handlar"

const router = Router()


router.post("/file", uploafFileHandler)

export default router;