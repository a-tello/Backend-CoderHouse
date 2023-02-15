class ProductManager {
    constructor(){
        this.prodcuts = []
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const product = {
            id: 
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.prodcuts.push(product)
    }
}