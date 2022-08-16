import dotenv from "dotenv"
import path from "path"
dotenv.config({
    path: path.resolve(__dirname, "../../.env")
})

export const ENV = {
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/new",
    // DB_URL: "mongodb://localhost:27018,localhost27019,localhost:27020/newProject",
    HOST: process.env.HOST || "0.0.0.0",
    ADMIN_PORT: parseInt(process.env.ADMIN_PORT) || 8080,
    USER_PORT: parseInt(process.env.USER_PORT) || 9090,
    FILES_PORT: parseInt(process.env.FILES_PORT) || 7070,
    TOKEN_KEY: process.env.TOKEN_KEY || "SECRET_KEY",
    TOKEN_TIME: {
        expiresIn: process.env.TOKEN_TIME || '1w'
    },
}

