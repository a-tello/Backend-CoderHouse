import mongoose from 'mongoose'

const URI = 'mongodb+srv://atello:D8YMIQ2LKtW6VSmp@cluster0.90kpthn.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URI)
    .then(() => console.log('Connected'))
    .catch(error => console.log(error))
