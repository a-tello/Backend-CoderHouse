import { productsModel } from "../db/models/products.model.js"

export default class ProductManager {
    async getProducts() {
        try {
            const products = await productsModel.find
        }
    }
}