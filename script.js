let body = document.querySelector('body');
let users = document.querySelectorAll('.user');
let mode = document.querySelectorAll('.mode');
let moon = document.querySelector('.moon');
let sun = document.querySelector('.sun');
let uz = document.querySelector('.uz');
let en = document.querySelector('.en');
let ru = document.querySelector('.ru');
let til = document.querySelector('.lang');
let past = document.querySelector('.down');
let uzb = document.querySelector('.uzb');
let eng = document.querySelector('.eng');
let rus = document.querySelector('.rus');
let wel = document.querySelector('.wel');
let alo = document.querySelector('.uzs');

mode.forEach(icon => {
    icon.addEventListener('click', () => {
        body.classList.toggle('night');
    });
});

sun.addEventListener('click', () => {
    moon.style.display = `block`
    sun.style.display = `none`
});

moon.addEventListener('click', () => {
    sun.style.display = `block`
    moon.style.display = `none`
});

til.addEventListener('click', () => {
    past.classList.toggle('do')
})

uzb.addEventListener('click', () => {
    past.classList.toggle('do')
})

eng.addEventListener('click', () => {
    past.classList.toggle('do')
})

rus.addEventListener('click', () => {
    past.classList.toggle('do')
})

let jamiNarx = localStorage.getItem('jamiNarx');
alo.textContent = jamiNarx
console.log(jamiNarx);
 

let alertContainer = document.querySelector('.alertContainer');

function createAlert(type, message, iconClass) {
    const alert = document.createElement('div');

    alert.className = `alert ${type}`;

    alert.innerHTML = `
    <i class='fa-duotone fa-regular ${iconClass}'></i>
    <span>${message}</span>
    <i class="fa-duotone fa-regular fa-circle-xmark closeBtn"></i>
    `

    alertContainer.appendChild(alert);

    const closeBtn = alert.querySelector('.closeBtn')

    closeBtn.addEventListener('click', () => {
        alert.classList.add('hide');

        setTimeout(() => {
            alert.remove();
        }, 500);
    })

    setTimeout(() => {
        alert.classList.add('hide');

        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 5000);

};

let savatlar = document.querySelectorAll('.savat');
let tavars = document.querySelector('.tavarlar');
let savatArray = JSON.parse(localStorage.getItem("product")) || [];

savatlar.forEach(savat => {
    savat.addEventListener('click', () => {
        const parent = savat.closest('.card');
        const nameProduct = parent.querySelector('.nameProduct').textContent;
        const imgProduct = parent.querySelector('.imgProduct').src;
        const price = parent.querySelector('.narx').textContent;
        const description = parent.querySelector('.description').textContent;

        createAlert(
            'success',
            `Buyurtmangiz savatga qo'shildi`,
            'fa-badge-check'
        );

         const existingProduct = savatArray.find(item =>
            item.name === nameProduct && item.about === description
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            let newProduct = {
                name: nameProduct,
                rasm: imgProduct,
                narx: price,
                about: description,
                quantity: 1
            };

            savatArray.push(newProduct);
        }
        localStorage.setItem("product", JSON.stringify(savatArray));

        console.log(JSON.parse(localStorage.getItem("product")));
    });
});

let storage = localStorage.getItem("auth")

if (storage == null) {
    wel.style.display = "block"
} else {
    wel.style.display = "none"
}

users.forEach(user => {
    user.addEventListener('click', () => {
        if (storage === null) {
            window.location.href = 'sign-up.html'
        } else {
            window.location.href = 'user.html'
        }
    })
});