export const errorMiddleware = (error, req, res, next) => {
    res.send({
        error: error.name,
        message: error.message,
        cause: error.cause,
        status: error.status 
    })
}