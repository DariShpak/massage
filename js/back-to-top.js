document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.querySelector('.back-to-top');

  if (!backToTopBtn) {
    return;
  }

  // Показувати кнопку при прокрутці вниз
  const toggleButtonVisibility = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  // Прокрутка до верху при кліку
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Слухачі подій
  window.addEventListener('scroll', toggleButtonVisibility);
  backToTopBtn.addEventListener('click', scrollToTop);

  // Перевірка при завантаженні сторінки
  toggleButtonVisibility();
});
