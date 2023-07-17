import { faker } from '@faker-js/faker'

export const generateProduct = (quantity) => {
    const products = []

    for (let i = 0; i < quantity; i++) {
        const product = {
            "_id": faker.database.mongodbObjectId(),
            "title": faker.commerce.productName(),
            "description": faker.commerce.productDescription(),
            "price": faker.commerce.price({ min: 100, max: 20000, dec: 0 }),
            "thumbnail": faker.image.url(),
            "code": faker.string.alphanumeric({ length: 5}),
            "stock": faker.number.int({ min: 10, max: 100 }),
            "category": faker.commerce.productAdjective(),
            "status": true,
        }
        products.push(product)
    }
    
    const resProducts = {
            products,
            status: true
        }

    return resProducts
}