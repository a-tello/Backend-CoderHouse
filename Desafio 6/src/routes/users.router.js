import { Router } from "express"
import UserManager from "../dao/userManager.js"

const router = Router()
const userManager = new UserManager()

router.post('/signup',  async (req, res) => {
    
    const newUser = await userManager.createUser(req.body)
    if(newUser) {
        res.redirect('/views/login')
    } else{
        res.redirect('/views/error')
    }
})

router.post('/login',  async (req, res) => {
    
    const {email, password} = req.body
    const user = await userManager.loginUser(req.body)
    if(user) {
        req.session.email = email
        req.session.password = password
        req.session.firstName = user._doc.firstName
        req.session.lastName = user._doc.lastName
        req.session.role = user.role
        res.redirect('/views/products')
    } else{
        res.redirect('/views/error')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/views/login')
    })
})


export default router