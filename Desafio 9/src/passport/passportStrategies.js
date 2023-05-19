import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
import { Strategy as GitHubStrategy} from 'passport-github2'
import UserManager from '../DAL/userManager.js';
import CartManager from '../DAL/cartManagerMongo.js';
import { userModel } from '../DAL/models/users.model.js';
import { hashData } from '../utils.js';

const userManager = new UserManager()
const cartManager = new CartManager()

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

        const cart = await cartManager.addCart()

        const hashPassword = await hashData(req.body.password)
        const userData = {...req.body, password: hashPassword, cart: cart._id}
        const newUser = await userManager.createUser(userData)
        
        return newUser ? done(null, newUser) : done(null, false)
        
    }
)) 

passport.use('github', new GitHubStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: "http://localhost:8080/api/users/github"
    },
      async (accessToken, refreshToken, profile, done) => {
        const user = {
            firstName: profile._json.name.split(' ')[0] || ' ',
            lastName: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email || ' ',
            password: ' ',
            age: 0  ,
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
  