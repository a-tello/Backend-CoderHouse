class ProductManager {
    constructor() {
        this.prodcuts = []
    }


    #generateId() {
        return this.prodcuts.length 
                ? this.prodcuts[this.prodcuts.length - 1].id + 1
                : 1
    }

    #getProductByCode(code) {
        return this.prodcuts.find((product) => product.code === code)
    }   

    addProduct(title, description, price, thumbnail, code, stock) {        
        if(arguments.length != 6) {
            return 'Error. Check data'
        }

        if (this.#getProductByCode(code)) {
            return 'The product already exists'
        }

        const product = {
            id: this.#generateId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.prodcuts.push(product)
    }

    getProducts() {
        return this.prodcuts
    }

    getProductById(id) {
        return this.prodcuts.find((product) => product.id === id) || "Not Found"
    }   
}

