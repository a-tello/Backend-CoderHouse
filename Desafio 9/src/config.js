import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mongo_URI: process.env.MONGO_URI,
    github_clientID: process.env.CLIENT_ID,
    github_client_secret: process.env.CLIENT_SECRET
}