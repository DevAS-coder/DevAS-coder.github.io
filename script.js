let container = document.querySelector('.container')
let pagination = document.querySelector('.pagination')
let cartBtn = document.querySelector('.cartBtn')
let cart = document.querySelector('.cart')
let close = document.querySelector('.close')
let items = document.querySelector('.items')
let finalpricenumb = document.querySelector('.finalpricenumb')
const loader = document.querySelector('.preLoader')
let PriceSum = 0
let productarray;
let currentPageProducts;
let userCart = [];
let currentPage = 1
let productPerPage = 4

cartBtn.addEventListener('click', function(){cart.style.display = 'block'})
close.addEventListener('click', function(){cart.style.display = 'none'})

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

        let AddToCart = document.createElement('button')
        AddToCart.classList.add('AddToCart')
        AddToCart.innerHTML = 'Add To Cart'
        AddToCart.addEventListener('click',function(){
            addProductToCart(Product.id)
            AddToCart.innerHTML = 'Added!'
            setTimeout(function(){AddToCart.innerHTML = 'Add To Cart'},2000)
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
    console.log(userCart);
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
        remBtn.innerHTML = 'remove'
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

        button.classList.add('active')
    })
    return button
}