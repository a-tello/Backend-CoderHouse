import { userModel } from "./models/users.model.js";

export default class UserManager {
   
    async getUser(email) {
        try {
            const user = userModel.find({email})
            return user
        } catch (error) {
            throw error            
        }
    }

    async createOne(user) {
        try {
            const newUser = userModel.create({user})
            return newUser
        } catch (error) {
            throw error
        }
    }
}