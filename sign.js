let inp = document.querySelector(`.inp`);
let inp2 = document.querySelector(`.inp2`);
let inp3 = document.querySelector(`.inp3`);
let inp4 = document.querySelector(`.inp4`);
let icon1 = document.querySelector('.icon1');
let icon2 = document.querySelector('.icon2');
let icon3 = document.querySelector('.icon3');
let icon4 = document.querySelector('.icon4');
const form = document.querySelector('.inps');
const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
const btn = document.querySelector('#signin');
const pas1 = document.querySelector('#pas1');
const pas2 = document.querySelector('#pas2');
const page = document.querySelector('.inps');

let shifu = []

icon1.addEventListener('click', () => {
    icon1.style.display = `none`
    icon2.style.display = `block`

    if (inp.type === 'text') {
        inp.type = 'password'
    } else {
        inp.type = 'text'
    }
})

icon2.addEventListener('click', () => {
    icon2.style.display = `none`
    icon1.style.display = `block`

    if (inp.type === 'password') {
        inp.type = 'text'
    } else {
        inp.type = 'password'
    }
})

icon3.addEventListener('click', () => {
    icon3.style.display = `none`
    icon4.style.display = `block`

    if (inp2.type === 'text') {
        inp2.type = 'password'
    } else {
        inp2.type = 'text'
    }
})

icon4.addEventListener('click', () => {
    icon4.style.display = `none`
    icon3.style.display = `block`

    if (inp2.type === 'password') {
        inp2.type = 'text'
    } else {
        inp2.type = 'password'
    }
})

btn.addEventListener('click', () => {
  let hasEmpty = false;

  inputs.forEach(input => {
    if (input.value.trim() === '') {
      input.classList.add("error");
      input.classList.remove("correct");
      hasEmpty = true;
    } else {
      input.classList.remove("error");
      input.classList.add("correct");
    }
  });

  if (hasEmpty) {
    alert("Do‘stim, hali hamma joy to‘ldirilmagan 🙂 Qani, to‘liq yozib chiqamiz!");
  } else {
    setTimeout(() => {      
      passwordCheck()
    }, 1000);
  }
});


function passwordCheck(){
  if (pas1.value === pas2.value) {
    page.classList.add('fade-out');
    pas2.classList.add("correct");
    pas2.classList.remove("error");
    
    let newObj = {
      name: inp3.value,
      mail: inp4.value,
      password: pas1.value,
    }
    shifu.push(newObj)

    setTimeout(() => {
    window.location.href = "index.html";

    localStorage.setItem("auth", JSON.stringify(shifu))

    let storage = localStorage.getItem("auth")

    console.log(storage);

    }, 1000);

  } else {
      alert("Tasdiqlash paroli noto'g'ri kiritildi");
      pas2.classList.add("error");
      pas2.classList.remove("correct");
      hasEmpty = true;
  }
}