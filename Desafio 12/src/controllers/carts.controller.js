import CustomError from "../errors/CustomErrors.js"
import { ErrorsCartMessage, ErrorsCartName } from "../errors/error.enum.js"
import { addCart, addProductToCart, checkProducts, getCartById, addProductsToCart, updateProductQuantityFromCart, deleteProductFromCart, clearCart } from "../services/carts.services.js"
import { getProductById } from "../services/products.services.js"
import { createTicket } from "../services/ticket.services.js"


export const getOneCart = async (req, res, next) => {
    const {cid} = req.params
        
    try {
        const cart = await getCartById(cid) 
        res.status(201).json({cart})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsCartName.GET_CART_ERROR_NAME,
            message: ErrorsCartMessage.GET_CART_ERROR_MESSAGE,
            cause: err.cause,
            code: 400
        })
        next(customError)
    } 
}

export const addEmptyCart = async (req, res, next) => {

    try{
        const newCart = await addCart()
        res.status(201).json({'message': 'Cart created successfully', cart: newCart})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsCartName.ADD_CART_ERROR_NAME,
            message: ErrorsCartMessage.ADD_CART_ERROR_MESSAGE,
            cause: err.cause,
            code: 400
        })
        next(customError)
    }

}

export const addOneProductToCart = async (req, res, next) => {
    const {cid, pid} = req.params
    
    try {
        const product = await getProductById(pid)
        if(product.owner === req.user.email && req.user.role === 'Premium'){
            throw new Error('Unauthorized')
        }

        const cart = await addProductToCart(cid, pid) 
        res.status(201).json({'message': 'Product added successfully', cart})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsCartName.ADD_PRODUCT_ERROR_NAME,
            message: ErrorsCartMessage.ADD_PRODUCT_ERROR_MESSAGE,
            cause: err.message || err.cause,
            code: 400
        })
        next(customError)
    } 

}

export const addProducts = async (req, res, next) => {
    const {cid} = req.params
    const products = req.body
    
    try {
        const cart = await addProductsToCart(cid, products)
        res.status(201).json({'message': 'Products added successfully', cart})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsCartName.ADD_PRODUCT_ERROR_NAME,
            message: ErrorsCartMessage.ADD_PRODUCT_ERROR_MESSAGE,
            cause: err.cause,
            code: 400
        })
        next(customError)
    } 
}

export const updateProductsFromCart = async (req, res, next) => {
    const {cid, pid} = req.params
    const {quantity} = req.body
    
    try {
        if (quantity < 1) {
            const error = new Error
            error.message = 'Quantity must be greater than 0'
            throw error
        }
        
        await updateProductQuantityFromCart(cid, pid, quantity)
        res.status(201).json({'message': `Quantity of product ${pid} changed to ${quantity}`})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsCartName.UPDATE_PRODUCT_ERROR_NAME,
            message: ErrorsCartMessage.UPDATE_PRODUCT_ERROR_MESSAGE,
            cause: err.cause,
            code: 400
        })
        next(customError)
    } 
}

export const deleteProduct = async (req, res, next) => {
    const {cid, pid} = req.params
    
    try {
        await deleteProductFromCart(cid, pid)
        res.status(201).json({'message': `Product ${pid} deleted successfully from cart ${cid}`})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsCartName.DELETE_PRODUCT_ERROR_NAME,
            message: ErrorsCartMessage.DELETE_PRODUCT_ERROR_MESSAGE,
            cause: err.cause,
            code: 400
        })
        next(customError)
    } 

}

export const emptyCart = async (req, res, next) => {
    const {cid} = req.params
    
    try {
        await clearCart(cid)
        res.status(201).json({'message': `Products deleted successfully. Cart ${cid} is empty`})
    } catch(err) {
        const customError = CustomError.createCustomError({
            name: ErrorsCartName.DELETE_PRODUCT_ERROR_NAME,
            message: ErrorsCartMessage.DELETE_PRODUCT_ERROR_MESSAGE,
            cause: err.cause,
            code: 400
        })
        next(customError)
    } 

}

export const purchase =  async (req,res, next) => {
    const cart = req.user.cart
    const availableProducts = await checkProducts(cart)
    const ticket = await createTicket(req.user, availableProducts )
    return res.render('ticket', {data: {ticket: ticket._doc, cart:availableProducts}})
}