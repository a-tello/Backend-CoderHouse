import winston from 'winston'
import config from './config.js'

const env = config.node_env || 'production'

const customLevels = {
    names: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'magenta',
        debug: 'green',
    }
}

export let logger

if(env === 'development') {
    logger = winston.createLogger({
        levels: customLevels.names,
        level: 'debug',
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize({colors:customLevels.colors}),
                    winston.format.simple()
                )
            })
        ]
    })
    logger.info(`Environment: ${env}`)

} else {
    logger = winston.createLogger({
        levels: customLevels.names,
        level: 'info',
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize({colors:customLevels.colors}),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                level: 'error',
                filename: 'errors.log',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                )
            })
        ]
    })
    logger.info(`Environment: ${env}`)

}

