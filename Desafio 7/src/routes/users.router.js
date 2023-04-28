import { Router } from "express"
import UserManager from "../dao/userManager.js"
import { compareData, hashData } from "../utils.js"
import passport from "passport"

const router = Router()
const userManager = new UserManager()

router.post('/signup',  async (req, res) => {
    
    const hashPassword = await hashData(req.body.password)
    const userData = {...req.body, password: hashPassword}
    const newUser = await userManager.createUser(userData)
    if(newUser) {
        res.redirect('/views/login')
    } else{
        req.session.messages = [`El mail ${req.body.email} ya se encuentra registrado`]
        res.redirect('/views/error')
    }
})

router.post('/login',  passport.authenticate('local', {
    failureRedirect: '/views/error',
    failureMessage: 'Usuario o contraseña incorrectos',
    successRedirect: '/views/products'
}))

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/views/login')
    })
})


export default router