import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
import { Strategy as GitHubStrategy} from 'passport-github2'
import UserManager from '../dao/userManager.js';
import { userModel } from '../db/models/users.model.js';
import { hashData } from '../utils.js';

const userManager = new UserManager()

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true 
    }, async (req, email, password, done) => {

        const user = await userManager.loginUser(req.body)
        return user ? done(null, user) : done(null, false)

    }
)) 

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true 
    }, async (req, email, password, done) => {

        const hashPassword = await hashData(req.body.password)
        const userData = {...req.body, password: hashPassword}
        const newUser = await userManager.createUser(userData)
        
        return newUser ? done(null, newUser) : done(null, false)
        
    }
)) 

passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.3ab38e6536d1390c',
        clientSecret: 'c9cfed99d6a5d49ad6e4f52e0579bfb24d72f0b2',
        callbackURL: "http://localhost:8080/api/users/github"
    },
      async (accessToken, refreshToken, profile, done) => {
        const user = {
            firstName: profile._json.name.split(' ')[0] || 'a ',
            lastName: profile._json.name.split(' ')[1] || 'a ',
            email: profile._json.email || 'a ',
            password: 'a ',
            age: 16,
            role: 'Usuario'
        }
        const newUser = await userModel.create(user)

            return done(null, newUser);
        })
    )


  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser( async(userId, done) => {
    const user = await userModel.findById(userId).lean()
    done(null, user)

  })
  