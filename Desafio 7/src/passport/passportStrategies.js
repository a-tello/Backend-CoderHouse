import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
import UserManager from '../dao/userManager.js';
import { userModel } from '../db/models/users.model.js';
import { compareData } from '../utils.js';

const userManager = new UserManager()

passport.use('local', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true 
    }, async (req, email, password, done) => {

        const user = await userManager.loginUser(req.body)
        if(user) {
            done(null, user)
            /* req.session.email = user.email
            req.session.password = user.password
            req.session.firstName = user.firstName
            req.session.lastName = user.lastName
            req.session.age = user.age
            req.session.role = user.role
            res.redirect('/views/products') */
        } else{
            done(null, false)
           /*  req.session.err = "Usuario o contraseña incorrectos"
            res.redirect('/views/error') */
        }
    }
)) 

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser( async(userId, done) => {
    const user = await userModel.findById(userId).lean()
    done(null, user)

  })
  