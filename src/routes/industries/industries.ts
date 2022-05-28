import { Router } from "express"
import {getAllIndustry} from "../../controllers/industries/industries"
const router=Router()

router.get('/all-country-lists',getAllIndustry)


export default router