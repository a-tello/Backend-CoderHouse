class ProductManager {
    constructor() {
        this.prodcuts = []
    }


    getId() {
        try {
            return this.prodcuts[this.prodcuts.length - 1].id + 1
        }
        catch{
            return 1
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {        
        
        const product = {
            id: this.getId(),
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
        return this.prodcuts.find((product) => product.id === id) || console.error("Not Found");
    }
}

const obj = new ProductManager()
obj.addProduct('Ale', 'adadasdadad', 150, 'khe', 15, 89)
obj.addProduct('Ale', 'adadasdadad', 150, 'khe', 15, 89)
obj.addProduct('Ale', 'adadasdadad', 150, 'khe', 15, 89)
obj.addProduct('Ale', 'adadasdadad', 150, 'khe', 15, 89)
obj.addProduct('Ale', 'adadasdadad', 150, 'khe', 15, 89)
console.log(obj.getProducts());



/* 
let f = foo();


let a = undefined

console.log(a || 52);
console.log(a ?? 52); */