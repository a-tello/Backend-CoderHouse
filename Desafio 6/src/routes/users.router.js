import { Router } from "express"
import UserManager from "../dao/userManager.js"

const router = Router()
const userManager = new UserManager()

router.post('/signup',  async (req, res) => {
    
    const newUser = await userManager.createUser(req.body)
    if(newUser) {
        res.redirect('/views/login')
    } else{
        res.json({'message': 'error'})
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {

        if(err) res.json({message: err})
        else res.json({message: 'Sesion eliminada'})
    })

    res.json({message: 'conected'})
})


export default router