import { Router } from "express"
import { changeRole, loginUser, logoutUser, resetPassword, saveFiles, singUpUser, updatePassword } from '../controllers/users.controller.js'
import passport from "passport"
import { jwtValidator } from "../middleware/jwt.middleware.js"
import { upload, userUpload } from "../middleware/multer.middleware.js"

const router = Router()

router.post('/login', loginUser)

router.post('/signup', singUpUser)

router.get('/signup/github',passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github',  passport.authenticate('github', {
    successRedirect: '/views/products'
}))

router.post('/resetPassword', resetPassword )
router.post('/changePassword', jwtValidator, updatePassword )
router.post('/:uid/documents',  userUpload, saveFiles)
router.put('/premium/:uid', changeRole )
router.get('/logout', logoutUser)


export default router