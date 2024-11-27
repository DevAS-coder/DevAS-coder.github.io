let container = document.querySelector('.container')
let body = document.querySelector('body')
let pagination = document.querySelector('.pagination')
let cartBtn = document.querySelector('.cartBtn')
let cart = document.querySelector('.cartBg')
let closeBtn = document.querySelector('.close')
let items = document.querySelector('.items')
let finalpricenumb = document.querySelector('.finalpricenumb')
const loader = document.querySelector('.preLoader')
let PriceSum = 0
let productarray;
let currentPageProducts;
let userCart = [];
let currentPage = 1
let productPerPage = 4

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

async function fetchProducts(){
    const response = await fetch('https://fakestoreapi.com/products?limit=10')
    let data = await response.json()
    return data
}

fetchProducts().then(data => {
    productarray = data;
    displayProducts(currentPage, productPerPage)
    setupPages(currentPage)
    console.log('load')
    loader.style.display = 'none'
});

function displayProducts(currentPage, productPerPage){
    container.innerHTML=''
    let endIndex = currentPage * productPerPage
    let startIndex = endIndex - productPerPage

    currentPageProducts = productarray.slice(startIndex,endIndex)

    currentPageProducts.forEach(function (Product) {
        let mainWrapper = document.createElement('div')
        mainWrapper.classList.add('productWrapper')
        
        let productInfo = document.createElement('div')
        productInfo.classList.add('productInfo')

        let productImg = document.createElement('div')
        productImg.classList.add('productImg')

        let Img = document.createElement('img')
        Img.src = Product.image

        let title = document.createElement('span')
        title.classList.add('title')
        title.innerHTML = Product.title

        let category = document.createElement('p')
        category.classList.add('category')
        category.innerHTML = Product.category

        let price = document.createElement('span')
        price.classList.add('price')
        price.innerHTML = Product.price + '$'

        let AddToCart = document.createElement('div')
        AddToCart.classList.add('button')

        let button_wrapper = document.createElement('div')
        button_wrapper.classList.add('button-wrapper')

        let text_button_wrapper = document.createElement('div')
        text_button_wrapper.classList.add('text')
        text_button_wrapper.innerHTML = 'Buy Now'

        button_wrapper.append(text_button_wrapper)
        button_wrapper.innerHTML += `<span class="icon">
            <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
            </svg>
            </span>`

        AddToCart.append(button_wrapper)

        AddToCart.addEventListener('click',function(){
            addProductToCart(Product.id)
            button_wrapper.innerHTML = `<div class="AddToCartDone">Got It!</div>`
            setTimeout(function(){
                button_wrapper.innerHTML = ''
                button_wrapper.append(text_button_wrapper)
                button_wrapper.innerHTML += `<span class="icon">
                    <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                    </svg>
                    </span>`
            },2000)
        })

        productImg.appendChild(Img)
        productInfo.append(title,category,price,AddToCart)
        mainWrapper.append(productImg,productInfo)
        container.appendChild(mainWrapper)
        
        setTimeout(function (){loader.style.display = 'none'}, 1000)
    });
}

function addProductToCart(ProductId){
    let mainProduct = currentPageProducts.find(product => product.id === ProductId)
    userCart.push(mainProduct)
    updateCart(userCart)
}

function updateCart(userCart){
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

function setupPages(page) {
    let pageCount = Math.ceil(productarray.length / productPerPage)
    
    for(let i = 1 ;i <= pageCount; i++){
        let pageButton = paginationGenarator(i)
        pagination.appendChild(pageButton)
    }
}

function paginationGenarator(page) {
    let button = document.createElement('button')
    button.classList.add('pagebtn')
    button.innerHTML = page

    if(page === currentPage){
        button.classList.add('active')
    }
    
    button.addEventListener('click', function() {
        currentPage = page
        loader.style.display = 'flex'
        displayProducts(currentPage, productPerPage)

        let prevButtonClick = document.querySelector('button.active')
        prevButtonClick.classList.remove('active')
        window.scrollTo({ top: 0, behavior: 'instant' });
        button.classList.add('active')
    })
    return button
}
