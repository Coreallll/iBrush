//Валидация формы
let form = document.querySelector('form'),
    formInputs = document.querySelectorAll('input'),
    name = document.querySelector('.input-name'),
    email = document.querySelector('.input-email'),
    errName = document.querySelector('.error-name'),
    errEmail = document.querySelector('.error-email');

function validationEmail(item) {
  let check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
  return check.test(String(item).toLowerCase());
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (name.value.trim() === '') {
    errName.textContent = 'Поле необходимо заполнить'
    name.classList.add('input--invalid');
  } else if(name.value.length > 0 && name.value.length <= 3){
    errName.textContent = 'Имя слишком короткое';
  } else {
    errName.textContent = '';
    name.classList.remove('input--invalid');
  }

  if (email.value.trim() === '') {
    errEmail.textContent = 'Поле необходимо заполнить'
    email.classList.add('input--invalid');
  } else if(!validationEmail(email.value)) {
    email.classList.add('input--invalid');
    errEmail.textContent = 'Некорректный email'
  } else {
    email.classList.remove('input--invalid');
    errEmail.textContent = ''
  }

})