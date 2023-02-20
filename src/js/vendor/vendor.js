//Choices
const choicesForm = document.querySelector('#book-select');
const choices = new Choices(choicesForm, {
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
});

//Swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  simulateTouch: true,

  pagination: {
    el: '.posts__pagination',
    clickable: true
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 15,

    },
    376: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,

    },
    601: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
    },
  },

});