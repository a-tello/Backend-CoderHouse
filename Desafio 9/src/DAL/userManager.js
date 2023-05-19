import { userModel } from "./models/users.model.js";
import { compareData } from "../utils.js";

export default class UserManager {
   
    async createUser(user) {
        const {email} = user
        const userExists = await userModel.find({email})
        
        if(userExists.length !== 0) {
            return null
        } else {
            const newUser = userModel.create({...user, role: 'Usuario'})
            return newUser
        }
    }

    async loginUser(userData) {
        const {email, password} = userData

        if(await this.#isAdmin(email,password)) return {firstName: 'Admin', lastName: '-', age: '-', email: email, password: password, role: 'Administrador'}

        const user = await userModel.find({email}).lean()
        if(user.length !== 0 && await compareData(password, user[0].password)) {
            return {...user[0]}
        } else {
            return null
        }
    }

    async #isAdmin(email, password) {
        return email === 'adminCoder@coder.com' && password === 'adminCod3r123'

    }
}