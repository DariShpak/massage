const scrollUpBtn = document.getElementById('scrollUpBtn');

// Показати/сховати кнопку при скролі
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
});

// Плавна прокрутка вгору при кліку
scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
