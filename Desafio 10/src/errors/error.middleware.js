export const errorMiddleware = (error, req, res, next) => {
    res.json({
        status: error.name,
        message: error.message,
        cause: error.cause
    })
    next()
}