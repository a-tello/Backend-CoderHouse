import { Router } from "express"
import { createUser } from '../controllers/users.controller.js'
import passport from "passport"

const router = Router()

router.post('/signup', createUser)

router.post('/login',  passport.authenticate('login', {
    failureRedirect: '/views/error',
    failureMessage: 'Usuario o contraseña incorrectos',
    successRedirect: '/views/products'  
}))


router.get('/signup/github',passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github',  passport.authenticate('github', {
    successRedirect: '/views/products'
}))

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/views/login')
    })
})


export default router