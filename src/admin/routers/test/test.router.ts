import { Router } from "express";
import { createTestHandler, getPagingTestHandler, updateTestHandler } from "../../handler/test/test.handler";
import { authToken } from "../../middleware/authentication";

const router = Router()

router
    .post("/", authToken, createTestHandler)
    .get("/", authToken, getPagingTestHandler)
    .patch("/update/:_id", authToken, updateTestHandler)

export default router;