let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
let counter = document.getElementById("counter");
let counter2 = document.getElementById("counter2");
let cartItems = document.getElementById("cartItems");
let totalAmount = 0;


function removeItem(idx) {
    cartArray.splice(idx, 1);
    saveArr();
    displayCart()
    counter.innerHTML = cartArray.length;
    counter2.innerHTML = cartArray.length;
}

const saveArr = () => {
    localStorage.setItem("cart", JSON.stringify(cartArray))
}
function updateQuantity(idx, value) {
    cartArray[idx].quantity += value;
    if (cartArray[idx].quantity < 1) {
        removeItem(idx)
    } else {
        saveArr();
    }
    displayCart();
}


function displayCart() {
    totalAmount = 0;
    cartItems.innerHTML = "";
    let emptyimg = document.getElementById("emptyimg")
    let emptycard = document.getElementById("emptycard")
    let emptytable = document.getElementById("emptytable")
    
    if (cartArray.length == 0) {
        emptyimg.classList.remove("d-none")
        emptycard.classList.add("d-none")
        emptytable.classList.add("d-none")
        cartItems.classList.remove("border")
    }else{
        emptyimg.classList.add("d-none")
        emptycard.classList.remove("d-none")
        emptytable.classList.remove("d-none")
        cartItems.classList.add("border")
    }
    function updateQuantity(idx, value) {
        let newQuantity = cartArr[idx].quantity + value;
        
        if (newQuantity <= 0) {
            deleteItem(idx);
        } else {
            cartArr[idx].quantity = newQuantity;
            saveArr();
        }
        displayCart();
    }
    
    cartArray.forEach((shopitem, idx) => {
        let subTotal = shopitem.quantity * shopitem.price;
        totalAmount += subTotal;
        
        cartItems.innerHTML += `
        <div class="row gy-4 py-2 px-2">
        <div class="col-md-6 col-12">
        <div class="d-flex align-items-center gap-3">
        <div class="cart-image">
        <img src="${shopitem.image}" alt="" width="100px">
        </div>
        <div class="">
        <h3 class="m-0 fs-5 text-secondary">${shopitem.name}</h3>
        </div>
        </div>
        </div>
        <div class="col-md-2 col-4">
        <div class="d-flex align-items-center h-100 justify-content-center">
        <span class="fs-7 text-dark fw-semibold">$${shopitem.price}</span>
        </div>
        </div>
        <div class="col-md-2 col-4 ">
        <div class=" d-flex align-items-center justify-content-center h-100">
        <div class="d-flex gap-4 h-40 border ">
        <button type="button" class="border-0 fw-bold button" onclick="updateQuantity(${idx}, -1)">
        <i class="bi bi-dash"></i>
        </button>
        <span id="quantityCount" class="fs-7 text-dark fw-semibold">${shopitem.quantity}</span>
        <button type="button" class="border-0 fw-bold button" onclick="updateQuantity(${idx}, 1)">
        <i class="bi bi-plus"></i>
        </button>
        </div>
        </div>
        </div>
        <div class="col-md-2 col-4">
        <div class="d-flex align-items-center justify-content-between h-100 gap-sm-4 gap-2">
        <span class="fs-7 text-dark fw-semibold">$${subTotal}</span>
        <button type="button" class="border-0 fs-5 button" onclick=" removeItem(${idx})">
        <i class="bi bi-x-circle"></i>
        </button>
        </div>
        </div>
        </div>`
    })
    document.getElementById("bill").innerHTML = "";
    document.getElementById("bill").innerHTML += `
    <h5 class="card-header">Order Summary</h5>
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
    <h5 class="card-title">Subtotal</h5>
    <span>$${totalAmount}</span>
    </div>
    <div class="d-flex align-items-center justify-content-between mt-3">
    <h5 class="card-title">Shipping</h5>
    <span>$0</span>
    </div>
    <div class="d-flex align-items-center justify-content-between mt-3">
    <h5 class="card-title">Total</h5>
    <span>$${totalAmount}</span>
    </div>
    </div>
    `
    
}
displayCart();

counter.innerHTML = cartArray.length;
counter2.innerHTML = cartArray.length;

function removeAll(){
    cartArray = [];
    saveArr();
    displayCart();
}