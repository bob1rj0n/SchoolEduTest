import jsonwebtoken from "jsonwebtoken"
import { ENV } from "../config"

export const jwt = {
    sign: (data: any) => jsonwebtoken.sign(data, ENV.TOKEN_KEY, ENV.TOKEN_TIME),
    verify: (token: string) => jsonwebtoken.verify(token, ENV.TOKEN_KEY)
}