import sha256 from "sha256"
import { UserResponse } from "../../common/db/models/user/user.error"
import { userService } from "../../common/service/user/user.service"
import { jwt } from "../../common/utils/jwt"
import { UserDto, UserDtoGroup } from "../../common/validation/dto/user/user.dto"
import { validateIt } from "../../common/validation/validate"

export async function createUserHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, UserDto, UserDtoGroup.CREATE)
        console.log("data : ", data)

        data.password = sha256(data.password)

        const user = await userService.create(data)

        return res.send(UserResponse.Success(user._id))
    } catch (error) {
        return next(error)
    }
}

export async function getUserByIdHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, UserDto, UserDtoGroup.GET_BY_ID)

        const user = await userService.getById(data._id)
        if (!user.length) throw UserResponse.NotFound(data._id)

        return res.send(UserResponse.Success(user))
    } catch (error) {
        return next(error)
    }
}

export async function updateUserHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, UserDto, UserDtoGroup.UPDATE)
        const id = req.userId
        console.log("birbalo : ", data, id)

        if (data.password) {
            data.password = sha256(data.password)
        }
        
        const updateUser = await userService.update(id, data)

        return res.send(UserResponse.Success(updateUser._id))
    } catch (error) {
        return next(error)
    }
}

export async function deleteUserHandler(req, res, next) {
    try {
        const data = await validateIt(req.params, UserDto, UserDtoGroup.GET_BY_ID)

        const user = await userService.getById(data._id)
        if (!user.length) throw UserResponse.NotFound(data._id)

        const deleteUser = await userService.delete(data._id)

        return res.send(UserResponse.Success(deleteUser._id))
    } catch (error) {
        return next(error)
    }
}

export async function logInUserHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, UserDto, UserDtoGroup.LOGIN)
        console.log("daaashvhdbqbv", data)
        const user = await userService.findByPhonNumber(data.phoneNumber)
        if (!user) throw UserResponse.NotFound(data.phoneNumber)

        if (user.password != sha256(data.password)) throw UserResponse.InvalidPassword()

        const token = await jwt.sign({ phonenumber: user.phoneNumber })
        const result = {
            token: token,
            firstname: user.firstname,
            lastname: user.lastname,
            phonenumber: user.phoneNumber
        }

        return res.send(UserResponse.Success(result))
    } catch (error) {
        return next(error)
    }
}