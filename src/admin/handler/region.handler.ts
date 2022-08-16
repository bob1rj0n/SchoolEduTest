import { RegionResponse } from "../../common/db/models/region/region.error"
import { regionService } from "../../common/service/region/region.service"
import { RegionDto, RegionDtoGroup, RegionGetDto } from "../../common/validation/dto/region/region.dto"
import { validateIt } from "../../common/validation/validate"


export async function createRegionHandler(req, res, next) {
    try {
        const data = await validateIt(req.body, RegionDto, RegionDtoGroup.CREATE)

        const region = await regionService.create(data)

        return res.send(RegionResponse.Success(region._id))
    } catch (error) {
        return next(error)
    }
}

export async function getPagingRegionHandler(req, res, next) {
    try {
        const data = await validateIt(req.query, RegionGetDto, RegionDtoGroup.PAGENATION)

        const regions = await regionService.getPaging(data)

        return res.send(RegionResponse.Success(regions))
    } catch (error) {
        return next(error)
    }
}