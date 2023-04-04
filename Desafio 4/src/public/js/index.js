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

socketClient.on('showProducts', products => {
    const productList = products.map(product => {
        return `<div><p><strong>ID</strong>: ${product.id}</p>
        <p><strong>Nombre:</strong> ${product.title}</p>
        <p><strong>Descripcion:</strong> ${product.description}</p>
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Imagen:</strong> ${product.thumbnail}</p>
        <p><strong>Codigo:</strong> ${product.code}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Categoria:</strong> ${product.category}</p></div>
        <button class='delete-button' data-id="${product.id}">ELIMINAR PRODUCTO</button><hr>
        `
    }).join(' ')
    divProducts.innerHTML = productList

    const deleteButton = document.querySelectorAll('.delete-button')
    deleteButton.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idProduct = e.target.getAttribute('data-id')
        socketClient.emit('deleteProduct', idProduct)
      })
    })
        

   
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

