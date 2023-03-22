const socketClient = io()

const divProducts = document.getElementById('products-container')
const form = document.getElementById('form')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')
const code = document.getElementById('code')
const stock = document.getElementById('stock')
const category = document.getElementById('category')


const resetForm = () =>{
    title.value = ''
    description.value = ''
    price.value = ''
    thumbnail.value = ''
    code.value = ''
    stock.value = ''
    category.value = ''
}

socketClient.on('initialLoad', products => {
    const productList = products.map(product => {
        return `<p>${product.id}</p>
        <p>${product.title}</p>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <p>${product.thumbnail}</p>
        <p>${product.code}</p>
        <p>${product.stock}</p>
        <p>${product.category}</p>
        <hr>
        `
    }).join(' ')
    divProducts.innerHTML = productList
})


form.onsubmit = (e) => {
    e.preventDefault()
    const product = {
        'title': title.value,
        'description': description.value,
        'price': +price.value,
        'thumbnail': thumbnail.value,
        'code': +code.value,
        'stock': +stock.value,
        'category': category.value
    }
    resetForm()
    socketClient.emit('addProduct', product)
}