import { userModel } from "../db/models/users.model.js";

export default class UserManager {
   
    async createUser(user) {
        const {email} = user
        const userExists = await userModel.find({email})
        
        if(userExists.length !== 0) {
            return null
        } else {
            const newUser = userModel.create(user)
            return newUser
        }
    }

    async loginUser(userData) {
        const {email, password} = userData
        const user = await userModel.find({email, password})

        if(user.length !== 0) {
            return await this.#isAdmin(email, password) ? {...user[0], 'role':'Administrador'} : {...user[0], 'role':'Usuario'}
        } else {
            return null
        }
    }

    async #isAdmin(email, password) {
        return email === 'adminCoder@coder.com' && password === 'adminCod3r123'

    }
}