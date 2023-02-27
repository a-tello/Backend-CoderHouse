const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(product) {
        if(Object.keys(product).length != 6) {
            throw new Error('All fields are required!')
        }

        const products = await this.getProducts()

        const existingProduct = this.#productExists(products, product.code) 
        if (existingProduct) throw new Error('The product already exists')

        const id = this.#generateId(products)
        const newProduct = { id, ...product }

        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            const products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            return products
        }
        return []
    }

    async getProductById(productId) {
        const products = await this.getProducts()
        const product =  products.find((product) => product.id === productId)
        
        if (!product) throw new Error('No products found') 
        return product
    }

    async updateProduct(productId, productValues) {
        const products = await this.getProducts()
        const productIndex = products.findIndex((product) => product.id === productId )

        if(productIndex === -1) throw new Error('No products found') 

        const updatedProduct = {...products[productIndex], ...productValues}

        products.splice(productIndex, 1, updatedProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }

    async deleteProducts(productId) {
        const products = await this.getProducts()
        const newProductList = products.filter((product) => product.id !== productId)

        if(products.length === newProductList.length) throw new Error('No products found')

        await fs.promises.writeFile(this.path, JSON.stringify(newProductList))
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




const testProductManager = async () => {

    // Creacion de instancia y return de arreglo vacío
    const productManager = new ProductManager('productos.json')
    console.log(await productManager.getProducts(), '\n-------------------------') 

    // Agrego producto de prueba y lo muestro 
    const newProduct = {
        title: 'producto prueba',
        description:'Este es un producto prueba',
        price:200,
        thumbnail:'Sin imagen',
        code:'abc123',
        stock:25
    }
    await productManager.addProduct(newProduct)
    console.log(await productManager.getProducts(), '\n-------------------------')

    // Busco producto por ID
    console.log(await productManager.getProductById(1), '\n-------------------------')

    // Agrego mas productos y actualizo el existente. Muestro los productos correctamente (cantidad, datos, id)
    const updatedProduct = {
        title: 'Nombre cambiado del primero',
    }
    const newProduct2 = {
        title: 'test2',
        description:'Otro producto',
        price:500,
        thumbnail:'www.test.com',
        code:'123456',
        stock:200
    }
    const newProduct3 = {
        title: 'producto3',
        description:'Uno mas',
        price:1500,
        thumbnail:'www.url.com',
        code:'abcabcabc',
        stock:250
    }
    await productManager.addProduct(newProduct2)
    await productManager.addProduct(newProduct3)
    await productManager.updateProduct(1, updatedProduct)
    console.log(await productManager.getProducts(), '\n-------------------------')

    // Elimino un producto (2)
    await productManager.deleteProducts(2)
    console.log(await productManager.getProducts(),'\n-------------------------')


    // Test error
    //await productManager.addProduct(newProduct) // Agregar mismo producto (mismo codigo)
    //await productManager.addProduct({title: 'prod', description:'descripcion', price:1500, thumbnail:'www.com'}) // Agregar un producto con diferente cantidad de campos
    //await productManager.getProductById(99) // Buscar por un ID incorrecto
    //await productManager.updateProduct(99, updatedProduct) // Actualizar producto inexistente
    //await productManager.deleteProducts(99) // Eliminar producto inexistente
    
}
testProductManager()