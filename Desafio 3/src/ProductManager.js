import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(product) {
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile('products.json', JSON.stringify([]))
        }

        if(Object.keys(product).length != 6) {
            throw new Error('All fields are required!')
        }

        const products = await this.getProducts()

        const existingProduct = this.#productExists(products, product.code) 
        if (existingProduct) {
            throw new Error('The product already exists')
        }

        const id = this.#generateId(products)
        const newProduct = { id, ...product }

        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4))
    }

    async getProducts() {
        
        try {
            const products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            return products
        } catch {
            throw new Error('Cannot return products')
        }
    }

    async getProductById(productId) {
        const products = await this.getProducts()
        const product =  products.find((product) => product.id === productId)
        
        if (!product) throw new Error('Product not found') 
        return product
    }

    async updateProduct(productId, productValues) {
        const products = await this.getProducts()
        const productIndex = products.findIndex((product) => product.id === productId )
        const updatedProduct = {...products[productIndex], ...productValues}

        products.splice(productIndex, 1, updatedProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4))
    }

    async deleteProducts(productId) {
        const products = await this.getProducts()
        const newProductList = products.filter((product) => product.id !== productId)

        await fs.promises.writeFile(this.path, JSON.stringify(newProductList, null, 4))
    }

    
    #productExists(products, productCode) {
        return products.find((product) => product.code === productCode)
    }

    #generateId(products) {
        return products.length
            ? products[products.length - 1].id + 1
            : 1
    }
}

export default ProductManager