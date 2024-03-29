export default class CustomError {
    static createCustomError({name, message, cause, code}) {
        const err =  new Error(message, {cause})
        err.name = name
        err.code = code
        return err
    }
}
