import { productsModel } from "../mongoDB/models/products.model.js"

export default class ProductManager {
    async addProduct(product) {
        try {
            const newProduct = await productsModel.create(product)
            return newProduct
        }
        catch(err) {
            throw err
        }
    }
    
    async getProducts(query,data ) {
             
        try {
            const products = await productsModel.paginate(query,data)
            return products
        }
        catch(err) {
            throw err
        }
    }

    async getProductById(productId) {
        try {
            const product = await productsModel.findById(productId)
            return product
        } catch(err) {

            throw err
        }
        
    }

    async updateProduct(productId, productValues) {
        try {
            await productsModel.findByIdAndUpdate(productId, productValues)
        } catch(err) {
            throw err
        }
    }

    async deleteProductById(productId) {
        
        try {
            const deleteProduct = await productsModel.findByIdAndDelete(productId)
            return deleteProduct
        } catch(err) {
            throw err
        }
    }
}