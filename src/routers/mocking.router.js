import { Router } from "express"
import { generateUserFaker } from "../utils/faker.js"

const router = Router()

router.get('/', async (req, res) => {
    const usersFaker = []

    for (let i = 0; i < 100; i++) {
        usersFaker.push(generateUserFaker())
    }


    res.send({ status: "success", payload: usersFaker })
})

export default router