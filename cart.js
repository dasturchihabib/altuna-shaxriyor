let action = document.querySelector(".action");
let aloo = document.querySelector(".uzs");
let cartInside = document.querySelector(".tavarlar");
let all = document.querySelector('.total-amount');
let mahsulotlar = document.querySelector('.mahsulotlar');
let products = JSON.parse(localStorage.getItem("product")) || [];

// Narxni son qilib olish va originalPrice ni belgilash (agar yo'q bo'lsa)
products.forEach(product => {
  if (!product.originalPrice) {
    product.originalPrice = Number(product.narx.replace(/,/g, "").replace(/[^\d]/g, ""));
  }
});

action.addEventListener('click', () => {
  localStorage.removeItem('product');
  cartInside.innerHTML = "";
  all.textContent = "0 so'm";
  mahsulotlar.textContent = "0";
});

function displayProducts() {
  cartInside.innerHTML = "";
  products.forEach((product, index) => {
    const totalPrice = product.originalPrice * product.quantity;
    const formattedPrice = totalPrice.toLocaleString('uz-UZ');

    cartInside.innerHTML += `
      <div class="tavar" data-index="${index}">
        <img class="imgProduct" src="${product.rasm}" width="269" alt="">

        <div class="names">
            <h1 class="nameProduct">${product.name}</h1>
            <button class="remove">O'chirish</button>
        </div>
        <p class="description">${product.about}</p>

        <div class="past">
            <h1 class="narx">${formattedPrice} so'm</h1>

            <div class="counter">
                <button class="minus">-</button>
                <div class="raqam">${product.quantity}</div>
                <button class="plus">+</button>
            </div>
        </div>
      </div>
    `;
  });

  hammasi();
}

displayProducts();

function hammasi() {
  let jami = 0;
  let count = 0;

  products.forEach(product => {
    jami += product.quantity * product.originalPrice;
    count += product.quantity;
  });

  all.textContent = jami.toLocaleString('uz-UZ') + " so'm";
  mahsulotlar.textContent = count;
  localStorage.setItem('jamiNarx', all.textContent)
  let jamiNarx = localStorage.getItem('jamiNarx');
  aloo.textContent = jamiNarx
  console.log(jamiNarx);
}

function updateLocalStorage() {
  localStorage.setItem("product", JSON.stringify(products));
}

cartInside.addEventListener('click', (e) => {
  const target = e.target;
  const tavar = target.closest('.tavar');
  if (!tavar) return;

  const index = +tavar.dataset.index;

  if (target.classList.contains('plus')) {
    products[index].quantity++;
  }

  if (target.classList.contains('minus')) {
    if (products[index].quantity > 1) {
      products[index].quantity--;
    } else {
      const confirmDelete = confirm("Siz buyurtmangizni o'chirishni istaysizmi?");
      if (confirmDelete) {
        products.splice(index, 1);
      }
    }
  }

  if (target.classList.contains('remove')) {
    products.splice(index, 1);
  }

  updateLocalStorage();
  displayProducts();
});
