import { userModel } from "../db/models/users.model.js";

export default class UserManager {
    async createUser(user) {
        const {email} = user
        const userExists = await userModel.find({email})
        
        if(userExists !== 0) {
            return null
        } else {
            const newUser = userModel.create(user)
            return newUser
        }
    }
}