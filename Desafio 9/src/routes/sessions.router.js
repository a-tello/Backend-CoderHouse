import { Router } from 'express'

const router = Router()

router.get('/current', async (req, res) => {
        
    try {
        res.json({'session':req.session})
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 

})

export default router