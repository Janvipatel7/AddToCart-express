let products = [
    {
        id: 1,
        name: "Gold T-Bar Stud Earrings",
        price: "899",
        image: "./assets/images/product-1.jpg"
    },
    {
        id: 2,
        name: "Silver Huggie Earrings ",
        price: "789",
        image: "./assets/images/product-2.jpg"
    },
    {
        id: 3,
        name: "Gold Belcher Chain",
        price: "569",
        image: "./assets/images/product-3.jpg"
    },
    {
        id: 4,
        name: "Silver Eternity Stud Earrings",
        price: "60",
        image: "./assets/images/product-4.jpg"
    },

]

let cartArr = JSON.parse(localStorage.getItem("cart")) || [];
let counter = document.getElementById("counter");
let counter2 = document.getElementById("counter2");
function addToCart(productId) {


    let product = products.find((item) => {
        return productId == item.id
    })
    let productIdx = cartArr.findIndex((item) => {
        return item.id == productId
    })
    if (productIdx !== -1) {
        // cartArr[productIdx].quantity++;
        Swal.fire({
            icon: "warning",
            text: "Item Already Added !",
            position: 'bottom-end',
            toast: 'true',
            showConfirmButton: false,
            timer: 1500,
        });
    } else {
        product.quantity = 1;
        cartArr.push(product);
        Swal.fire({
            icon: "success",
            text: "Item added !",
            position: 'bottom-start',
            toast: 'true',
            showConfirmButton: false,
            timer: 1500,
        });
    }

    localStorage.setItem("cart", JSON.stringify(cartArr))
    counter.innerHTML = cartArr.length
    counter2.innerHTML = cartArr.length
}
counter.innerHTML = cartArr.length
counter2.innerHTML = cartArr.length

let productsElement = document.getElementById("product");
products.forEach((product, idx) => {

    productsElement.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product-wrapper bg-unique box-shadow h-100">
              <div class="product-img ">
                <img src="${product.image}" alt="${product.name}" class="img-fluid hide-bg">
              </div>
              <div class="cursor-pointer  d-flex justify-content-between align-items-center">
                <div>
                  <div class="">
                    <h5 class="mt-1 fs-6 fw-semibold">${product.name}</h5>
                  </div>
                  <div class="d-flex align-items-center justify-content-start">
                    <p class="m-0 fs-6">$${product.price}</p>
                  </div>
                </div>
                <div class="d-flex align-items-center height-100 justify-content-center  mt-1">
                  <span class="bg-color"  onclick = "addToCart(${product.id})">
                    <i class="bi bi-cart3 "></i>
                  </span>
              </div>
            </div>
          </div>
        </div>

   `
})