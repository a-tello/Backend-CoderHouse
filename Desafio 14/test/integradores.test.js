import supertest from 'supertest'
import { expect } from 'chai'

const request = supertest('http://localhost:8080')

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IiAgIiwiZmlyc3ROYW1lIjoiICIsImxhc3ROYW1lIjoiICIsImFnZSI6IiIsImVtYWlsIjoiYWRtaW5Db2RlckBjb2Rlci5jb20iLCJjYXJ0IjoiIiwicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODk2MDMzMDd9.tFHtY9oPbIbUpQW4AcU0IHs6dBBzZlxd2-pSLxZ8Tb0'

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFURUxMTyIsImZpcnN0TmFtZSI6IkFsZSIsImxhc3ROYW1lIjoiVGVsbG8iLCJhZ2UiOjI1LCJlbWFpbCI6ImFsZWUuZS50ZWxsb0BnbWFpbC5jb20iLCJjYXJ0IjoiNjQ5ZDczOTdkYmJkMzc4NTNiOTM0OWQ0Iiwicm9sZSI6IlByZW1pdW0iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjg5NjA4OTU5fQ.prH7NXu7DvDb9JL23NwUkAh-PD6D0VMoIZfmZqRnxiw'


const product1 = {
    title: "TestProduct1",
    description: "TestDescription1",
    price: 1,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_625065-MLA43751822948_102020-O.jpg ",
    code: "a1",
    stock: 50,
    category: "Test1",
    status: true,
    owner:""
}

const product2 = {
    title: "TestProduct2",
    description: "TestDescription2",
    price: 2,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_625065-MLA43751822948_102020-O.jpg ",
    code: "a2",
    stock: 50,
    category: "Test2",
    status: true,
    owner:""
}

/* describe('Tests de endpoints de Products', () => {

    let id

    it('Test metodo POST /api/products', async () => {
        const response = await request.post('/api/products').send(product1).set({ "Authorization": `Bearer ${token}` })
        expect(response._body.product).to.have.property('_id')
        id = response._body.product._id
    })
    
    it('Test metodo GET sin filtros /api/products', async () => {
        const response = await request.get('/api/products')
        expect(response._body.products).to.have.property('status').that.is.equal(true)
        expect(response._body.products.payload).to.be.an('array').that.is.not.empty
    })

    it('Test metodo GET con filtros /api/products', async () => {
        const response = await request.get('/api/products').query({limit: 5, page: 2})
        expect(response._body.products).to.have.property('status').that.is.equal(true)
        expect(response._body.products).to.have.property('page').that.is.equal(2)
        expect(response._body.products.payload).to.be.an('array').that.is.not.empty
        expect(response._body.products.payload).to.be.an('array').to.have.length(5)
    })

   it('Test metodo GET /api/products/id', async () => {
        const response = await request.get(`/api/products/${id}`)
        expect(response._body.product).to.have.property('_id').that.is.equal(id)
    })

    it('Test metodo PUT /api/products/id', async () => {
        const response = await request.put(`/api/products/${id}`).send({title: "Modified", stock: 100, category: "ModifiedCategory"}).set({ "Authorization": `Bearer ${token}` })
        expect(response._body.product).to.have.property('title').that.is.equal('Modified')
        expect(response._body.product).to.have.property('stock').that.is.equal(100)
        expect(response._body.product).to.have.property('category').that.is.equal('ModifiedCategory')
    })

    it('Test metodo DELETE /api/products/id', async () => {
        await request.delete(`/api/products/${id}`).set({ "Authorization": `Bearer ${token}` })
        const response = await request.get(`/api/products/${id}`).set({ "Authorization": `Bearer ${token}` })
        expect(response._body.product).to.be.null
    })
})   */

