const form = document.querySelector('.inps');
const inp = document.querySelector(`.inp`);
const inp2 = document.querySelector(`.inp2`);
const icon1 = document.querySelector('.icon1');
const icon2 = document.querySelector('.icon2');
const icon3 = document.querySelector('.icon3');
const icon4 = document.querySelector('.icon4');
const pass = document.querySelector('.pass');
const words = document.querySelector('.words');
const passwords = document.querySelector('.passwords');
const inputs = form.querySelectorAll('input[type="text"]');
const btn = document.querySelector('#save');
const page = document.querySelector('.inps');
const tony = document.querySelector('.tony');
const stark = document.querySelector('.stark');
const mail = document.querySelector('.com');
const username = document.querySelector('#name');
const lastname = document.querySelector('#last-name');
const gmail = document.querySelector('#mail');

pass.addEventListener(`click`, () => {
  words.style.display = 'block'
  pass.classList.add(`active`)
})

let auth = JSON.parse(localStorage.getItem("auth"))
tony.textContent = auth[0].name;
mail.textContent = auth[0].mail;
stark.textContent = auth[0].surname || "";

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

// Parol o'zgartirish elementlari
const newPass = document.querySelector('#new-pass');
const confirmPass = document.querySelector('#confirm-pass');
// const updateBtn = document.querySelector('#update-pass');

let tailung = [];

// Sahifa yuklanganda auth dan ma'lumotni o'qib, input va textContentlarga joylash
window.onload = () => {
  let authData = JSON.parse(localStorage.getItem("auth")) || [];

  if (authData.length > 0) {
    username.value = authData[0].name || "";
    passwords.value = authData[0].password || "";
    gmail.value = authData[0].mail || "";
    lastname.value = authData[0].surname || "";

    updateDisplay(authData[0].name, authData[0].surname, authData[0].gmail);
  }
}

function updateDisplay(name, surname, mail) {
  tony.textContent = `${name.slice(0, 1).toUpperCase()}${name.slice(1, 20).toLowerCase()}`;
  if (surname.length > 7) {
    stark.textContent = `${surname.slice(0, 1).toUpperCase()}.`
  } else {
    stark.textContent = `${surname.slice(0, 1).toUpperCase()}${surname.slice(1, 20).toLowerCase()}`;
  }
  mail.textContent = mail.includes("@") ? mail : mail + "@gmail.com";
}

btn.addEventListener('click', () => {
  let hasEmpty = false;
  tailung = [];

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
    alert("Do'stim, hali hamma joy to'ldirilmagan 🙂 Qani, to'liq yozib chiqamiz!");
    return;
  }

  let newObje = {
    name: username.value,
    mail: gmail.value,
    surname: lastname.value
  }

  tailung.push(newObje);

  // Display yangilash
  updateDisplay(newObje.name, newObje.surname, newObje.mail);

  // LocalStoragega saqlash: avval auth ni yangilash
  let authData = JSON.parse(localStorage.getItem("auth")) || [];
  console.log(authData);

  if (authData.length > 0) {
    authData[0].name = newObje.name;
    authData[0].mail = newObje.mail;
    authData[0].surname = newObje.surname;
    localStorage.setItem("auth", JSON.stringify(authData));
  }

  // Agar alohida profil uchun storage kerak bo‘lsa, uni ham saqlash mumkin
  // localStorage.setItem("po", JSON.stringify(tailung));

  // Animatsiya
  page.classList.add('fade-out');
  setTimeout(() => {
    // Hozircha sahifa o'zgarishi yo'q, agar kerak bo'lsa qo'shish mumkin
    // window.location.href = "index.html";
  }, 1000);

  // Parolni yangilash
  if (passwords.style.display === 'block') {

    if (newPass.value.trim() === '' || confirmPass.value.trim() === '') {
      alert("Iltimos, parol maydonlarini to‘ldiring.");
      return;
    }
    if (newPass.value !== confirmPass.value) {
      alert("Parollar mos kelmayapti!");
      return;
    }

    let storedUsers = JSON.parse(localStorage.getItem("auth")) || [];
    if (storedUsers.length > 0) {
      storedUsers[0].password = newPass.value; // Faqat 1-user bo‘lsa
      localStorage.setItem("auth", JSON.stringify(storedUsers));
      alert("Parol muvaffaqiyatli yangilandi!");
    } else {
      alert("Avval ro‘yxatdan o‘ting.");
    }
  }

  newPass.value = "";
  confirmPass.value = "";
});