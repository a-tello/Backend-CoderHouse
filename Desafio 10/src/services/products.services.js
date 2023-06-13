import ProductManager from "../DAL/DAO/productManagerMongo.js"

const productManager = new ProductManager()

export const addProduct = async (product) => {
    try {
        const newProduct = await productManager.addProduct(product)
        return newProduct
    }
    catch(err) {
        throw err
    }
}

export const getProducts = async (limit, page, query, sort) => {
         
    try {
        page = parseInt(page)
        const products = await productManager.getProducts(query,{limit, page, sort: {price: sort}, lean:true, leanWithId: false})
        if (page > products.totalPages || isNaN(page)) {
            const err = new Error
            err.message = "That page doesn't exist"
            err.code = 404
            throw err
        }
        const info = {
            status: true,
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page,
            hasPrevPage:  products.hasPrevPage,
            hasNextPage: products.hasNextPage , 
            prevLink: products.hasPrevPage ? `localhost:8080/products?page=${products.prevPage}` : null, 
            nextLink: products.hasNextPage ? `localhost:8080/products?page=${products.nextPage}` : null
        }
        return info
    }
    catch(err) {
        throw err
    }
}

export const getProductById = async (productId) => {
    try {
        const product = await productManager.getProductById(productId)
        return product
    } catch(err) {
        err.cause = `Product with id ${productId} not found`
        throw err
    }
    
}

export const updateProduct = async (productId, productValues) => {
    try {
        await productManager.updateProduct(productId, productValues)
        return await productManager.getProductById(productId)
    } catch(err) {
        throw err
    }
}

export const deleteProductById = async (productId) => {
    
    try {
        const deleteProduct = await productManager.deleteProductById(productId)
        return deleteProduct
    } catch(err) {
        throw err
    }
}
