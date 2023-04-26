import { Router } from "express"
import UserManager from "../dao/userManager.js"
import { compareData, hashData } from "../utils.js"

const router = Router()
const userManager = new UserManager()

router.post('/signup',  async (req, res) => {
    
    const hashPassword = await hashData(req.body.password)
    const userData = {...req.body, password: hashPassword}
    const newUser = await userManager.createUser(userData)
    if(newUser) {
        res.redirect('/views/login')
    } else{
        req.session.err = `El mail ${req.body.email} ya se encuentra registrado`
        res.redirect('/views/error')
    }
})

router.post('/login',  async (req, res) => {

    const user = await userManager.loginUser(req.body)
    if(user && await compareData(req.body.password, user.password)) {
        req.session.email = user.email
        req.session.password = user.password
        req.session.firstName = user.firstName
        req.session.lastName = user.lastName
        req.session.age = user.age
        req.session.role = user.role
        res.redirect('/views/products')
    } else{
        req.session.err = "Usuario o contraseña incorrectos"
        res.redirect('/views/error')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/views/login')
    })
})


export default router