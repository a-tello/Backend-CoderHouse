import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId, ref: 'carts',
         _id : false,
         unique: true
    },
    documents: [
        {
            name: {type: String},
            reference: {type: String},
             _id : false 
        }
    ],
    last_connection: {
        type: String
    }
})

export const userModel = mongoose.model('users', usersSchema)