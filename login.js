let inp1 = document.querySelector(`.inp1`);
let inp2 = document.querySelector(`.inp2`);
let icon1 = document.querySelector('.icon1');
let icon2 = document.querySelector('.icon2');
const form = document.querySelector('.inps');
const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
const btn = document.querySelector('#login');
const page = document.querySelector('.inps');

icon1.addEventListener('click', () => {
    icon1.style.display = `none`
    icon2.style.display = `block`
    inp2.type = 'text'
})

icon2.addEventListener('click', () => {
    icon2.style.display = `none`
    icon1.style.display = `block`
    inp2.type = 'password'
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
    return;
  }

  let users = JSON.parse(localStorage.getItem("auth")) || [];

  let user = users.find(u => u.mail === inp1.value && u.password === inp2.value);

  if (user) {
    alert(`Xush kelibsiz, ${user.name}!`);
    page.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } else {
    alert("Gmail yoki parol noto‘g‘ri 😕");
    inp1.classList.add("error");
    inp2.classList.add("error");
    inp1.classList.remove("correct");
    inp2.classList.remove("correct");
  }
});
