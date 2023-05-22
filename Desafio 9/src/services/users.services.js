import UserManager from "../DAL/userManager.js"
import { hashData, compareData} from "../utils.js"
import '../config.js'

const userManager = new UserManager()

export const createUser = async (user) => {
    try {
        const {email, password} = user
        const userExists = await userManager.getUser({email})
    
        if(userExists.length !== 0) {
            return null
        } else {
            const hashPassword = await hashData(password)
            const userData = {...user, password: hashPassword, cart: cart._id}
            const newUser = userManager.createOne({...userData, role: 'Usuario'})
            return newUser
        }
    } catch (error) {
        throw error
    }
}

export const loginUser = async (userData) => {
    const {email, password} = userData

    if(await isAdmin(email,password)) return {firstName: 'Admin', lastName: '-', age: '-', email: email, password: password, role: 'Administrador'}

    const user = await userManager.getUser({email}).lean()
    return (user.length !== 0 && await compareData(password, user[0].password)) ? {...user[0]} :  null
}

const isAdmin = async (email, password) => {
    return email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD
}