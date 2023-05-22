import { createUser } from '../services/users.services.js'
import passport from 'passport'

export const createUser = () => {
    passport.authenticate('signup', {
        failureRedirect: '/views/error',
        failureMessage: `El mail ya se encuentra registrado`,
        successRedirect: '/views/login',
        session:false
    })
}