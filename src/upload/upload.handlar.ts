import path from "path";
import { BaseResponse } from "../common/reporter/base.response";
import { v4 as uuidv4 } from "uuid"

export async function uploafFileHandler(req, res, next) {
    try {
        const { img } = req.files
        console.log("reasm : ", img)
        // img.name.trim()
        let userImgName = uuidv4() + path.extname(img.name)

        if (img.size > 10 * 1024 * 1024) throw BaseResponse.InvalidImg()
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(img.mimetype)) {
            throw BaseResponse.InvalidImg()
        }

        img.mv(path.join(process.cwd(), "uploads", "user", userImgName))
        const imgUrl = userImgName

        return res.send(BaseResponse.Success(imgUrl))
    } catch (error) {
        return next(error)
    }
}