describe('Tests de endpoints de Carts', () => {

    const cartIdTest = '64b55eda5b648c5ef2d69e4e'
    const productId1 = '643c8ef8fb29b113057e7822'
    const productId2 = '643c8ef1fb29b113057e7820'

    /* it('Test metodo POST /api/carts', async () => {
        const response = await request.post('/api/carts')
        expect(response._body.cart).to.have.property('_id')
        expect(response._body.cart).to.have.property('products')
        //expect(response._body.cart.products).to.be.an('array').that.is.empty
    }) */
    
    it('Test metodo POST /api/carts/cartID/products/productID', async () => {
        await request.post(`/api/carts/${cartIdTest}/products/${productId1}`).set({ "Authorization": `Bearer ${userToken}` })
        await request.post(`/api/carts/${cartIdTest}/products/${productId1}`).set({ "Authorization": `Bearer ${userToken}` })
        const response = await request.post(`/api/carts/${cartIdTest}/products/${productId2}`).set({ "Authorization": `Bearer ${userToken}` })
        expect(response._body.cart).to.have.property('_id').that.is.equal(cartIdTest)
        expect(response._body.cart).to.have.property('products').to.be.length(2)
        expect(response._body.cart.products[0]).to.have.property('product').to.be.equal(productId1)
        expect(response._body.cart.products[0]).to.have.property('quantity').to.be.equal(2)
        expect(response._body.cart.products[1]).to.have.property('product').to.be.equal(productId2)
        expect(response._body.cart.products[1]).to.have.property('quantity').to.be.equal(1)
    })
    
    it('Test metodo GET  /api/carts/id', async () => {
        const response = await request.get(`/api/carts/${cartIdTest}`)
        expect(response._body.cart).to.have.property('_id').that.is.equal(cartIdTest)
        expect(response._body.cart).to.have.property('products').to.be.an('array').to.be.length(2)
    })

    it('Test metodo PUT /api/carts/id', async () => {
        const response = await request.put(`/api/carts/${cartIdTest}`).send([{product:'643c8eecfb29b113057e781e',
            quantity: 3}, 
         {product:'643c8ee6fb29b113057e781c',
            quantity: 5}])
        expect(response._body.cart).to.have.property('_id').that.is.equal(cartIdTest)
        expect(response._body.cart).to.have.property('products').to.be.length(4)
        expect(response._body.cart.products[0]).to.have.property('product').to.be.equal(productId1)
        expect(response._body.cart.products[0]).to.have.property('quantity').to.be.equal(2)
        expect(response._body.cart.products[1]).to.have.property('product').to.be.equal(productId2)
        expect(response._body.cart.products[1]).to.have.property('quantity').to.be.equal(1)
        expect(response._body.cart.products[2]).to.have.property('product').to.be.equal('643c8eecfb29b113057e781e')
        expect(response._body.cart.products[2]).to.have.property('quantity').to.be.equal(3)
        expect(response._body.cart.products[3]).to.have.property('product').to.be.equal('643c8ee6fb29b113057e781c')
        expect(response._body.cart.products[3]).to.have.property('quantity').to.be.equal(5)
    })

    it('Test metodo DELETE /api/carts/id', async () => {
        const response = await request.delete(`/api/carts/${cartIdTest}`)
       // expect(response._body.product).to.be.null
    })
    /*
    it('Test metodo GET con filtros /api/products', async () => {
        const response = await request.get('/api/products').query({limit: 5, page: 2})
        expect(response._body.products).to.have.property('status').that.is.equal(true)
        expect(response._body.products).to.have.property('page').that.is.equal(2)
        expect(response._body.products.payload).to.be.an('array').that.is.not.empty
        expect(response._body.products.payload).to.be.an('array').to.have.length(5)
    })

   it('Test metodo GET /api/products/id', async () => {
        const response = await request.get(`/api/products/${id}`)
        expect(response._body.product).to.have.property('_id').that.is.equal(id)
    })

    it('Test metodo PUT /api/products/id', async () => {
        const response = await request.put(`/api/products/${id}`).send({title: "Modified", stock: 100, category: "ModifiedCategory"}).set({ "Authorization": `Bearer ${token}` })
        expect(response._body.product).to.have.property('title').that.is.equal('Modified')
        expect(response._body.product).to.have.property('stock').that.is.equal(100)
        expect(response._body.product).to.have.property('category').that.is.equal('ModifiedCategory')
    })

    
    }) */
})  
