const socket = io();

const form = document.getElementById("form")
const title = document.getElementById("title")
const description = document.getElementById("description")
const category = document.getElementById("category")
const code = document.getElementById("code")
const price = document.getElementById("price")
const stock = document.getElementById("stock")

form.onsubmit = (e) =>{
    e.preventDefault()
    const product = {

        title: title.value,
        description: description.value,
        category: category.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        status : true
    }
    socket.emit("newProduct", product)
}

socket.on("getProducts", (products) =>{
    const productsContainer = document.getElementById("productsContainer")

    productsContainer.innerHTML = ""

    products.forEach((product) => {
        let div = document.createElement("div")
        div.className = "cardContainer"

        div.innerHTML += `
        
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h2>$${product.price}</h2>
            <button id= "${product.id}">Borrar</button>

        `
        productsContainer.append(div)

        const deleteProduct = document.getElementById(product.id)

        deleteProduct.onclick = () => {
            socket.emit("deleteProduct", product.id)
        }
        }
    )
})