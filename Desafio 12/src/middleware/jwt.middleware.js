import jwt from "jsonwebtoken"
import config from "../config.js"

export const jwtValidator = (req, res, next) => {
    try {
        const token = req.cookies.Authorization
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser) {
            req.user = {...validateUser, isLogged:true}
            return next()
        } 
    } catch (error) {
        throw error
    }
}

export const verifyTokenAdmin = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser.isAdmin){
            next()
        } else {
            throw new Error
        }
    } catch (error) {
        res.status(401).json({error: 'Unauthorized.'});
    }
} 

export const verifyTokenUser = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(!validateUser.isAdmin){
            next()
        } else {
            throw new Error
        }
    } catch (error) {
        res.status(401).json({error: 'Unauthorized.'});
    }
} 

export const verifyTokenPremium = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser.role === 'Premium'){
            next()
        } else {
            throw new Error
        }
    } catch (error) {
        res.status(401).json({error: 'Unauthorized.'});
    }
} 

export const verifyTokenPremiumOrAdmin = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser.role === 'Premium' || validateUser.isAdmin){
            next()
        } else {
            throw new Error
        }
    } catch (error) {
        res.status(401).json({error: 'Unauthorized.'});
    }
} 