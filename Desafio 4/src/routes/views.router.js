import { Router } from "express"

const router = Router()


router.get('/home', (req, res) => {
    res.render('realTimeProducts')     
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')     
})

export default router