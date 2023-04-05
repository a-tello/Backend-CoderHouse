import { productsModel } from "../db/models/products.model.js"

export default class ProductManager {
    async getProducts() {
        try {
            const products = await productsModel.find()
            return products
        }
        catch(err) {
            console.log(err);
        }
    }

    async addProduct(product) {
        try {
            const newProduct = await productsModel.create(product)
            return newProduct
        }
        catch(err) {
            console.log(err);
        }
    }

}