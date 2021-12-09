document.addEventListener('DOMContentLoaded', () => {

  /* Скрипт для modal window */
  const showBtn = document.querySelector('.btn-show'),
        modalWindow = document.querySelector('.buy-window'),
        closeBtn = document.querySelector('.buy-window .close');

  showBtn.addEventListener('click', () => {
    modalWindow.classList.add('bw-active');
    document.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    modalWindow.classList.remove('bw-active');
    document.style.overflow = 'visible';
  });

  /* Скрипт для dropdown меню */
  const burgerBtn = document.querySelector('.header__burger'),
        navMenu = document.querySelector('.header__links');

  console.log(burgerBtn);
  console.log(navMenu);

  burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('header__links-active');
    burgerBtn.classList.toggle('header__burger-active');
  });
});
