import { Router } from "express"
import prepareAllIndustryApi from "../controllers/industries"
const router=Router()

router.get('/all-country-lists',prepareAllIndustryApi)


export default router