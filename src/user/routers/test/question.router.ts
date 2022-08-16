import { Router } from 'express'
import {
    getQuestionByTestIdPaging,
} from '../../handler/test/question.hadler'
import { authTokenUser } from '../../middleware/authUser';

const router = Router()

router
    .get("/", authTokenUser, getQuestionByTestIdPaging)


export default router;