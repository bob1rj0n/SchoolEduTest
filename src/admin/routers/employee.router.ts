import { Router } from "express";
import {
    createEmployeeHandler,
    deleteEmpHandler,
    getEmpByPhoneNumber,
    getEmployeeByIdHandler,
    getPagingEmployeeHandler,
    signInHandler,
    updateEmployeeHandler
} from "../handler/employee.handler";
import { authToken } from "../middleware/authentication";


const router = Router()

router
    .post("/", createEmployeeHandler)
    .get("/", authToken, getPagingEmployeeHandler)
    .get("/phonenumber", authToken, getEmpByPhoneNumber)
    .get("/:_id", authToken, getEmployeeByIdHandler)
    .patch("/", authToken, updateEmployeeHandler)
    .delete("/:_id", authToken, deleteEmpHandler)


router.post("/login", signInHandler)

export default router;