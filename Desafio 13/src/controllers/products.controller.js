import { addProduct, deleteProductById, getProductById, getProducts, updateProduct } from '../services/products.services.js'
import CustomError from "../errors/CustomErrors.js"
import { ErrorsProductsMessage, ErrorsProductsName } from "../errors/error.enum.js"

export const getAllProducts = async (req, res, next) => {
    const {limit=10, page=1, sort=null,...query} = req.query
    
    try {
        const products = await getProducts(limit, page, query, sort)
        res.status(200).json({message: 'productos', products})        
        
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsProductsName.GET_PRODUCT_ERROR_NAME,
            message: ErrorsProductsMessage.GET_PRODUCT_ERROR_MESSAGE,
            cause: err.message,
            code: 400
        })
        next(customError)
    }
}

export const getOneProductById = async (req, res, next) => {
    const {pid} = req.params
        
    try {
        const product = getProductById(pid) 
        res.status(200).json({message: 'productos', product})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsProductsName.GET_PRODUCT_ERROR_NAME,
            message: ErrorsProductsMessage.GET_PRODUCT_ERROR_MESSAGE,
            cause: err.cause,
            code: 400
        })
        next(customError)
    } 
}

export const addOneProduct = async (req, res, next) => {
    const product = req.body
    if(!product.owner) {
        product.owner = 'admin'
    }

    try {
        await addProduct(product)
        res.status(201).json({'message': 'Product created', 'product': product})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsProductsName.ADD_PRODUCT_ERROR_NAME,
            message: ErrorsProductsMessage.ADD_PRODUCT_ERROR_MESSAGE,
            cause: err.message,
            code: 400
        })
        next(customError)
    } 
}

export const updatedOneProduct = async (req, res, next) => {
    const {pid} = req.params
    const newValues = req.body
    
        
    try {
        const updatedProduct = await updateProduct(pid, newValues)
        res.status(201).json({'message': 'Product updated', 'product': updatedProduct})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsProductsName.UPDATE_PRODUCT_ERROR_NAME,
            message: ErrorsProductsMessage.UPDATE_PRODUCT_ERROR_MESSAGE,
            cause: err.message,
            code: 400
        })
        next(customError)
    } 
}

export const deleteOneProduct = async (req, res, next) => {
    const {pid} = req.params
        
    try {
        const product = await getProductById(pid)
        if(req.user.isAdmin || req.user.email === product.owner){
            const deleted = await deleteProductById(pid)
            if(!deleted) {
                throw new Error
            }
            return res.status(200).json(`Product ${pid} deleted successfully`)
        }
        throw new Error('Unauthorized')
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsProductsName.DELETE_PRODUCT_ERROR_NAME_PRODUCT_ERROR_NAME,
            message: ErrorsProductsMessage.DELETE_PRODUCT_ERROR_MESSAGE,
            cause: err.message || `Can not find product with ID ${pid}`,
            code: 400
        })
        next(customError)
    } 
}