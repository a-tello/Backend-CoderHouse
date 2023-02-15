class ProductManager {
    constructor(){
        this.prodcuts = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
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

    getProducts() {
        return this.prodcuts
    }
}




function* foo() { 
    let id = 1
    while (true){
        yield id
        id++
    }
}

let f = foo();

console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);