let locationSearch = location.search

let urlsearchparam = new URLSearchParams(locationSearch)
let idparam = urlsearchparam.get('id')

let cartBtn = document.querySelector('.cartBtn')
let cart = document.querySelector('.cartBg')
let closeBtn = document.querySelector('.close')
let body = document.querySelector('body')
let items = document.querySelector('.items')
let productImage = document.querySelector('.product-img')
let productCategory = document.querySelector('.product-category')
let productTitle = document.querySelector('.product-title')
let productDescription = document.querySelector('.product-description')
let productPrice = document.querySelector('.product-price')
let finalpricenumb = document.querySelector('.finalpricenumb')
let button_wrapper = document.querySelector('.button-wrapper')
let text = document.querySelector('.text')
let AddToCart = document.querySelector('.button')
let back = document.querySelector('.backtoshop')
let PriceSum = 0
let productarray;
let userCart = [];

async function fetchProducts(){
    const response = await fetch('https://fakestoreapi.com/products?limit=10')
    let data = await response.json()
    return data
}

fetchProducts().then(data => {
    productarray = data;
    displayProduct()
});

function displayProduct(){
    let product = productarray.find(function(currentProduct){
        return currentProduct.id == idparam;
    })
    
    productImage.src = product.image
    productCategory.innerHTML = product.category
    productTitle.innerHTML = product.title
    productDescription.innerHTML = product.description
    productPrice.innerHTML = product.price +'$'
    
}

function addProductToCart(ProductId){
    let mainProduct = productarray.find(function(currentProduct){
        return currentProduct.id == idparam;
    })
    
    userCart.push(mainProduct)
    updateCart(userCart)
}

function updateCart(userCart){
    console.log(userCart);
    
    items.innerHTML = ''
    PriceSum = 0
    userCart.forEach(function(item) {
        let itemname = document.createElement('span')
        itemname.classList.add('incartname')
        itemname.innerHTML = item.title
        
        let remBtn = document.createElement('button')
        remBtn.classList.add('removeitem')
        remBtn.innerHTML = 'Remove'
        remBtn.addEventListener('click',function(){
            deletefromcart(item.id)
        })
        
        let quantity = document.createElement('span')
        quantity.classList.add('quantity')
        quantity.innerHTML = '1'
        quantity.append(remBtn)

        let priceincart = document.createElement('span')
        priceincart.classList.add('priceincart')
        priceincart.innerHTML = item.price + '$'

        items.append(itemname,quantity,priceincart)

        PriceSum += Number(item.price)

    })
    finalpricenumb.innerHTML = Math.floor(PriceSum) + '$'
}

function deletefromcart(itemid){
    let Removeitem = userCart.find(item => item.id === itemid)
    userCart.pop(Removeitem)
    updateCart(userCart)
}

AddToCart.addEventListener('click',function(){
    addProductToCart(idparam)
    button_wrapper.innerHTML = `<div class="AddToCartDone">Added!</div>`
    setTimeout(function(){
        button_wrapper.innerHTML = ''
        text.innerHTML = 'Buy Now'
        button_wrapper.append(text)
        button_wrapper.innerHTML += `<span class="icon">
            <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
            </svg>
            </span>`
    },2000)
})

window.addEventListener('click', function(e){
    if(e.target === cart){
        cart.style.display = 'none'
        body.style.overflow = 'visible'
    }
})

cartBtn.addEventListener('click', function(){
    cart.style.display = 'block'
    body.style.overflow = 'hidden'
})

closeBtn.addEventListener('click', function(){
    cart.style.display = 'none'
    body.style.overflow = 'visible'
})

back.addEventListener('click', function(){
    window.history.back()
})