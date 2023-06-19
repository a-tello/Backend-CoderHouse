import mongoose from 'mongoose'
import config from '../../config.js'
import { logger } from '../../winston.js'

const URI = config.mongo_URI

await mongoose.connect(URI)
    .then(() => logger.info('Connected to DB'))
    .catch(error => logger.error(error))
