import { Router } from 'express'

const router = Router()

router.get('/mockingproducts', (req, res) => {
    try {
        const mockProducts = generateProduct(100)
        res.json({message:'Products created', products: mockProducts})
    } catch (error) {
        throw error
    }
})
router.get('/loggerTest', (req,res) => {
    logger.fatal(`Method: ${req.method} - URL: ${req.url}`)
    logger.error(`Method: ${req.method} - URL: ${req.url}`)
    logger.warning(`Method: ${req.method} - URL: ${req.url}`)
    logger.info(`Method: ${req.method} - URL: ${req.url}`)
    logger.http(`Method: ${req.method} - URL: ${req.url}`)
    logger.debug(`Method: ${req.method} - URL: ${req.url}`)
    res.render('test', {message:'Testeando logger'})
})


export default router